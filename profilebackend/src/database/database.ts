import {Pool} from "pg"
import * as config from "../config/config"
const pool = new Pool({
    user: config.dbuser,
    host: config.dbhost,
    database: 'wottleprofiledb',
    password: config.dbpassword,
    port: config.dbport as number,
});
pool.connect();

export default pool