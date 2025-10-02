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

  if (transaction.isModified("amount") && transaction.amount > 50000) {
    transaction.transactionFee = 100;
  }
  next();
});

export const Transaction = model("Transactions", TransactionSchema);
