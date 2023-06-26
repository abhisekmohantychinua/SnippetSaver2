package dev.abhisek.backend.repository;

import dev.abhisek.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    List<User> findAllByFirstnameContainingIgnoreCase(String firstname);
}
