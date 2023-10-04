import mongoose, { mongo } from "mongoose";

export interface IVerifyJWT {
  payload: {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  expiresIn: string;
}
