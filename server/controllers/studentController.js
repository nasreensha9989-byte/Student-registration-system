const db = require("../config/db");

// GET
const getStudents = (req, res) => {
    const sql = "SELECT * FROM students ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch students"
            });
        }

        res.status(200).json(results);
    });
};


// POST
const createStudent = (req, res) => {
    const { student_id, name, email, course, phone } = req.body;

    if (!student_id || !name || !email || !course) {
        return res.status(400).json({
            message: "Student ID, name, email and course are required"
        });
    }

    const sql = `
        INSERT INTO students
        (student_id, name, email, course, phone)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [student_id, name, email, course, phone],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to register student",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Student registered successfully",
                id: result.insertId
            });
        }
    );
};


// PUT
const updateStudent = (req, res) => {
    const { id } = req.params;
    const { student_id, name, email, course, phone } = req.body;

    if (!student_id || !name || !email || !course) {
        return res.status(400).json({
            message: "Student ID, name, email and course are required"
        });
    }

    const sql = `
        UPDATE students
        SET student_id = ?, name = ?, email = ?, course = ?, phone = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [student_id, name, email, course, phone, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to update student",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.status(200).json({
                message: "Student updated successfully"
            });
        }
    );
};


// EXPORT — KEEP THIS AT THE VERY BOTTOM
module.exports = {
    getStudents,
    createStudent,
    updateStudent
};