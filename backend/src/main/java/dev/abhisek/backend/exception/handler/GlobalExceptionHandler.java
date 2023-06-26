package dev.abhisek.backend.exception.handler;

import dev.abhisek.backend.dto.ExceptionDto;
import dev.abhisek.backend.exception.*;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class GlobalExceptionHandler {
    //    Log all the exception for better development
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> exceptionHandler(Exception exception) {
        exception.printStackTrace();
        ExceptionDto exceptionDto = ExceptionDto
                .builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("""
                        Some unhandled error or exception is occurred during processing your request.
                        It has been informed to our developers and this will be resolved soon.""")
                .details(null)
                .build();
        return ResponseEntity
                .internalServerError()
                .body(exceptionDto);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionDto> handleDisabledException(DisabledException disabledException) {
        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.FORBIDDEN.value())
                .message("""
                        Your account is disabled, cannot login to it
                        """)
                .details(List.of(disabledException.getLocalizedMessage()))
                .build();

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(exceptionDto);
    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionDto> handleLockedException(LockedException lockedException) {
        String errorMessage = "Your account is locked. Please contact the administrator for assistance.";
        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.FORBIDDEN.value())
                .message("Access Denied")
                .details(Collections.singletonList(errorMessage))
                .build();

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionDto);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionDto> handleBadCredentialsException(BadCredentialsException badCredentialsException) {
        String errorMessage = "Invalid username or password.";
        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message("Authentication Failed")
                .details(Collections.singletonList(errorMessage))
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exceptionDto);
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionDto> handleMessagingException(MessagingException exception) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = "An error occurred while sending the email";
        List<String> details = Collections.singletonList(exception.getLocalizedMessage());

        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(status.value())
                .message(message)
                .details(details)
                .build();

        return ResponseEntity
                .status(status)
                .body(exceptionDto);
    }

    @ExceptionHandler({
            UnsupportedJwtException.class,
            MalformedJwtException.class,
            SignatureException.class,
            ExpiredJwtException.class,
            IllegalArgumentException.class
    })
    public ResponseEntity<ExceptionDto> handleJwtExceptions(Exception exception) {

        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Invalid or expired JWT";
        List<String> details = Collections.singletonList(exception.getLocalizedMessage());

        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(status.value())
                .message(message)
                .details(details)
                .build();

        return ResponseEntity
                .status(status)
                .body(exceptionDto);
    }

    @ExceptionHandler(InvalidAccessException.class)
    public ResponseEntity<ExceptionDto> handleInvalidAccessException(InvalidAccessException exception) {

        ExceptionDto exceptionDto = exception.getExceptionDto();

        return ResponseEntity.status(exceptionDto.getStatus()).body(exceptionDto);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleUserNotFoundException(UserNotFoundException exception) {
        ExceptionDto exceptionDto = exception.getExceptionDto();
        return ResponseEntity.status(exceptionDto.getStatus()).body(exceptionDto);
    }

    @ExceptionHandler(SnippetNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleSnippetNotFoundException(SnippetNotFoundException exception) {
        ExceptionDto exceptionDto = exception.getExceptionDto();
        return ResponseEntity.status(exceptionDto.getStatus()).body(exceptionDto);
    }

    @ExceptionHandler(NotMatchingException.class)
    public ResponseEntity<ExceptionDto> handleNotMatchingException(NotMatchingException exception) {
        ExceptionDto exceptionDto = exception.getExceptionDto();
        return ResponseEntity.status(exceptionDto.getStatus()).body(exceptionDto);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ExceptionDto> handleInvalidTokenException(InvalidTokenException exception) {
        ExceptionDto exceptionDto = exception.getExceptionDto();
        return ResponseEntity.status(exceptionDto.getStatus()).body(exceptionDto);
    }


    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ExceptionDto> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        String message = "HTTP method not supported";
        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(HttpStatus.METHOD_NOT_ALLOWED.value())
                .message(message)
                .details(List.of("method : " + ex.getMethod(),
                        "supported methods : " + Arrays.toString(ex.getSupportedMethods()),
                        "Please chose from above and try again"))
                .build();
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(exceptionDto);
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<ExceptionDto> handleHttpMessageConversionException(HttpMessageConversionException exception){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "Error converting HTTP message";
        List<String> details = Collections.singletonList(exception.getLocalizedMessage().concat("Or Read the Documentation "));

        ExceptionDto exceptionDto = ExceptionDto.builder()
                .status(status.value())
                .message(message)
                .details(details)
                .build();
        return ResponseEntity
                .status(exceptionDto.getStatus())
                .body(exceptionDto);
    }
}
