import { Request, Response } from "express";
import { Bvn } from "../models/Bvn";

export const CreateBvn = async (req: Request, res: Response) => {
  const { bvnNumber, firstName, lastName, MiddleName } = req.body;

  try {
    const BvnEntity = new Bvn({
      bvnNumber,
      firstName,
      lastName,
      MiddleName,
    });

    await BvnEntity.save();

    return res.json({ message: "Created Bvn succefully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create bvn",
      error: error,
    });
  }
};
