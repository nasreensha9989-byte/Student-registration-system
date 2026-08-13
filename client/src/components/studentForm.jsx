import { useEffect, useState } from "react";

const StudentForm = ({ onStudentSaved, editingStudent, onCancel }) => {
    const [form, setForm] = useState({
        student_id: "",
        name: "",
        email: "",
        course: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingStudent) {
            setForm(editingStudent);
        }
    }, [editingStudent]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.student_id || !form.name || !form.email || !form.course) {
            alert("Please fill all required fields");
            return;
        }

        setLoading(true);

        try {
            const url = editingStudent
                ? `http://localhost:5000/api/students/${editingStudent.id}`
                : "http://localhost:5000/api/students";

            const method = editingStudent ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            alert(data.message);

            setForm({
                student_id: "",
                name: "",
                email: "",
                course: "",
                phone: ""
            });

            onStudentSaved();

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">

            <h2>
                {editingStudent ? "Edit Student" : "Register Student"}
            </h2>

            <input
                name="student_id"
                placeholder="Student ID"
                value={form.student_id}
                onChange={handleChange}
                required
            />

            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <input
                name="course"
                placeholder="Course"
                value={form.course}
                onChange={handleChange}
                required
            />

            <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
                {loading
                    ? "Saving..."
                    : editingStudent
                        ? "Update Student"
                        : "Register Student"
                }
            </button>

            {editingStudent && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}

        </form>
    );
};

export default StudentForm;