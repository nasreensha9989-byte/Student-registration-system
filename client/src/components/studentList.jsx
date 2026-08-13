import { useEffect, useState } from "react";

const StudentList = ({ onEdit, refresh }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchStudents = async () => {
        setLoading(true);

        try {
            const url = search
                ? `http://localhost:5000/api/students/search?search=${search}`
                : "http://localhost:5000/api/students";

            const response = await fetch(url);
            const data = await response.json();

            setStudents(data);
        } catch (error) {
            alert("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [refresh, search]);

    const deleteStudent = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/students/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            alert(data.message);

            fetchStudents();

        } catch (error) {
            alert("Failed to delete student");
        }
    };

    return (
        <div>

            <h2>Registered Students</h2>

            <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <p>Loading students...</p>
            ) : students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.student_id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.course}</td>
                                <td>{student.phone}</td>

                                <td>
                                    <button
                                        onClick={() => onEdit(student)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteStudent(student.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default StudentList;