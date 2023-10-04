const jwt = require("jsonwebtoken");
import { IVerifyJWT } from "../types/jwt.type";

export const signJWT = ({ payload, expiresIn }: IVerifyJWT) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { payload: decoded, expired: false };
  } catch (err) {
    return { payload: null, expired: true };
  }
};
