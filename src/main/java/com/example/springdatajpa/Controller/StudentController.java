package com.example.springdatajpa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springdatajpa.entity.Student;
import com.example.springdatajpa.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5175")
public class StudentController {

    @Autowired
    private StudentService service;

    // Add Student
    @PostMapping
    public Student insertStudent(@RequestBody Student student) {
        return service.insertStudent(student);
    }

    // Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return service.findAllStudents();
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {

        Student student = service.findStudentById(id);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(student);
    }

    // Full Update
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id,
                                 @RequestBody Student student) {
        return service.updatestudent(id, student);
    }

    // Partial Update
    @PatchMapping("/{id}")
    public Student patchStudent(@PathVariable int id,
                                @RequestBody Student student) {
        return service.updateStudent(id, student);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        return service.deleteStudentById(id);
    }
}