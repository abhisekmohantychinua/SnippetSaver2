package dev.abhisek.backend.dto.snippet;

import dev.abhisek.backend.dto.review.ReviewDto;
import dev.abhisek.backend.dto.user.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SnippetDto {
    private String id;
    private String title;
    private String description;
    private String language;
    private String code;
    private List<String> tags;
    private String userId;
    private UserResponseDto user;
    private List<String> likes;
    private List<String> likedUserNames;
    private List<ReviewDto> reviewDtos;

}
