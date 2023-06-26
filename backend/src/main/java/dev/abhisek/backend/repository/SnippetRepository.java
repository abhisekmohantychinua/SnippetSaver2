package dev.abhisek.backend.repository;

import dev.abhisek.backend.entity.Snippet;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnippetRepository extends MongoRepository<Snippet, String> {
    //    Randomized list of SNIPPETS to show on dashboard
    @Aggregation(pipeline = {
            "{ $sample: { size: 7 } }"
    })
    List<Snippet> findRandomSnippets();

    List<Snippet> findByUserId(String userId);

    List<Snippet> findAllByTagsContainingIgnoreCase(String tag);

    List<Snippet> findAllByTitleContainingIgnoreCase(String title);
}

