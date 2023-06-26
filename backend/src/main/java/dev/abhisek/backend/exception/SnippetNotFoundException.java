package dev.abhisek.backend.exception;

import dev.abhisek.backend.dto.ExceptionDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class SnippetNotFoundException extends RuntimeException {
    private final ExceptionDto exceptionDto;

    public SnippetNotFoundException() {
        super("Requested snippet not found on server !!!");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message("Requested snippet not found on server !!!")
                .details(List.of("The user trying to accessing data is invalid or not present in the database."))
                .build();
    }


    public SnippetNotFoundException(String message, List<String> details) {
        super(message);
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(message)
                .details(details)
                .build();
    }

    public SnippetNotFoundException(Integer status, String message, List<String> details) {
        super(message);
        exceptionDto = ExceptionDto.builder()
                .status(status)
                .message(message)
                .details(details)
                .build();
    }
}
