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

    // Insert Student
    public Student insertStudent(Student student) {
        return repo.save(student);
    }

    // Get All Students
    public List<Student> findAllStudents() {
        return repo.findAll();
    }

    // Get Student By ID
    public Student findStudentById(int id) {
        return repo.findById(id).orElse(null);
    }

    // Full Update (PUT)
    public Student updatestudent(int id, Student student) {

        if (!repo.existsById(id)) {
            return null;
        }

        student.setSid(id);
        return repo.save(student);
    }

    // Partial Update (PATCH)
    public Student updateStudent(int id, Student updateStudent) {

        Student s = repo.findById(id).orElse(null);

        if (s != null) {

            if (updateStudent.getName() != null) {
                s.setName(updateStudent.getName());
            }

            if (updateStudent.getAge() != null) {
                s.setAge(updateStudent.getAge());
            }

            if (updateStudent.getMakes() != null) {
                s.setMakes(updateStudent.getMakes());
            }

            return repo.save(s);
        }

        return null;
    }

    // Delete Student
    public String deleteStudentById(int id) {

        if (repo.existsById(id)) {

            repo.deleteById(id);

            return "Student deleted successfully";
        }

        return "Student not found";
    }
}