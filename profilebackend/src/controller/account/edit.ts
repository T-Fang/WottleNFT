import { compare, hash } from 'bcrypt'
import * as express from 'express'
import { StatusCodes } from 'http-status-codes'
import { changeUserBio, changeUserPassword, changeUserPictureHash, getUserByUsername } from '../../database/userQueries'
import { hashPassword } from '../../ultility/passwordHandler'

export async function editAccountPassword(req: express.Request, res: express.Response) {
  try {  
    let user = await getUserByUsername(res.locals.jwt.username)
    if (user == null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errorMessage: "Not such username!"
      })
    }
    if (!await compare(req.body.oldPassword, user.password as string)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
          errorMessage: "Wrong old password!"
      })
    }
    let newPassword = await hashPassword(req.body.newPassword)
    await changeUserPassword(res.locals.jwt.username, newPassword)
    return res.status(StatusCodes.ACCEPTED).json({
      message: "Password edit successful!"
    })
  } catch (error :any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: error.message
    })
  }
}

export async function editAccountBio(req: express.Request, res: express.Response) {
  try {
    let results = await changeUserBio(res.locals.jwt.username, req.body.newBio)
    if (results.rowCount == 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        errorMessage: "No such user!"
      })
    }
    return res.status(StatusCodes.ACCEPTED).json({
      message: "Bio change successful!"
    })
  } catch (error : any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: error.message
    })
  }
}

export async function editAccountPictureHash(req: express.Request, res: express.Response) {
  try {
    let results = await changeUserPictureHash(res.locals.jwt.username, req.body.newProfilePictureHash)
    if (results.rowCount == 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        errorMessage: "No such user!"
      })
    }
    return res.status(StatusCodes.ACCEPTED).json({
      message: "Picture change successful!"
    })
  } catch (error : any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: error.message
    })
  }
}