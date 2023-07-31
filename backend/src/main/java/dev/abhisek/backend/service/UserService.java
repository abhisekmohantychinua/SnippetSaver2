package dev.abhisek.backend.service;

import dev.abhisek.backend.dto.auth.ChangePassword;
import dev.abhisek.backend.dto.user.Me;
import dev.abhisek.backend.dto.user.UserDto;
import dev.abhisek.backend.dto.user.UserResponseDto;
import dev.abhisek.backend.entity.User;

import java.util.List;

public interface UserService {
    Me getMySelf(User user);

    UserResponseDto createUser(User user);

    List<UserDto> getAllUser();

    UserResponseDto getUserById(String id);

    UserDto getUserDtoById(String id);

    List<UserDto> getUserByName(String firstname);
    List<UserDto> getUserByLastName(String lastname);

    void deleteUser(String id, User user);

    void changePassword(ChangePassword changePassword, User user);
}
