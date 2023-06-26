package dev.abhisek.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Mail {
    private String from;
    private String to;
    private String subject;
    private String messages;
}
