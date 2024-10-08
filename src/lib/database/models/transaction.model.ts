import mongoose, { models, Schema } from "mongoose";

const transactionSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  cedits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
