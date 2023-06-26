package dev.abhisek.backend.repository;

import dev.abhisek.backend.entity.RegisterRequest;
import dev.abhisek.backend.entity.TokenType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterRequestRepository extends MongoRepository<RegisterRequest, String> {
    Optional<RegisterRequest> findByVerificationTokenAndVerifiedFalseAndTokenType(String verificationToken, TokenType tokenType);

}
