import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

interface UserInterface {
  password: String;
  email: string;
  phoneNumber: Number;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  stateOfOrigin: string;
  ninNumber?: Number; // references Nin model
  bvnNumber: Number; // references Bvn model
  tier: Number;
  accountBalance: Number;
  pin: Number;
  // BeneficiaryList: ObjectId[]
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
    type: Number,
    minlength: 4,
    maxLength: 6,
  },
});

export const User = model("Users", UserSchema);
