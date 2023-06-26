package dev.abhisek.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResponseDto {
    private String id;
    private String firstname;
    private String lastname;
    private List<SnippetDto> snippets;
}
