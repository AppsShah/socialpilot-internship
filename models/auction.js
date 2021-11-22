const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: String, required: true },
  image: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  isShow: { type: Boolean, default: true },
  isSold: { type: Boolean, default: false },
  start_time: { type: String },
  end_time: { type: String },
  bids: [
    {
      userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
      status: { type: String, default: "pending" },
      amount: { type: String, required: true },
    },
  ],
  winner: {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    amount: { type: String },
  },
});

module.exports = mongoose.model("Auction", placeSchema);
