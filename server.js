const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected (studentDB)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ======================
// API Routes
// ======================

// POST /students  → নতুন Student যোগ
app.post("/students", async (req, res) => {
  try {
    const { name, email, age, department } = req.body;

    // Basic validation
    if (!name || !email || !age || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, age, department) are required",
      });
    }

    const student = await Student.create({
      name,
      email,
      age,
      department,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /students  → সকল Student দেখা
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /students/:id  → নির্দিষ্ট Student দেখা
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    // Invalid ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
