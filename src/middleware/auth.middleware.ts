import { verifyJWT } from "../utils/jwt.utils";
import userModel from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { IVerifyJWT } from "../types/jwt.type";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(403).send("Forbidden Resources");
  }
  const { payload, expired } = verifyJWT(token);
  if (!payload) {
    return res.status(403).send("Invalid access token");
  }
  if (expired) {
    return res.status(403).send("Access token expired");
  }

  userModel
    .findById(payload.id)
    .then((user) => {
      // @ts-ignore
      req.user = user;
      next();
    })
    .catch((err) => {
      res.status(403).send("Error getting user");
    });
};
