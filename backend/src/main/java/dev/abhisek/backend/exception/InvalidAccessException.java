package dev.abhisek.backend.exception;

import dev.abhisek.backend.dto.ExceptionDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class InvalidAccessException extends RuntimeException {
    private final ExceptionDto exceptionDto;

    public InvalidAccessException() {
        super("InvalidAccessException");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.FORBIDDEN.value())
                .message("You have not access to this.")
                .details(List.of("You are trying to access thing which you don't have permission."))
                .build();
    }

    public InvalidAccessException(String message, List<String> details) {
        super("InvalidAccessException");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.FORBIDDEN.value())
                .message(message)
                .details(details)
                .build();
    }

    public InvalidAccessException(int status, String message, List<String> details) {
        super("Message");
        exceptionDto = ExceptionDto.builder()
                .status(status)
                .message(message)
                .details(details)
                .build();

    }
}
