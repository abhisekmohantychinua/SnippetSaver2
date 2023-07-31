package dev.abhisek.backend.controller;

import dev.abhisek.backend.dto.review.ReviewDto;
import dev.abhisek.backend.entity.User;
import dev.abhisek.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/{snippetId}")
    public ResponseEntity<ReviewDto> addReview(
            @RequestBody String review,
            @PathVariable String snippetId,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity
                .ok(reviewService.addReview(review, snippetId, user.getId()));
    }

    @GetMapping("/review/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable String id) {
        return ResponseEntity
                .ok(reviewService.getReviewById(id));
    }

    @GetMapping("/snippet/{snippetId}")
    public ResponseEntity<List<ReviewDto>> getReviewsBySnippetId(@PathVariable String snippetId) {
        return ResponseEntity
                .ok(reviewService.getReviewsBySnippetId(snippetId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByUserId(@PathVariable String userId) {
        return ResponseEntity
                .ok(reviewService.getReviewsByUserId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewDto> updateReview(
            @RequestBody String review,
            @PathVariable String id,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity
                .accepted()
                .body(reviewService.updateReview(review, id, user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id, @AuthenticationPrincipal User user) {
        reviewService.deleteReview(id, user.getId());
        return ResponseEntity
                .noContent()
                .build();
    }
}
