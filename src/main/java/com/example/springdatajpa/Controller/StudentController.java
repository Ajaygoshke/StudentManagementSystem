package com.example.springdatajpa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springdatajpa.entity.Student;
import com.example.springdatajpa.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173") // Maps to your Vite-React client application port
public class StudentController {

    @Autowired
    private StudentService service;

    // Add Student (POST)
    @PostMapping
    public Student insertStudent(@RequestBody Student student) {
        return service.insertStudent(student);
    }

    // Get All Students (GET)
    @GetMapping
    public List<Student> getAllStudents() {
        return service.findAllStudents();
    }

    // Get Student By ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Student student = service.findStudentById(id);

        if (student == null) {
            return ResponseEntity.notFound().build(); // Properly returns a clean 404 status
        }

        return ResponseEntity.ok(student);
    }

    // Full Update (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
        // Calls the explicit 'putStudent' method to prevent confusion
        Student updated = service.putStudent(id, student);
        
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Student> patchStudent(@PathVariable int id, @RequestBody Student student) {
        // Calls the explicit 'patchStudent' method
        Student updated = service.patchStudent(id, student);
        
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Delete Student (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        String result = service.deleteStudentById(id);
        
        if (result.contains("not found")) {
            return ResponseEntity.status(404).body(result);
        }
        return ResponseEntity.ok(result);
    }
}