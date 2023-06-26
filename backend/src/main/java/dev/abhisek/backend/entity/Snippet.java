package dev.abhisek.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "snippets")
public class Snippet {
    @Id
    private String id;
    private String title;
    private String description;
    private String code;
    private List<String> tags;
    private String userId;
}
