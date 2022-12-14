package com.springboot.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.springboot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}