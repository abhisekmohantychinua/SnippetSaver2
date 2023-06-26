package dev.abhisek.backend.service;

import dev.abhisek.backend.dto.SnippetRequestDto;
import dev.abhisek.backend.entity.Snippet;
import dev.abhisek.backend.entity.User;

import java.util.List;

public interface SnippetService {
    Snippet addSnippet(SnippetRequestDto snippetRequestDto, User user);

    List<Snippet> getRandomSnippets();

    Snippet getSnippetBySnippetId(String id);

    List<Snippet> getSnippetsByUserId(String userId);

    List<Snippet> getSnippetsByTags(String tag);

    List<Snippet> getSnippetsByTitle(String title);

    void deleteSnippet(String id, User user);

    Snippet updateSnippet(String id, SnippetRequestDto snippetRequestDto, User user);

}
