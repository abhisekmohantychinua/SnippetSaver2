package dev.abhisek.backend.dto;

import dev.abhisek.backend.entity.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private Roles roles;
}
