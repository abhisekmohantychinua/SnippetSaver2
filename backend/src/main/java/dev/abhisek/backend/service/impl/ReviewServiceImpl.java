package dev.abhisek.backend.service.impl;

import dev.abhisek.backend.dto.review.ReviewDto;
import dev.abhisek.backend.dto.snippet.SnippetRequestDto;
import dev.abhisek.backend.entity.Review;
import dev.abhisek.backend.entity.Snippet;
import dev.abhisek.backend.exception.InvalidAccessException;
import dev.abhisek.backend.repository.ReviewRepository;
import dev.abhisek.backend.repository.SnippetRepository;
import dev.abhisek.backend.service.ReviewService;
import dev.abhisek.backend.service.SnippetService;
import dev.abhisek.backend.service.UserService;
import dev.abhisek.backend.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final SnippetRepository snippetRepository;
    private final MongoTemplate mongoTemplate;
    private final SnippetService snippetService;
    private final UserService userService;

    private List<ReviewDto> mapReviewDtos(List<Review> reviews) {
        return reviews
                .stream()
                .map((review -> {
                    ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
                    reviewDto.setUser(userService.getUserById(review.getUserId()));
                    SnippetRequestDto snippetRequestDto = AppUtil
                            .entityToDto(snippetService.getSnippetBySnippetId(review.getSnippetId()),
                                    SnippetRequestDto.class);
                    reviewDto.setSnippet(snippetRequestDto);
                    return reviewDto;
                }))
                .toList();
    }

    @Override
    public ReviewDto addReview(String message, String snippetId, String userId) {
        snippetService.getSnippetBySnippetId(snippetId);
        Review review = reviewRepository
                .insert(Review.builder()
                        .id(UUID.randomUUID().toString())
                        .snippetId(snippetId)
                        .userId(userId)
                        .review(message)
                        .build());
        mongoTemplate.update(Snippet.class)
                .matching(Criteria.where("id").is(snippetId))
                .apply(new Update().push("reviews").value(review.getId()))
                .first();
        ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
        reviewDto.setUser(userService.getUserById(userId));
        SnippetRequestDto snippetRequestDto = AppUtil
                .entityToDto(snippetService.getSnippetBySnippetId(snippetId),
                        SnippetRequestDto.class);
        reviewDto.setSnippet(snippetRequestDto);
        return reviewDto;
    }

    @Override
    public ReviewDto getReviewById(String id) {
        Review review = reviewRepository
                .findById(id)
                .orElseThrow();
        ReviewDto reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
        reviewDto.setUser(userService.getUserById(review.getUserId()));
        SnippetRequestDto snippetRequestDto = AppUtil
                .entityToDto(snippetService.getSnippetBySnippetId(review.getSnippetId()),
                        SnippetRequestDto.class);
        reviewDto.setSnippet(snippetRequestDto);
        return reviewDto;
    }

    @Override
    public List<ReviewDto> getReviewsBySnippetId(String snippetId) {
        List<Review> reviews = reviewRepository
                .findAllBySnippetId(snippetId);
        return mapReviewDtos(reviews);
    }


    @Override
    public List<ReviewDto> getReviewsByUserId(String userId) {
        List<Review> reviews = reviewRepository
                .findAllByUserId(userId);
        return mapReviewDtos(reviews);
    }

    @Override
    public ReviewDto updateReview(String message, String id, String userId) {
        ReviewDto reviewDto = getReviewById(id);
        Review review = AppUtil.dtoToEntity(reviewDto, Review.class);
        if (!review.getUserId().equals(userId)) {
            throw new InvalidAccessException();
        }
        review.setReview(message);
        review = reviewRepository.save(review);
        reviewDto = AppUtil.entityToDto(review, ReviewDto.class);
        return reviewDto;

    }

    @Override
    public void deleteReview(String id, String userId) {
        Review review = reviewRepository
                .findById(id)
                .orElseThrow();
        if (!review.getUserId().equals(userId)) {
            throw new InvalidAccessException();
        }
        reviewRepository.delete(review);

        Snippet snippet = snippetRepository.findById(review.getSnippetId()).get();
        snippet
                .setReviews(snippet
                        .getReviews()
                        .stream()
                        .filter(review1 -> !review.getId().equals(id))
                        .toList());
        snippetRepository.save(snippet);
    }
}
