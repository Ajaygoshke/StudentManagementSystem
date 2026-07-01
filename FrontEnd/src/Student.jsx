import { useEffect, useState } from "react";
import './Student.css';

function Student() {
  // Point directly to your live Render backend when deployed, fallback to local for development
  const API = window.location.hostname === "localhost" 
    ? "http://localhost:8080/api/students" 
    : "https://studentmanagementsystem-bod4.onrender.com/api/students"; 

  const [students, setStudents] = useState([]);
  const [searchId, setSearchId] = useState("");

  // Clean initialization values
  const [student, setStudent] = useState({
    sid: "",
    name: "",
    age: "",
    marks: "" 
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  // GET ALL STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch student database array.");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // INPUT CHANGE HANDLER
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // ADD STUDENT (POST)
  const addStudent = async () => {
    if (!student.name || !student.age || !student.marks) {
      alert("Please fill in all fields before adding a student.");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: student.name,
          age: parseInt(student.age, 10),
          marks: parseFloat(student.marks)
        }),
      });

      if (res.ok) {
        clearForm();
        fetchStudents();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET BY ID (SEARCH)
  const getStudentById = async () => {
    if (!searchId) {
      alert("Please enter a Student ID to query.");
      return;
    }

    try {
      const res = await fetch(`${API}/${searchId}`);

      if (res.status === 404) {
        alert("Student record does not exist.");
        clearForm();
        return;
      }

      const data = await res.json();
      if (!data) {
        alert("Student not found");
        clearForm();
        return;
      }

      setStudent(data);
    } catch (error) {
      console.error(error);
      alert("Error processing search query framework loop.");
    }
  };

  // UPDATE (PUT)
  const updateStudent = async () => {
    if (!student.sid) {
      alert("Please select a student from the table or search by ID before updating.");
      return;
    }

    try {
      await fetch(`${API}/${student.sid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      clearForm();
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // PARTIAL UPDATE (PATCH)
  const patchStudent = async () => {
    if (!student.sid) {
      alert("Please select a student from the table or search by ID before patching.");
      return;
    }

    try {
      await fetch(`${API}/${student.sid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      clearForm();
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student profile?")) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      fetchStudents();
      if (student.sid === id) clearForm(); 
    } catch (error) {
      console.error(error);
    }
  };

  // LOAD DATA INTO FORM STAGING AREA
  const editStudent = (s) => {
    setStudent(s);
  };

  // CLEAR DATA WORKSPACE FORM
  const clearForm = () => {
    setStudent({
      sid: "",
      name: "",
      age: "",
      marks: "",
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Student CRUD Application</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={student.age}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          name="marks" 
          placeholder="Marks"
          value={student.marks}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={addStudent} style={{ marginRight: "5px" }}>Add</button>
        <button onClick={updateStudent} style={{ marginRight: "5px" }}>Update (PUT)</button>
        <button onClick={patchStudent} style={{ marginRight: "5px" }}>Patch</button>
        <button onClick={clearForm}>Clear Form</button>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <input
          type="number"
          placeholder="Search By ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={getStudentById}>Search Record</button>
      </div>

      <hr />

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Marks</th>
            <th>Edit Action</th>
            <th>Delete Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No structural student data found within target schema context.</td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.sid}>
                <td>{s.sid}</td>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.marks}</td>
                <td>
                  <button onClick={() => editStudent(s)}>✍️ Load to Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteStudent(s.sid)} style={{ color: "red" }}>🗑️ Drop</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <hr />

      <h3>Active Data Pointer In-Focus:</h3>
      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "4px", width: "fit-content" }}>
        <p><strong>ID:</strong> {student.sid || "None (Staged Record Pending Persist)"}</p>
        <p><strong>Name:</strong> {student.name || "N/A"}</p>
        <p><strong>Age:</strong> {student.age || "N/A"}</p>
        <p><strong>Marks:</strong> {student.marks || "N/A"}</p>
      </div>
    </div>
  );
}

export default Student;