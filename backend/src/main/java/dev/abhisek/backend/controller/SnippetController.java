package dev.abhisek.backend.controller;

import dev.abhisek.backend.dto.SnippetRequestDto;
import dev.abhisek.backend.entity.Snippet;
import dev.abhisek.backend.entity.User;
import dev.abhisek.backend.service.SnippetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/snip")
public class SnippetController {
    private final SnippetService snippetService;

    @PostMapping
    public ResponseEntity<Snippet> addSnippet(
            @RequestBody SnippetRequestDto snippetRequestDto,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(snippetService.addSnippet(snippetRequestDto, user));
    }

    @GetMapping
    public ResponseEntity<List<Snippet>> getRandomSnippets() {
        return ResponseEntity.ok(snippetService.getRandomSnippets());
    }

    @GetMapping("/snippet/{id}")
    public ResponseEntity<Snippet> getSnippetBySnippetId(@PathVariable String id) {
        return ResponseEntity.ok(snippetService.getSnippetBySnippetId(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Snippet>> getSnippetsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(snippetService.getSnippetsByUserId(userId));
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Snippet>> getSnippetsByTags(@RequestParam String tag) {
        return ResponseEntity.ok(snippetService.getSnippetsByTags(tag));
    }

    @GetMapping("/title")
    public ResponseEntity<List<Snippet>> getSnippetsByTitle(@RequestParam String title) {
        return ResponseEntity.ok(snippetService.getSnippetsByTitle(title));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSnippet(
            @PathVariable String id,
            @AuthenticationPrincipal User user
    ) {
        snippetService.deleteSnippet(id, user);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Snippet> updateSnippet(
            @PathVariable String id,
            @RequestBody SnippetRequestDto snippetRequestDto,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity
                .accepted()
                .body(snippetService.updateSnippet(id, snippetRequestDto, user));
    }
}
