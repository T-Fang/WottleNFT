import { compare } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { TOKEN_EXPIRY_TIME, TOKEN_SECRET } from "../../config/config";
import { getUserByUsername, getUserByWalletID, insertUser } from "../../database/userQueries";
const { UNIQUE_VIOLATION } = require('pg-error-constants')
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from "../../ultility/passwordHandler";

export async function registerUser(req: Request, res: Response) {
    try {
        let password = await hashPassword(req.body.password)
        await insertUser({
            email: req.body.email,
            password: password,
            username: req.body.username,
            wallet_id: req.body.wallet_id,
            bio: null,
            profile_picture_hash: null
        })

    } catch (error: any) {
        var errorMessage = ""
        if (error.code == UNIQUE_VIOLATION) {
          if (error.constraint == "accounts_wallet_id_key") {
            errorMessage = "Wallet conflict"
          }
          if (error.constraint == "accounts_pkey") {
            errorMessage = "Username conflict"
          }
          return res.status(StatusCodes.CONFLICT).json({
            errorMessage: errorMessage,
            err: error.message
          })
        } 
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: error.message
        })
    }
    return res.status(StatusCodes.CREATED).json({
        message: "registration successful!"
    })
}

export async function userLogin(req: Request, res: Response) {
    const wallet_id = req.body.wallet_id
    try {
        let user = await getUserByWalletID(wallet_id)
        if (user == null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                errorMessage: "No such user not found!"
            })
        }
        if (!await compare(req.body.password, user.password as string)) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errorMessage: "Wrong password!"
            })
        }
        const username = {
            username: user.username
        }
        const accessToken = jwt.sign(username, TOKEN_SECRET, {expiresIn: TOKEN_EXPIRY_TIME});
        return res.status(StatusCodes.OK).json({
            accessToken: accessToken
        })
    } catch (err: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: err.message
        })
    }
}

export async function getUserInfo(req: Request, res: Response) {
    try {
        let user = await getUserByUsername(res.locals.jwt.username)
        if (user == null) {
            return res.status(StatusCodes.NOT_FOUND).json({
              errorMessage: "Not such username!"
            })
        }
        user.password = null
        return res.status(StatusCodes.OK).json({
            user: user
        })
    } catch (err: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: err.message
        })
    }
}