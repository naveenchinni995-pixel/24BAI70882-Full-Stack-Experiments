package com.example.Artifact.experiment52.repository;

import com.example.Artifact.experiment52.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, String> {

}