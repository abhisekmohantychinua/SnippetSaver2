package dev.abhisek.backend.service.impl;

import dev.abhisek.backend.dto.auth.ChangePassword;
import dev.abhisek.backend.dto.review.ReviewDto;
import dev.abhisek.backend.dto.snippet.SnippetDto;
import dev.abhisek.backend.dto.snippet.SnippetRequestDto;
import dev.abhisek.backend.dto.user.Me;
import dev.abhisek.backend.dto.user.UserDto;
import dev.abhisek.backend.dto.user.UserResponseDto;
import dev.abhisek.backend.entity.*;
import dev.abhisek.backend.exception.InvalidAccessException;
import dev.abhisek.backend.exception.NotMatchingException;
import dev.abhisek.backend.exception.UserNotFoundException;
import dev.abhisek.backend.repository.ReviewRepository;
import dev.abhisek.backend.repository.SnippetRepository;
import dev.abhisek.backend.repository.UserRepository;
import dev.abhisek.backend.service.UserService;
import dev.abhisek.backend.util.AppUtil;
import dev.abhisek.backend.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final SnippetRepository snippetRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReviewRepository reviewRepository;

    @Override
    public Me getMySelf(User user) {
        List<Snippet> snippets = snippetRepository
                .findByUserId(user.getId());
        List<ReviewDto> reviewDtos = reviewRepository
                .findAllByUserId(user.getId())
                .stream()
                .map(review -> {
                    ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                    reviewDto.setSnippet(AppUtil.entityToDto(snippetRepository
                            .findById(reviewDto.getSnippetId())
                            .get(), SnippetRequestDto.class)
                    );
                    reviewDto.setUser(getUserById(reviewDto.getUserId()));
                    return reviewDto;
                })
                .toList();
        return Me.builder()
                .me(user)
                .mySnippets(snippets
                        .stream()
                        .map(snippet -> AppUtil.entityToDto(snippet, SnippetDto.class))
                        .toList())
                .myReviews(reviewDtos)
                .build();
    }

    @Override
    public UserResponseDto createUser(User user) {
        user.setId(UUID.randomUUID().toString());
        user.setRoles(Roles.ROLE_USER);
        user = userRepository.save(user);

        return AppUtil.entityToDto(user, UserResponseDto.class);

    }

    @Override
    public List<UserDto> getAllUser() {

        List<UserDto> userDtos = userRepository
                .findAll()
                .stream()
                .map(user -> AppUtil.entityToDto(user, UserDto.class))
                .toList();
        return userDtos
                .stream()
                .peek(userDto -> {
                    userDto.setSnippets(snippetRepository.findByUserId(userDto.getId()));
                    List<Review> reviews = reviewRepository.findAllByUserId(userDto.getId());
                    List<ReviewDto> reviewDtos = reviews
                            .stream()
                            .map(review -> {
                                ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                                reviewDto.setSnippet(AppUtil.entityToDto(snippetRepository
                                        .findById(reviewDto.getSnippetId())
                                        .get(), SnippetRequestDto.class)
                                );
                                reviewDto.setUser(getUserById(reviewDto.getUserId()));
                                return reviewDto;
                            })
                            .toList();
                })
                .toList();
    }

    @Override
    public UserResponseDto getUserById(String id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("Invalid user id !!!",
                        List.of("id : " + id)));
        return AppUtil.entityToDto(user, UserResponseDto.class);
    }

    @Override
    public UserDto getUserDtoById(String id) {
        UserResponseDto userResponseDto = getUserById(id);
        UserDto userDto = AppUtil.entityToDto(userResponseDto, UserDto.class);
        List<Snippet> snippets = snippetRepository.findByUserId(id);
        userDto.setSnippets(snippets);
        List<Review> reviews = reviewRepository.findAllByUserId(id);
        List<ReviewDto> reviewDtos = reviews
                .stream()
                .map(review -> {
                    ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                    reviewDto.setSnippet(AppUtil.entityToDto(snippetRepository
                            .findById(reviewDto.getSnippetId())
                            .get(), SnippetRequestDto.class)
                    );
                    reviewDto.setUser(getUserById(reviewDto.getUserId()));
                    return reviewDto;
                })
                .toList();
        userDto.setReviews(reviewDtos);
        return userDto;
    }

    @Override
    public List<UserDto> getUserByName(String firstname) {
        return userRepository
                .findAllByFirstnameContainingIgnoreCase(firstname)
                .stream()
                .map(user -> {
                    UserDto userDto = AppUtil.entityToDto(user, UserDto.class);
                    List<Snippet> snippets = snippetRepository.findByUserId(user.getId());
                    userDto.setSnippets(snippets);
                    List<Review> reviews = reviewRepository.findAllByUserId(user.getId());
                    List<ReviewDto> reviewDtos = reviews
                            .stream()
                            .map(review -> {
                                ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                                reviewDto.setSnippet(AppUtil.entityToDto(snippetRepository
                                        .findById(reviewDto.getSnippetId())
                                        .get(), SnippetRequestDto.class)
                                );
                                reviewDto.setUser(getUserById(reviewDto.getUserId()));
                                return reviewDto;
                            })
                            .toList();
                    userDto.setReviews(reviewDtos);
                    return userDto;
                })
                .toList();
    }

    @Override
    public List<UserDto> getUserByLastName(String lastname) {
        return userRepository
                .findAllByLastnameContainingIgnoreCase(lastname)
                .stream()
                .map(user -> {
                    UserDto userDto = AppUtil.entityToDto(user, UserDto.class);
                    List<Snippet> snippets = snippetRepository.findByUserId(user.getId());
                    userDto.setSnippets(snippets);
                    List<Review> reviews = reviewRepository.findAllByUserId(user.getId());
                    List<ReviewDto> reviewDtos = reviews
                            .stream()
                            .map(review -> {
                                ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                                reviewDto.setSnippet(AppUtil.entityToDto(snippetRepository
                                        .findById(reviewDto.getSnippetId())
                                        .get(), SnippetRequestDto.class)
                                );
                                reviewDto.setUser(getUserById(reviewDto.getUserId()));
                                return reviewDto;
                            })
                            .toList();
                    userDto.setReviews(reviewDtos);
                    return userDto;
                })
                .toList();
    }

    @Override
    public void deleteUser(String id, User user) {
        if (!user.getId().equals(id)) {
            throw new InvalidAccessException("Cannot delete other user's account.",
                    List.of("your userId : " + user.getId(),
                            "provided userId : " + id,
                            "You are trying to delete another users account"));
        }

        userRepository.delete(user);
        List<Snippet> snippets = snippetRepository.findByUserId(user.getId());
        snippetRepository.deleteAll(snippets);
        snippets
                .forEach(snippet -> reviewRepository.deleteAllBySnippetId(snippet.getId()));
        reviewRepository.deleteAllByUserId(user.getId());

        // TODO: 20-06-2023 write proper mail appropriate for frontend
        Mail mail = Mail.builder()
                .to(user.getEmail())
                .subject("Account Deleted Successfully !!!")
                .messages("Goodbye from SnippetSaver and team.")
                .build();
        MailUtil.sendMail(mail);

    }

    @Override
    public void changePassword(ChangePassword changePassword, User user) {
        if (!passwordEncoder.matches(changePassword.getOldPassword(), user.getPassword())) {
            throw new InvalidAccessException("Password doesn't match!!!",
                    List.of("oldPassword : " + changePassword.getOldPassword(),
                            "The password field doesn't match with old password",
                            "Password change unsuccessful.",
                            "Try again."));
        }
        if (!changePassword.getNewPassword().equals(changePassword.getRe_Password())) {
            throw new NotMatchingException("The fields doesn't match!!!",
                    List.of("newPassword : " + changePassword.getNewPassword(),
                            "re_Password : " + changePassword.getRe_Password(),
                            "The fields doesn't match.",
                            "Retry with the matching field"));
        }

        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        userRepository.save(user);

        // TODO: 20-06-2023 write proper mail appropriate for frontend
        Mail mail = Mail.builder()
                .to(user.getEmail())
                .subject("Password Changed Successfully !!!")
                .messages("Your new password is : " + changePassword.getNewPassword())
                .build();
        MailUtil.sendMail(mail);
    }
}
