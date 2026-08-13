const express = require("express");

const router = express.Router();

const {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudents
} = require("../controllers/studentController");

router.get("/", getStudents);

router.get("/search", searchStudents);

router.post("/", createStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;