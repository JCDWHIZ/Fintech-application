import { Request, Response } from "express";
import { User, userStatus } from "../models/User";
import bcrypt from "bcrypt";
import { Bvn } from "../models/Bvn";
import { sendPasswordResetEmail } from "../config/email";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { registerUserPayload, SetPinDecoded } from "../types/user";

const jwtsecret = process.env.JWT_SECRET;

export const registerUser = async (req: any, res: Response) => {
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
  } = req.body as registerUserPayload;
  const user = req.user;
  console.log(user);
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
      status: userStatus.active,
      passwordTrial: 5,
      tier: 1,
      accountBalance: 0.0,
    });
    await user.save();

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
export const loginUserWithpin = async (req: Request, res: Response) => {
  const { pin, email } = req.body;
  if (!jwtsecret) {
    return res.status(500).json({
      message: "jwt secret is not defined in env file",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not found",
      });
    }

    if (user.passwordTrial == 0) {
      user.status = userStatus.blocked.toString();
      await user.save();
      return res.status(403).json({
        message: `Hafa this account has been blocked.You can always start afresh 😁😂`,
      });
    }
    const isValid = await bcrypt.compare(pin, user.pin);
    if (!isValid) {
      user.passwordTrial = user.passwordTrial - 1;
      console.log(user);
      console.log(user.passwordTrial);
      await user.save();
      return res.status(404).json({
        message: `Incorrect Pin number. Trials remain: ${user.passwordTrial}`,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        phoneNumber: user.phoneNumber,
        tier: user.tier,
        email: user.email,
        fullname: user.fullName,
      },
      jwtsecret,
      {
        expiresIn: "5mins",
      }
    );

    return res.status(201).json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to login user",
      error,
    });
  }
};
export const loginUserWithPassword = async (req: Request, res: Response) => {};
export const forgotUserPin = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!jwtsecret) {
    return res.status(500).json({
      message: "jwt secret is not defined in env file",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      jwtsecret,
      {
        expiresIn: "5mins",
      }
    );

    const resetUrl = `http://localhost:5173/auth/set-password?token=${token}`;
    await sendPasswordResetEmail(user.email, resetUrl, {
      expiresInMinutes: 5,
      name: user.fullName,
    });

    return res.status(200).json({
      message: "Email sent succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send forgot pin email to user",
      error,
    });
  }
};
export const setUserPin = async (req: Request, res: Response) => {
  const { token, pin } = req.body;
  if (!jwtsecret) {
    return res.status(500).json({
      message: "jwt secret is not defined in env file",
    });
  }
  try {
    const decoded = jwt.verify(token, jwtsecret) as SetPinDecoded;
    console.log(decoded);
    const userId = decoded.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.pin = pin;
    await user.save();

    return res.status(200).json({
      message: "Your pin has been set",
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Your password reset link is not valid",
      });
    }

    return res.status(500).json({
      message: "Failed to set pin",
      error,
    });
  }
};
