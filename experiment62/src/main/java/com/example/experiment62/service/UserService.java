package com.example.experiment62.service;

import com.example.experiment62.dto.UserRequest;
import com.example.experiment62.model.Address;
import com.example.experiment62.model.User;
import com.example.experiment62.repository.UserRepository;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @CacheEvict(value = "users", allEntries = true)
    public User createUser(UserRequest request) {

        User user = new User(
            request.getUid(),
            request.getName()
        );

        Address address = new Address(
            request.getCity(),
            request.getCountry()
        );

        user.setAddress(address);

        return userRepository.save(user);
    }

    // Normal query
    public List<User> getUsersNormal() {

        List<User> users =
            userRepository.findUsersNormal();

        users.forEach(user -> {
            if (user.getAddress() != null) {
                user.getAddress().getCity();
            }
        });

        return users;
    }

    // JOIN FETCH optimized query
    public List<User> getUsersOptimized() {
        return userRepository.findUsersWithAddress();
    }

    // Cached query
    @Cacheable(
        value = "users",
        key = "'allUsers'"
    )
    public List<User> getUsersCached() {
        return userRepository.findUsersWithAddress();
    }

    // Native SQL
    public List<Object[]> getUsersNative() {
        return userRepository.findUsersNative();
    }

    // Sort by ID
    public List<User> getUsersSortedById() {
        return userRepository.findAllByOrderByIdAsc();
    }

    // Sort by Name
    public List<User> getUsersSortedByName() {
        return userRepository.findAllByOrderByNameAsc();
    }

    @CacheEvict(value = "users", allEntries = true)
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}