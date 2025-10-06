import { Request, Response } from "express";
import { User } from "../models/User";
import { UserDetiails } from "../types/user";
import { Transaction } from "../models/Transactions";
import { TransactionStatus } from "../types/transaction";
import { History } from "../models/History";

export const transferMoney = async (req: any, res: Response) => {
  const start = Date.now();
  const { amount, recipientAccountNumber, recipientAccountName } = req.body;
  const userDetails = req.user as UserDetiails;
  try {
    console.log(userDetails);
    const senderDetails = await User.findOne({
      phoneNumber: userDetails.phoneNumber,
    });

    if (!senderDetails) {
      return res.status(400).json({
        message: "Sender not found",
      });
    }
    console.log("sender details", senderDetails);
    if (amount > senderDetails.accountBalance) {
      return res.status(400).json({
        message: "Ole thief u wan send money wey u no get 😂",
      });
    }

    if (amount > userDetails.dailyLimit) {
      return res.status(400).json({
        message: "Hafa you wan pass your daily limit ooo 😂",
      });
    }
    if (amount > userDetails.transactionLimit) {
      return res.status(400).json({
        message: "Hafa you wan pass your transfer limit ooo 😂",
      });
    }

    // verify the account details
    const recipientDetails = await User.findOne({
      phoneNumber: recipientAccountNumber,
      fullName: recipientAccountName,
    });
    if (!recipientDetails) {
      return res.status(400).json({
        message: "Recipient not found",
      });
    }
    console.log("recipeint details", recipientDetails);
    // enter the transsaction record

    const transaction = await Transaction.create({
      amount,
      recipientAccountName,
      recipientAccountNumber,
      senderAccountName: senderDetails.fullName,
      senderAccountNumber: senderDetails.phoneNumber,
    });

    console.log("transaction", transaction);
    // update ther user details - credit and debit
    const deductable = transaction.amount + transaction.transactionFee;
    senderDetails.accountBalance = senderDetails.accountBalance - deductable;
    senderDetails.dailyLimit = senderDetails.dailyLimit - amount;
    recipientDetails.accountBalance =
      recipientDetails.accountBalance + transaction.amount;
    senderDetails.gamePoints =
      senderDetails.gamePoints + transaction.gamePoints;

    console.log("after tracnsaction", transaction);

    await recipientDetails.save();
    await senderDetails.save();

    await History.create({
      userId: senderDetails._id,
      category: "transfer",
      amount: deductable,
      transactionId: transaction._id,
      status: transaction.status,
    });

    //  create one for the reciever

    // update trnsaction details

    transaction.status = TransactionStatus.successful.toString();
    console.log("saved details");
    console.log("recipeint details", recipientDetails);
    console.log("sender details", senderDetails);
    await transaction.save();
    const durationMs = Date.now() - start;
    return res.status(201).json({
      message: `Transfer successful. It took ${durationMs}s  to complete`,
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to transfer",
      error,
    });
  }
  // validate how much can be sent based on tier
};

// add middleware for tier protection and accountBalance
// add a comand in put package.json to run a ts script which should populate the admin, bvns and nins in our db
