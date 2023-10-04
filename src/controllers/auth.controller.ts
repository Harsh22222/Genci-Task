import userModel from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signJWT } from "../utils/jwt.utils";

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });
  const user = await userModel.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return res.status(201).json({ message: "Signed Up Successfully" });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });
  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exist" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const jwtToken = signJWT({
    payload: payload,
    expiresIn: "1d",
  });

  return res.status(200).json({ jwtToken });
};
