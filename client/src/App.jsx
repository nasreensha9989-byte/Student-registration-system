import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
    const [editingStudent, setEditingStudent] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleStudentSaved = () => {
        setEditingStudent(null);
        setRefresh((value) => value + 1);
    };

    return (
        <div className="container">

            <h1>Student Registration System</h1>

            <StudentForm
                editingStudent={editingStudent}
                onStudentSaved={handleStudentSaved}
                onCancel={() => setEditingStudent(null)}
            />

            <StudentList
                onEdit={setEditingStudent}
                refresh={refresh}
            />

        </div>
    );
}

export default App;