const db = require("../config/db");

// GET all students
const getStudents = (req, res) => {
    const sql = "SELECT * FROM students ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch students"
            });
        }

        res.json(results);
    });
};

// POST new student
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

// PUT update student
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

            res.json({
                message: "Student updated successfully"
            });
        }
    );
};

// DELETE student
const deleteStudent = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to delete student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    });
};

// SEARCH students
const searchStudents = (req, res) => {
    const { search } = req.query;

    const sql = `
        SELECT * FROM students
        WHERE name LIKE ?
        OR student_id LIKE ?
        OR email LIKE ?
        OR course LIKE ?
        ORDER BY id DESC
    `;

    const value = `%${search || ""}%`;

    db.query(
        sql,
        [value, value, value, value],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Search failed"
                });
            }

            res.json(results);
        }
    );
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudents
};