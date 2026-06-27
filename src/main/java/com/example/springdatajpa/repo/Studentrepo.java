package com.example.springdatajpa.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springdatajpa.entity.Student;
import com.example.springdatajpa.service.StudentService;

@Repository
public interface Studentrepo extends JpaRepository<Student, Integer> {
	
	

}
