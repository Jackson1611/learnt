const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["to learn", "learning", "learned"],
  },
  url: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("skills", SkillSchema);
