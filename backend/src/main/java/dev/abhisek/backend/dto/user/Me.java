package dev.abhisek.backend.dto.user;

import dev.abhisek.backend.dto.review.ReviewDto;
import dev.abhisek.backend.dto.snippet.SnippetDto;
import dev.abhisek.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Me {
    private User me;
    private List<SnippetDto> mySnippets;
    private List<ReviewDto> myReviews;
}
