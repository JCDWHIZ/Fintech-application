import { model, Schema } from "mongoose";

interface BvnSchema {
  bvnNumber: Number;
  firstName: String;
  lastName: String;
  middleName: String;
}
enum somthing {
  Male,
  Femaale,
}

const BvnSchema: Schema<BvnSchema> = new Schema({
  // unique: bool, requrired: bool, type: Data type, match: regex expression, defaultValue: depends on the Type of the field
  bvnNumber: {
    type: String,
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
});

export const Bvn = model("Bvn", BvnSchema);
