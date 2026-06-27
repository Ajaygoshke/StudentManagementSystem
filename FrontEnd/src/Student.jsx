import { useEffect, useState } from "react";

function Student() {
  const API = "http://localhost:8080/api/students";

  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    sid: "",
    name: "",
    age: "",
    makes: ""
  });

  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  // GET ALL
  const fetchStudents = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setStudents(data);
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // ADD STUDENT
  const addStudent = async () => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    clearForm();
    fetchStudents();
  };

  // GET BY ID
 const getStudentById = async () => {
  if (!searchId) {
    alert("Please enter Student ID");
    return;
  }

  try {
    const res = await fetch(`${API}/${searchId}`);

    if (res.status === 404) {
      alert("Student not found");
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
    alert("Something went wrong");
  }
  };

  // UPDATE (PUT)
  const updateStudent = async () => {
    await fetch(`${API}/${student.sid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    clearForm();
    fetchStudents();
  };

  // PATCH
  const patchStudent = async () => {
    await fetch(`${API}/${student.sid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    clearForm();
    fetchStudents();
  };

  // DELETE
  const deleteStudent = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  // LOAD DATA INTO FORM
  const editStudent = (s) => {
    setStudent(s);
  };

  // CLEAR FORM
  const clearForm = () => {
    setStudent({
      sid: "",
      name: "",
      age: "",
      makes: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student CRUD Application</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />

      <input
        type="number"
        name="makes"
        placeholder="Marks"
        value={student.makes}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={addStudent}>Add</button>

      <button onClick={updateStudent}>Update</button>

      <button onClick={patchStudent}>Patch</button>

      <button onClick={clearForm}>Clear</button>

      <hr />

      <input
        type="number"
        placeholder="Search By ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <button onClick={getStudentById}>Search</button>

      <hr />

      <table border="1" cellPadding="10">
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
          {students.map((s) => (
            <tr key={s.sid}>
              <td>{s.sid}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.makes}</td>

              <td>
                <button onClick={() => editStudent(s)}>
                  Edit
                </button>
              </td>

              <td>
                <button onClick={() => deleteStudent(s.sid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h3>Selected Student</h3>

      <p>ID : {student.sid}</p>
      <p>Name : {student.name}</p>
      <p>Age : {student.age}</p>
      <p>Marks : {student.makes}</p>
    </div>
  );
}

export default Student;