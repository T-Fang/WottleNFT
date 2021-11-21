import express from "express";
import routes from "./routes/index";
import { port } from "./config/config";

const morgan = require('morgan');
const cors = require('cors')
const app = express();
app.use(cors())
app.use("/", routes);
app.use(express.json());
app.use(morgan('dev'));

app.listen(port, ()=> {
  console.log(`Wottle Server running on port ${port}`)
});
