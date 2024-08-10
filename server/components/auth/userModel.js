const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      select: false, // No select
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false, // No select
    },

  },
  {
    timestamps: true,
  },
);
const User = mongoose.model('User', userSchema);

module.exports = User;
