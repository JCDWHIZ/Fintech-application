export interface TransactionInterface {
  amount: number;
  recipientAccountNumber: number;
  recipientAccountName: string;
  // recipientBank: string;
  transactionFee: number;
  completedAt?: string;
  status: string;
  senderAccountNumber: number;
  senderAccountName: string;
}

export enum TransactionStatus {
  pending,
  reversed,
  successful,
  failed,
}
