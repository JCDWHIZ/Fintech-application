import { model, Schema } from "mongoose";
import { TransactionInterface, TransactionStatus } from "../types/transaction";

const TransactionSchema: Schema<TransactionInterface> = new Schema(
  {
    amount: {
      type: Number,
    },
    recipientAccountName: {
      type: String,
    },
    recipientAccountNumber: {
      type: Number,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    transactionFee: {
      type: Number,
    },
    status: {
      type: String,
      enum: TransactionStatus,
      default: TransactionStatus.pending.toString(),
    },
    gamePoints: {
      type: Number,
    },
    senderAccountName: {
      type: String,
    },
    senderAccountNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

TransactionSchema.pre("save", async function (next) {
  const transaction = this;
  if (transaction.isModified("amount")) {
    switch (true) {
      case transaction.amount < 10000:
        transaction.transactionFee = 50;
        break;

      case transaction.amount >= 10000 && transaction.amount <= 50000:
        transaction.transactionFee = 500; // mid-range fee
        break;

      case transaction.amount > 50000:
        transaction.transactionFee = 1000;
        break;

      default:
        transaction.transactionFee = 0; // fallback
        break;
    }
  }

  if (transaction.isModified("amount")) {
    switch (true) {
      case transaction.amount < 10000:
        transaction.gamePoints = 10;
        break;

      case transaction.amount >= 10000 && transaction.amount <= 50000:
        transaction.gamePoints = 20; // mid-range fee
        break;

      case transaction.amount > 50000:
        transaction.gamePoints = 40;
        break;

      default:
        transaction.gamePoints = 0; // fallback
        break;
    }
  }

  next();
});

export const Transaction = model("Transactions", TransactionSchema);
