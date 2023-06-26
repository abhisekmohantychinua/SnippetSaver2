package dev.abhisek.backend.controller;

import dev.abhisek.backend.dto.AuthRequest;
import dev.abhisek.backend.dto.ChangePassword;
import dev.abhisek.backend.dto.UserDto;
import dev.abhisek.backend.dto.UserRequestDto;
import dev.abhisek.backend.entity.RegisterRequest;
import dev.abhisek.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        authService.addRegisterRequest(registerRequest);
        return ResponseEntity.ok("Successfully added your register request. Now verify you email!!!");
    }

    @PostMapping("/verify/{token}")
    public ResponseEntity<UserDto> verifyUser(@PathVariable String token, @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.verifyRegisterToken(token, userRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(Map.of("token", authService.authorize(request)));
    }

    @PostMapping("/forget-password")
    public ResponseEntity<Void> forgetPassword(@RequestParam String email) {
        authService.forgetPasswordRequest(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/new-password")
    public ResponseEntity<Void> forgetPassword(
            @RequestParam String verificationToken,
            @RequestBody ChangePassword changePassword
    ) {
        authService.newPassword(verificationToken, changePassword);
        return ResponseEntity.noContent().build();
    }
}
