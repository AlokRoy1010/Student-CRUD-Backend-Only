const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be positive"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
