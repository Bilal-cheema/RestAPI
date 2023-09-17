require('dotenv').config();
//Bilal

const express = require("express");
const server = express();


const { connectDB } = require("./store/connectDB")
const Students = require("../schemas/student")


server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Connect to the database
connectDB(); 

// Get a list of all products
server.get("/students", async (req, res) => {
  try {
    const students = await Students.find();
    res.status(200).json({
      message: "Products retrieved successfully",
      students: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single product by name
server.get("/students/:name", async (req, res) => {
  try {
    const studentsName = req.params.name;
    const student = await Students.findOne({ name: studentsName });
    if (!student) {
      return res.status(404).json({ error: "student not found." });
    }
    res.status(200).json({
      message: "student retrieved successfully",
      students: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new product
server.post("/Students", async (req, res) => {
  try {
    const students = req.body;
    const studentsToAdd = new Students({
      id: students.id,
      name: students.name,
      price: students.price,
    });
    // Save the new product to the database
    await studentsToAdd.save();
    res.status(201).json({
      message: "Student added.",
      students: studentsToAdd,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product by name
server.delete("/students/:name", async (req, res) => {
  try {
    const studentsName = req.params.name;
    const deleted = await Students.findOneAndRemove({ name: studentsName });
    if (!deleted) {
      return res.status(404).json({ error: "not found." });
    }
    res.status(200).json({
      message: "deleted.",
      students: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a product by name
server.patch("/students/:name", async (req, res) => {
  try {
    const studentsName = req.params.name;
    const updatedData = req.body;
    const updated = await Students.findOneAndUpdate(
      { name: studentsName },
      updatedData,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: " not found." });
    }
    res.status(200).json({
      message: "updated.",
      students: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3001;



server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
