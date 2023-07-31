package dev.abhisek.backend.dto.snippet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SnippetRequestDto {
    private String title;
    private String description;
    private String code;
    private String language;
    private List<String> tags;
}
