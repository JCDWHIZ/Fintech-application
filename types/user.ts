export interface registerUserPayload {
  email: string;
  password: string;
  pin: string;
  phoneNumber: string;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  stateOfOrigin: string;
  bvnNumber: number;
}

export interface SetPinDecoded {
  id: string;
  email: string;
}

export interface UserDetiails {
  _id: string;
  email: string;
  phoneNumber: number;
  fullName: string;
  bvnNumber: number;
  tier: 1;
  accountBalance: number;
  status: number;
  dailyLimit: number;
  transactionLimit: number;
}
