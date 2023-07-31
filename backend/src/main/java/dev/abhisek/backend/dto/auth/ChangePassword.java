package dev.abhisek.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChangePassword {
    private String oldPassword;
    private String newPassword;
    private String re_Password;
}
