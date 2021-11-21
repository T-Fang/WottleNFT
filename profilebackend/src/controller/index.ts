import * as express from "express";

export function index(req: express.Request, res: express.Response) {
  res.json({ info: 'Wottle Profile Server is running.' })
}
