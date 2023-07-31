package dev.abhisek.backend.service;

import dev.abhisek.backend.dto.auth.AuthRequest;
import dev.abhisek.backend.dto.auth.AuthResponse;
import dev.abhisek.backend.dto.auth.ChangePassword;
import dev.abhisek.backend.dto.user.UserResponseDto;
import dev.abhisek.backend.dto.user.UserRequestDto;
import dev.abhisek.backend.entity.RegisterRequest;

public interface AuthService {
    void addRegisterRequest(RegisterRequest request);

    UserResponseDto verifyRegisterToken(String token, UserRequestDto userRequestDto);

    AuthResponse authorize(AuthRequest request);

    void forgetPasswordRequest(String email);

    void newPassword(String verificationToken, ChangePassword changePassword);
}
