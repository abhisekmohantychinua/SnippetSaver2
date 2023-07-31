package dev.abhisek.backend.dto.user;

import dev.abhisek.backend.entity.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResponseDto {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private Roles roles;

    public String getName() {
        return firstname + " " + lastname;
    }
}
