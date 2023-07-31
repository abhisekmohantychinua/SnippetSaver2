package dev.abhisek.backend.util;


import dev.abhisek.backend.entity.RegisterRequest;
import dev.abhisek.backend.exception.InvalidCredentialException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class AppUtil {

    public static <T, P> P entityToDto(T entity, Class<P> dtoClass) {
        try {
            P dto = dtoClass.getConstructor().newInstance();
            BeanUtils.copyProperties(entity, dto);
            return dto;
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException |
                 NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    public static <T, P> T dtoToEntity(P dto, Class<T> entityClass) {
        try {
            T entity = entityClass.getConstructor().newInstance();
            BeanUtils.copyProperties(dto, entity);
            return entity;
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException |
                 NoSuchMethodException e) {
            throw new RuntimeException(e);
        }

    }

    public static String getEncryptedToken(RegisterRequest request) {

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest
                    .digest((UUID
                            .randomUUID()
                            + request.getEmail()
                            + request.getPassword()
                    ).getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }

    public static void validateEmail(String email) throws InvalidCredentialException {
// Use a regular expression to validate the email format
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        if (!matcher.matches()) {
            throw new InvalidCredentialException(
                    List.of("Invalid email provided !",
                            "email : " + email));
        }
    }

    public static void validatePassword(String password) throws InvalidCredentialException {
        // Password should contain at least 8 characters and at least 4 numbers
        String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d.*\\d.*\\d.*\\d)[A-Za-z\\d]{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        Matcher matcher = pattern.matcher(password);
        if (!matcher.matches()) {
            throw new InvalidCredentialException(List.of("Invalid password provided!",
                    "password : " + password,
                    "Password must contain at least 8 characters.",
                    "Password must contain at least 4 numbers."));
        }
    }

}
