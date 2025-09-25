import { model, Schema } from "mongoose";

interface NinSchema {
  ninNumber: Number;
  firstName: String;
  lastName: String;
  middleName: String;
}
enum somthing {
  Male,
  Femaale,
}

const NinSchema: Schema<NinSchema> = new Schema({
  // unique: bool, requrired: bool, type: Data type, match: regex expression, defaultValue: depends on the Type of the field
  ninNumber: {
    type: String,
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
});

export const Nin = model("Nin", NinSchema);
