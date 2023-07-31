package dev.abhisek.backend.exception;

import dev.abhisek.backend.dto.ExceptionDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class InappropriateActionException extends RuntimeException {
    private final ExceptionDto exceptionDto;

    public InappropriateActionException() {
        super("InappropriateActionException");
        this.exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.CONFLICT.value())
                .message("Invalid action !")
                .details(List.of("The action you are trying to do is already done!", "The action can be done once!"))
                .build();
    }

    public InappropriateActionException(List<String> details) {
        super("InappropriateActionException");
        this.exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.CONFLICT.value())
                .message("Invalid action !")
                .details(details)
                .build();
    }
}
