package dev.abhisek.backend.exception;

import dev.abhisek.backend.dto.ExceptionDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class NotMatchingException extends RuntimeException {
    private final ExceptionDto exceptionDto;

    public NotMatchingException() {
        super("The fields doesn't match!!!");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("The required fields doesn't match!")
                .details(List.of("The required fields doesn't match!"))
                .build();
    }

    public NotMatchingException(String message, List<String> details) {
        super("The fields doesn't match!!!");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .details(details)
                .build();
    }

}
