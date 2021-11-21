import fs from "fs";
import https from "https";

import axios, { AxiosError } from "axios";
import FormData from "form-data";
import multiparty from "multiparty";
import { NextApiHandler } from "next";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const ipfs: NextApiHandler = async (req, res) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const form = new multiparty.Form();
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, _, files) => {
      if (err) return reject(res.status(500).json({ error: "Invalid file" }));
      try {
        const filePath = files.file[0].path;
        const data = new FormData();
        data.append("file", fs.createReadStream(filePath));

        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${
              // eslint-disable-next-line no-underscore-dangle
              (data as any)._boundary
            }`,
            pinata_api_key: process.env.PINATA_API_KEY as string,
            pinata_secret_api_key: process.env.PINATA_SECRET as string,
          },
          httpsAgent: agent,
        });

        return resolve(res.status(response.status).json(response.data));
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const axiosError = e as AxiosError;
          return reject(res.status(500).json(axiosError.toJSON()));
        }
        return reject(res.status(500).json({ error: "Unknown error" }));
      }
    });
  });
};

export default ipfs;

export const config = {
  api: {
    bodyParser: false,
  },
};
