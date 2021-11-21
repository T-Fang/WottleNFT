import * as express from "express";
import { json, urlencoded } from "body-parser";
import { registerUser, userLogin } from "../controller/account/index";
import accountRouter from "./account";
import { index } from "../controller";
import marketplaceRouter from "./marketplace";
const routes = express.Router();
routes.use(json())

routes.use(urlencoded({extended : true}))
routes.use(express.text())


routes.get('/', index)
routes.post('/register', registerUser)
routes.post('/login', userLogin)
routes.use('/accounts/', accountRouter)
routes.use('/marketplace', marketplaceRouter)
export default routes;