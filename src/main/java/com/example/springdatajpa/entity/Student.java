package com.example.springdatajpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="student")
public class Student {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer sid;
	private String name;
	private Integer age;
	private Integer makes;
	public Student(Integer sid, String name, Integer age, Integer makes) {
		super();
		this.sid = sid;
		this.name = name;
		this.age = age;
		this.makes = makes;
	}
	public Student() {
		super();
	}
	public Integer getSid() {
		return sid;
	}
	public void setSid(Integer sid) {
		this.sid = sid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Integer getMakes() {
		return makes;
	}
	public void setMakes(Integer makes) {
		this.makes = makes;
	}
	@Override
	public String toString() {
		return "Student [sid=" + sid + ", name=" + name + ", age=" + age + ", makes=" + makes + "]";
	}
	

}
