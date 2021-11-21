import {compare, genSalt, hash} from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/config';
export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt()
  return await hash(password, salt)
}
export async function checkPassword(password: string, hashed: string): Promise<Boolean> {
    return compare(password, hashed)
}

export function extractJWT(req: Request, res: Response, next: NextFunction) {
  
  let token = req.headers.authorization?.split(' ')[1]
  if (token) {
    verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          err: error.message,
        })
      } 
      else 
      {
        res.locals.jwt = decoded;
        next()
      }
    })
  }
  else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errorMessage: "Error accessing"
    });
  }

}
