package dev.abhisek.backend.service;

import dev.abhisek.backend.dto.ChangePassword;
import dev.abhisek.backend.dto.Me;
import dev.abhisek.backend.dto.UserDto;
import dev.abhisek.backend.dto.UserResponseDto;
import dev.abhisek.backend.entity.User;

import java.util.List;

public interface UserService {
    Me getMySelf(User user);
    UserDto createUser(User user);

    List<UserResponseDto> getAllUser();

    UserResponseDto getUserById(String id);

    List<UserResponseDto> getUserByName(String firstname);

    void deleteUser(String id, User user);

    void changePassword(ChangePassword changePassword, User user);
}
