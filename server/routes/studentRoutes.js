const express = require("express");

const router = express.Router();

const {
    getStudents,
    createStudent
} = require("../controllers/studentController");


// GET all students
router.get("/", getStudents);

// POST new student
router.post("/", createStudent);


module.exports = router;