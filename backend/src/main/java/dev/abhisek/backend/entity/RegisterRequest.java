package dev.abhisek.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "register_requests")
public class RegisterRequest {
    @Id
    private String id;
    private String email;
    private String password;
    private String verificationToken;
    private Boolean verified;
    private TokenType tokenType;
}
