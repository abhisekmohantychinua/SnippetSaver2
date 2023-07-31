package dev.abhisek.backend.service.impl;

import dev.abhisek.backend.dto.review.ReviewDto;
import dev.abhisek.backend.dto.snippet.SnippetDto;
import dev.abhisek.backend.dto.snippet.SnippetRequestDto;
import dev.abhisek.backend.entity.Review;
import dev.abhisek.backend.entity.Snippet;
import dev.abhisek.backend.entity.User;
import dev.abhisek.backend.exception.InvalidAccessException;
import dev.abhisek.backend.exception.SnippetNotFoundException;
import dev.abhisek.backend.repository.ReviewRepository;
import dev.abhisek.backend.repository.SnippetRepository;
import dev.abhisek.backend.service.SnippetService;
import dev.abhisek.backend.service.UserService;
import dev.abhisek.backend.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SnippetServiceImpl implements SnippetService {
    private final SnippetRepository snippetRepository;
    private final ReviewRepository reviewRepository;
    private final UserService userService;

    private List<SnippetDto> mapSnippetDtos(List<Snippet> snippets) {
        List<SnippetDto> snippetDtos = snippets
                .stream()
                .map(snippet -> AppUtil.entityToDto(snippet, SnippetDto.class))
                .toList();

        snippetDtos
                .forEach(snippetDto -> {
                    snippetDto.setUser(userService.getUserById(snippetDto.getUserId()));
                    snippetDto.setLikedUserNames(snippetDto
                            .getLikes()
                            .stream()
                            .map(userId -> userService.getUserById(userId).getName())
                            .toList());
                    snippetDto.setReviewDtos(reviewRepository
                            .findAllBySnippetId(snippetDto.getId())
                            .stream()
                            .map(review -> {
                                ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                                reviewDto.setUser(userService.getUserById(reviewDto.getUserId()));
                                reviewDto.setSnippet(AppUtil.entityToDto(snippetDto, SnippetRequestDto.class));
                                return reviewDto;
                            })
                            .toList());
                });
        return snippetDtos;
    }

    @Override
    public Snippet addSnippet(SnippetRequestDto snippetRequestDto, User user) {


        Snippet snippet = AppUtil.dtoToEntity(snippetRequestDto, Snippet.class);
        snippet.setId(UUID.randomUUID().toString());
        snippet.setUserId(user.getId());
        snippet.setLikes(List.of());
        snippet.setReviews(List.of());
        return snippetRepository.save(snippet);


    }

    @Override
    public List<SnippetDto> getRandomSnippets() {
        List<Snippet> snippets = snippetRepository.findRandomSnippets();
        return mapSnippetDtos(snippets);
    }

    @Override
    public SnippetDto getSnippetBySnippetId(String id) {

        Snippet snippet = snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.")
                ));
        SnippetDto dto = AppUtil.entityToDto(snippet, SnippetDto.class);
        dto.setUser(userService.getUserById(dto.getUserId()));

        dto.setLikedUserNames(dto
                .getLikes()
                .stream()
                .map(userId -> userService.getUserById(userId).getName())
                .toList());
        dto.setReviewDtos(reviewRepository
                .findAllBySnippetId(dto.getId())
                .stream()
                .map(review -> {
                    ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                    reviewDto.setUser(userService.getUserById(reviewDto.getUserId()));
                    reviewDto.setSnippet(AppUtil.entityToDto(snippet, SnippetRequestDto.class));
                    return reviewDto;
                })
                .toList());
        return dto;
    }

    @Override
    public List<SnippetDto> getSnippetsByUserId(String userId) {
        List<Snippet> snippets = snippetRepository.findByUserId(userId);
        return mapSnippetDtos(snippets);
    }


    @Override
    public List<SnippetDto> getSnippetsByTags(String tag) {
        List<Snippet> snippets = snippetRepository.findAllByTagsContainingIgnoreCase(tag);
        return mapSnippetDtos(snippets);
    }

    @Override
    public List<SnippetDto> getSnippetsByTitle(String title) {
        List<Snippet> snippets = snippetRepository.findAllByTitleContainingIgnoreCase(title);
        return mapSnippetDtos(snippets);
    }

    @Override
    public List<SnippetDto> getSnippetsByLanguage(String language) {
        List<Snippet> snippets = snippetRepository.findAllByLanguageContainingIgnoreCase(language);
        return mapSnippetDtos(snippets);
    }

    @Override
    public void deleteSnippet(String id, User user) {
        Snippet snippet = snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.",
                                "Deleting snippet unsuccessful.")
                ));
        if (!snippet.getUserId().equals(user.getId())) {
            throw new InvalidAccessException("You don't have access to add snippets to others account.",
                    List.of("your userId : " + user.getId(),
                            "provided userId : " + snippet.getUserId(),
                            "You are trying to add snippet through another users account"));
        }
        snippetRepository.delete(snippet);
        List<Review> reviews = reviewRepository.findAllBySnippetId(id);
        reviewRepository.deleteAll(reviews);
    }

    @Override
    public Snippet updateSnippet(String id, SnippetRequestDto snippetRequestDto, User user) {
        Snippet snippet = snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.",
                                "Update unsuccessful !!!")
                ));
        if (!snippet.getUserId().equals(user.getId())) {
            throw new InvalidAccessException("You don't have access to add snippets to others account.",
                    List.of("your userId : " + user.getId(),
                            "provided userId : " + snippet.getUserId(),
                            "You are trying to add snippet through another users account"));
        }

        snippet = AppUtil.dtoToEntity(snippetRequestDto, Snippet.class);
        snippet.setId(id);
        snippet.setUserId(user.getId());
        return snippetRepository.save(snippet);

    }

    @Override
    public void like(String id, String userId) {
        Snippet snippet = snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.")
                ));
        if (snippet.getLikes().contains(userId)) {
            snippet.getLikes().remove(userId);
        } else {
            snippet.getLikes().add(userId);
        }
        snippetRepository.save(snippet);
    }


}
