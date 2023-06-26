package dev.abhisek.backend.controller;

import dev.abhisek.backend.dto.ChangePassword;
import dev.abhisek.backend.dto.Me;
import dev.abhisek.backend.dto.UserResponseDto;
import dev.abhisek.backend.entity.User;
import dev.abhisek.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<Me> getMySelf(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getMySelf(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable String id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getAllUser());
    }

    @GetMapping("/name")
    public ResponseEntity<List<UserResponseDto>> getUsersByName(@RequestParam String firstname) {
        return ResponseEntity.ok(userService.getUserByName(firstname));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id, @AuthenticationPrincipal User user) {
        userService.deleteUser(id, user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePassword changePassword, @AuthenticationPrincipal User user) {
        userService.changePassword(changePassword, user);
        return ResponseEntity.noContent().build();
    }


}
