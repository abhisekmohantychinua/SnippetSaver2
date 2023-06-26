package dev.abhisek.backend.service.impl;

import dev.abhisek.backend.dto.SnippetRequestDto;
import dev.abhisek.backend.entity.Snippet;
import dev.abhisek.backend.entity.User;
import dev.abhisek.backend.exception.InvalidAccessException;
import dev.abhisek.backend.exception.SnippetNotFoundException;
import dev.abhisek.backend.repository.SnippetRepository;
import dev.abhisek.backend.repository.UserRepository;
import dev.abhisek.backend.service.SnippetService;
import dev.abhisek.backend.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SnippetServiceImpl implements SnippetService {
    private final SnippetRepository snippetRepository;
    private final UserRepository userRepository;

    @Override
    public Snippet addSnippet(SnippetRequestDto snippetRequestDto, User user) {


        Snippet snippet = AppUtil.dtoToEntity(snippetRequestDto, Snippet.class);
        snippet.setId(UUID.randomUUID().toString());
        snippet.setUserId(user.getId());
        return snippetRepository.save(snippet);


    }

    @Override
    public List<Snippet> getRandomSnippets() {
        return snippetRepository.findRandomSnippets();
    }

    @Override
    public Snippet getSnippetBySnippetId(String id) {

        return snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.")
                ));
    }

    @Override
    public List<Snippet> getSnippetsByUserId(String userId) {
        return snippetRepository.findByUserId(userId);
    }

    @Override
    public List<Snippet> getSnippetsByTags(String tag) {
        return snippetRepository.findAllByTagsContainingIgnoreCase(tag);
    }

    @Override
    public List<Snippet> getSnippetsByTitle(String title) {
        return snippetRepository.findAllByTitleContainingIgnoreCase(title);
    }

    @Override
    public void deleteSnippet(String id, User user) {
        Snippet snippet = snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.",
                                "Deleting snippet unsuccessful.")
                ));
        if (!snippet.getUserId().equals(user.getId())) {
            throw new InvalidAccessException("You don't have access to add snippets to others account.",
                    List.of("your userId : " + user.getId(),
                            "provided userId : " + snippet.getUserId(),
                            "You are trying to add snippet through another users account"));
        }
        snippetRepository.delete(snippet);
    }

    @Override
    public Snippet updateSnippet(String id, SnippetRequestDto snippetRequestDto, User user) {
        Snippet snippet = snippetRepository
                .findById(id)
                .orElseThrow(() -> new SnippetNotFoundException(
                        "Invalid snippet id provided !!!",
                        List.of("id : " + id,
                                "Cannot find snippet with the id in database.",
                                "Update unsuccessful !!!")
                ));
        if (!snippet.getUserId().equals(user.getId())) {
            throw new InvalidAccessException("You don't have access to add snippets to others account.",
                    List.of("your userId : " + user.getId(),
                            "provided userId : " + snippet.getUserId(),
                            "You are trying to add snippet through another users account"));
        }

        snippet = AppUtil.dtoToEntity(snippetRequestDto, Snippet.class);
        snippet.setId(id);
        snippet.setUserId(user.getId());
        return snippetRepository.save(snippet);

    }
}
