package dev.abhisek.backend.dto;

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
}
