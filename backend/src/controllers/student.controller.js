const Student = require("../models/student.model");

// GET /students
const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search && search.trim() !== "") {
      query = {
        $or: [
          { name: { $regex: search.trim(), $options: "i" } },
          { course: { $regex: search.trim(), $options: "i" } },
        ],
      };
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    const total = await Student.countDocuments();

    res.status(200).json({
      success: true,
      total,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /students
const createStudent = async (req, res) => {
  try {
    const { name, email, phone, course, age } = req.body;

    // Check duplicate email
    const existing = await Student.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const student = await Student.create({ name, email, phone, course, age });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /students/:id
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, course, age } = req.body;

    // Check if email belongs to another student
    const emailCheck = await Student.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: id },
    });
    if (emailCheck) {
      return res
        .status(409)
        .json({
          success: false,
          message: "Email already in use by another student",
        });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, phone, course, age },
      { new: true, runValidators: true },
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /students/:id
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
