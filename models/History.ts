import mongoose, { model, ObjectId, Schema, Types } from "mongoose";
import { TransactionStatus } from "../types/transaction";

interface HistoryInterface {
  userId: Types.ObjectId;
  category: string;
  amount: number;
  transactionId: Types.ObjectId;
  status: string;
}

const HistorySchema: Schema<HistoryInterface> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    category: {
      type: String,
    },
    amount: {
      type: Number,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
    status: {
      type: String,
      enum: TransactionStatus,
    },
  },
  { timestamps: true }
);

export const History = model("Histories", HistorySchema);
