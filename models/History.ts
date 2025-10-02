import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { TransactionStatus } from "../types/transaction";

interface HistoryInterface {
  category: string;
  amount: number;
  transactionId: Types.ObjectId;
  status: string;
}

const HistorySchema: Schema<HistoryInterface> = new Schema({
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
});

export const History = mongoose.model("Histories", HistorySchema);
