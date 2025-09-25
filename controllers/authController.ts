import { Request, Response } from "express";
import { User } from "../models/User";
import { Bvn } from "../models/Bvn";
export const registerUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    pin,
    phoneNumber,
    fullName,
    dateOfBirth,
    address,
    stateOfOrigin,
    bvnNumber,
  } = req.body;
  try {
    const existingEmail = await User.findOne({ email }); // this finds a user with matching the email provided from the body
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already taken",
      });
    }
    if (String(phoneNumber).length != 11) {
      return res.status(400).json({
        message: "Phone Number must be 11 digits",
      });
    }
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({
        message: "Phone Number already taken",
      });
    }

    const existingBvn = await Bvn.findOne({ bvnNumber });
    if (!existingBvn) {
      return res.status(400).json({
        message: "invalid bvn number",
      });
    }

    const user = await User.create({
      // creates user
      email,
      password,
      pin,
      phoneNumber,
      fullName,
      dateOfBirth,
      address,
      stateOfOrigin,
      bvnNumber,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register user",
      error,
    });
  }
};
export const loginUserWithpin = async (req: Request, res: Response) => {};
export const loginUserWithPassword = async (req: Request, res: Response) => {};
