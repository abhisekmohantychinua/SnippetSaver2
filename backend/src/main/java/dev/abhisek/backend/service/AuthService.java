package dev.abhisek.backend.service;

import dev.abhisek.backend.dto.AuthRequest;
import dev.abhisek.backend.dto.ChangePassword;
import dev.abhisek.backend.dto.UserDto;
import dev.abhisek.backend.dto.UserRequestDto;
import dev.abhisek.backend.entity.RegisterRequest;

public interface AuthService {
    void addRegisterRequest(RegisterRequest request);

    UserDto verifyRegisterToken(String token, UserRequestDto userRequestDto);

    String authorize(AuthRequest request);

    void forgetPasswordRequest(String email);

    void newPassword(String verificationToken, ChangePassword changePassword);
}
