import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserInterface {
  password: string; // use small letters to define types for intefaces, using capital letters signify a constructor
  email: string;
  phoneNumber: number;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  stateOfOrigin: string;
  ninNumber?: number; // references Nin model
  bvnNumber: number; // references Bvn model
  tier: number;
  accountBalance: number;
  pin: string;
  passwordTrial: number;
  status: string;
  // BeneficiaryList: ObjectId[]
}

export enum userStatus {
  blocked,
  active,
}

const UserSchema: Schema<UserInterface> = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    maxlength: 11,
    minlength: 11,
    unique: true,
  },
  fullName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    type: String,
  },
  stateOfOrigin: {
    type: String,
  },
  ninNumber: {
    type: Number,
    required: false,
    unique: false,
  },
  bvnNumber: {
    type: Number,
  },
  tier: {
    type: Number,
    defaultValue: 1,
  },
  accountBalance: {
    type: Number,
    defaultValue: 0.0,
  },
  pin: {
    type: String,
  },
  passwordTrial: {
    type: Number,
    defaultValue: 5,
  },
  status: {
    type: String,
    enum: userStatus,
    defaultValue: userStatus.active.toString(),
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  if (user.isModified("pin")) {
    user.pin = await bcrypt.hash(user.pin, 10);
  }
  next();
});

export const User = model("Users", UserSchema);
