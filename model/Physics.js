const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  options: [],
  answer: String,
  weightage: Number,
  tags: []
});

const question = mongoose.model("physics", questionSchema);
module.exports = question;