package dev.abhisek.backend.exception;

import dev.abhisek.backend.dto.ExceptionDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class InvalidCredentialException extends RuntimeException {
    private final ExceptionDto exceptionDto;

    public InvalidCredentialException(String message, List<String> details) {
        super("InvalidCredentialsException");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .details(details)
                .build();
    }

    public InvalidCredentialException(List<String> details) {
        super("InvalidCredentialsException");
        exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Invalid Credentials Provided")
                .details(details)
                .build();
    }
}
