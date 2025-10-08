import { Request, Response } from "express";
import { User } from "../models/User";
import { UserDetiails } from "../types/user";

export const addBeneficiary = async (req: any, res: Response) => {
  // find user
  // push user in beneficiary list
  const { beneficiaryAccountNumber, beneficiaryAccountName } = req.body;

  const userDetails = req.user as UserDetiails;
  try {
    const beneficiaryDetails = await User.findOne({
      phoneNumber: beneficiaryAccountNumber,
      fullName: beneficiaryAccountName,
    });
    if (!beneficiaryDetails) {
      return res.status(400).json({
        message: "Beneficiary not found",
      });
    }

    // const accountUser = await User.findOne({
    //   _id: userDetails._id,
    // });

    // if (!accountUser) {
    //   return res.status(400).json({
    //     message: "User not found",
    //   });
    // }
    await User.findByIdAndUpdate(
      userDetails._id,
      { $addToSet: { beneficiaryList: beneficiaryDetails._id } },
      { new: true }
    );

    // accountUser.beneficiaryList.push(beneficiaryDetails._id);
    // await accountUser.save();

    return res.status(200).json({
      message: "Beneficiary added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed add beneficiary",
      error,
    });
  }
};

export const removeBeneficiary = async (req: any, res: Response) => {
  const { beneficiaryId } = req.params;
  const userDetails = req.user as UserDetiails;
  try {
    // await User.findByIdAndUpdate(
    //   userDetails._id,
    //   { $pull: { beneficiaryList: beneficiaryId } },
    //   { new: true }
    // );

    const user = await User.findOne({ _id: userDetails._id });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // user.beneficiaryList [ objectId1, objectId2, object3].filter(beneficiary => beneficiary.toString() !== beneficiaryId)

    user.beneficiaryList = user.beneficiaryList.filter(
      (ben) => ben.toString() !== beneficiaryId
    );

    await user.save();

    return res.status(200).json({
      message: "Beneficiary removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed remove beneficiary",
      error,
    });
  }
};
export const findUserDetails = async (req: Request, res: Response) => {
  // use accountNumber
  const { accountNumber } = req.params;
  try {
    const userDetails = await User.findOne({ phoneNumber: accountNumber });

    if (!userDetails) {
      return res.status(400).json({
        message: "Account number not found",
      });
    }

    return res.status(200).json({
      user: {
        name: userDetails.fullName,
        accountNumber: userDetails.phoneNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch user details",
      error,
    });
  }
};

export const findMyAccount = async (req: any, res: Response) => {
  // use accountNumber
  const userDetails = req.user as UserDetiails;
  try {
    const user = await User.findOne({ _id: userDetails._id });

    if (!userDetails) {
      return res.status(400).json({
        message: "Account not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch user details",
      error,
    });
  }
};

export const getUserbeneficiaries = async (req: any, res: Response) => {
  try {
    const userDetails = req.user as UserDetiails;

    const accountUser = await User.findOne({
      _id: userDetails._id,
    }).populate("beneficiaryList", "fullName phoneNumber accountBalance");

    if (!accountUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Beneficiaries fetched successfully",
      beneficiaries: accountUser.beneficiaryList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed get beneficiary details",
      error,
    });
  }
};
export const updateBvnNumber = async (req: Request, res: Response) => {};
export const updateNinNumber = async (req: Request, res: Response) => {};

export const getUserhistory = async (req: any, res: Response) => {
  try {
    const userDetails = req.user as UserDetiails;
    const accountUser = await User.findOne({
      _id: userDetails._id,
    }).populate("historyList", "category transactionId amount status");

    console.log(accountUser);

    if (!accountUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User transfer history fetched successfully",
      history: accountUser.historyList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch user transfer history",
      error,
    });
  }
};
