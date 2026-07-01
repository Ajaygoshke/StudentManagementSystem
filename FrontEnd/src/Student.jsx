import { useEffect, useState } from "react";
import "./Student.css";

function Student() {

  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:8080/api/students"
      : "https://studentmanagementsystem-bod4.onrender.com/api/students";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");

  const [student, setStudent] = useState({
    sid: "",
    name: "",
    age: "",
    marks: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================
  // GET ALL STUDENTS
  // ==========================
  const fetchStudents = async () => {
    setLoading(true);

    try {
      const res = await fetch(API);

      if (!res.ok) {
        throw new Error("Unable to fetch students.");
      }

      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // ADD STUDENT
  // ==========================
  const addStudent = async () => {

    if (!student.name || !student.age || !student.marks) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: student.name,
          age: Number(student.age),
          marks: Number(student.marks),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add student.");
      }

      alert("Student added successfully.");

      clearForm();
      fetchStudents();

    } catch (error) {
      console.error(error);
      alert("Unable to add student.");
    }
  };

  // ==========================
  // SEARCH BY ID
  // ==========================
  const getStudentById = async () => {

    if (!searchId) {
      alert("Enter Student ID.");
      return;
    }

    try {

      const res = await fetch(`${API}/${searchId}`);

      if (res.status === 404) {
        alert("Student not found.");
        clearForm();
        return;
      }

      if (!res.ok) {
        throw new Error("Search failed.");
      }

      const data = await res.json();

      setStudent(data);

    } catch (error) {
      console.error(error);
      alert("Unable to search student.");
    }
  };

  // ==========================
  // UPDATE
  // ==========================
  const updateStudent = async () => {

    if (!student.sid) {
      alert("Select a student first.");
      return;
    }

    if (!window.confirm("Update this student?")) return;

    try {

      const res = await fetch(`${API}/${student.sid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      if (!res.ok) {
        throw new Error("Update failed.");
      }

      alert("Student updated successfully.");

      clearForm();
      fetchStudents();

    } catch (error) {
      console.error(error);
      alert("Unable to update student.");
    }
  };

  // ==========================
  // PATCH
  // ==========================
  const patchStudent = async () => {

    if (!student.sid) {
      alert("Select a student first.");
      return;
    }

    try {

      const res = await fetch(`${API}/${student.sid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(student),
      });

      if (!res.ok) {
        throw new Error("Patch failed.");
      }

      alert("Student updated successfully.");

      clearForm();
      fetchStudents();

    } catch (error) {
      console.error(error);
      alert("Unable to patch student.");
    }
  };

  // ==========================
  // DELETE
  // ==========================
  const deleteStudent = async (id) => {

    if (!window.confirm("Delete this student?")) return;

    try {

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed.");
      }

      alert("Student deleted successfully.");

      fetchStudents();

      if (student.sid === id) {
        clearForm();
      }

    } catch (error) {
      console.error(error);
      alert("Unable to delete student.");
    }
  };

  // ==========================
  // LOAD DATA TO FORM
  // ==========================
  const editStudent = (s) => {
    setStudent(s);
  };

  // ==========================
  // CLEAR FORM
  // ==========================
  const clearForm = () => {

    setStudent({
      sid: "",
      name: "",
      age: "",
      marks: "",
    });
  };
    return (
    <div className="container">
      <h2>🎓 Student CRUD Application</h2>

      {loading && (
        <h3 style={{ color: "green" }}>Loading students...</h3>
      )}

      {/* ================= FORM ================= */}

      <div className="form-container">

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={student.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={student.age}
          onChange={handleChange}
        />

        <input
          type="number"
          name="marks"
          placeholder="Enter Marks"
          value={student.marks}
          onChange={handleChange}
        />

      </div>

      <div className="button-group">

        <button onClick={addStudent}>
          ➕ Add
        </button>

        <button onClick={updateStudent}>
          ✏️ Update
        </button>

        <button onClick={patchStudent}>
          📝 Patch
        </button>

        <button onClick={clearForm}>
          🔄 Clear
        </button>

      </div>

      <hr />

      {/* ================= SEARCH ================= */}

      <div className="search-container">

        <input
          type="number"
          placeholder="Search Student By ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <button onClick={getStudentById}>
          🔍 Search
        </button>

      </div>

      <hr />

      {/* ================= TABLE ================= */}

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Marks</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

        </thead>

        <tbody>

          {students.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center" }}
              >
                No students found.
              </td>
            </tr>

          ) : (

            students.map((s) => (

              <tr key={s.sid}>

                <td>{s.sid}</td>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.marks}</td>

                <td>

                  <button
                    onClick={() => editStudent(s)}
                  >
                    ✏️ Edit
                  </button>

                </td>

                <td>

                  <button
                    onClick={() => deleteStudent(s.sid)}
                    style={{
                      background: "red",
                      color: "white",
                    }}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <hr />

      {/* ================= ACTIVE STUDENT ================= */}

      <div className="active-student">

        <h3>Selected Student</h3>

        <p>
          <strong>ID:</strong>{" "}
          {student.sid || "None"}
        </p>

        <p>
          <strong>Name:</strong>{" "}
          {student.name || "-"}
        </p>

        <p>
          <strong>Age:</strong>{" "}
          {student.age || "-"}
        </p>

        <p>
          <strong>Marks:</strong>{" "}
          {student.marks || "-"}
        </p>

      </div>

    </div>
  );
}

export default Student;