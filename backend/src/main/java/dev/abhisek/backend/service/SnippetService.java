package dev.abhisek.backend.service;

import dev.abhisek.backend.dto.snippet.SnippetDto;
import dev.abhisek.backend.dto.snippet.SnippetRequestDto;
import dev.abhisek.backend.entity.Snippet;
import dev.abhisek.backend.entity.User;

import java.util.List;

public interface SnippetService {
    Snippet addSnippet(SnippetRequestDto snippetRequestDto, User user);

    List<SnippetDto> getRandomSnippets();

    SnippetDto getSnippetBySnippetId(String id);

    List<SnippetDto> getSnippetsByUserId(String userId);

    List<SnippetDto> getSnippetsByTags(String tag);

    List<SnippetDto> getSnippetsByTitle(String title);
    List<SnippetDto> getSnippetsByLanguage(String language);

    void deleteSnippet(String id, User user);

    Snippet updateSnippet(String id, SnippetRequestDto snippetRequestDto, User user);

    void like(String id, String userId);

}
