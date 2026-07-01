package com.example.springdatajpa.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springdatajpa.entity.Student;
import com.example.springdatajpa.repo.Studentrepo;

@Service
public class StudentService {

    @Autowired
    private Studentrepo repo;

    // Insert Student (POST)
    public Student insertStudent(Student student) {
        return repo.save(student);
    }

    // Get All Students (GET)
    public List<Student> findAllStudents() {
        return repo.findAll();
    }

    // Get Student By ID (GET)
    public Student findStudentById(int id) {
        return repo.findById(id).orElse(null);
    }

    // Full Update (PUT) - Clears or replaces old values entirely
    public Student putStudent(int id, Student student) {
        if (!repo.existsById(id)) {
            return null;
        }
        student.setSid(id); // Ensure the entity maps to the correct route variable ID
        return repo.save(student);
    }

    // Partial Update (PATCH) - Only mutates fields provided in payload
    public Student patchStudent(int id, Student updateStudent) {
        Student existingStudent = repo.findById(id).orElse(null);

        if (existingStudent != null) {
            // Check strings safely
            if (updateStudent.getName() != null && !updateStudent.getName().trim().isEmpty()) {
                existingStudent.setName(updateStudent.getName());
            }

            // Ensure your Entity uses Integer (object) rather than int (primitive) 
            // so that missing properties arrive safely as null instead of defaulting to 0
            if (updateStudent.getAge() != null) {
                existingStudent.setAge(updateStudent.getAge());
            }

            // Keeps consistency with whatever variable name is configured inside your Entity class
            if (updateStudent.getMakes() != null) {
                existingStudent.setMakes(updateStudent.getMakes());
            }

            return repo.save(existingStudent);
        }

        return null;
    }

    // Delete Student (DELETE)
    public String deleteStudentById(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Student deleted successfully";
        }
        return "Student not found";
    }
}