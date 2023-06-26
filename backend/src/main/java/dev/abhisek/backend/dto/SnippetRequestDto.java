package dev.abhisek.backend.dto;

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
    private List<String> tags;
}
