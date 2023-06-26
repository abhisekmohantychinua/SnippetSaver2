package dev.abhisek.backend.util;

import dev.abhisek.backend.entity.Mail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class MailUtil {
    private static JavaMailSender javaMailSender = null;


    private static String DEV_MAIL;

    @Autowired
    public MailUtil(JavaMailSender javaMailSender) {
        MailUtil.javaMailSender = javaMailSender;
    }

    @Value("${static.data.dev-mail}")
    public void setDevMail(String devMail) {
        DEV_MAIL = devMail;
    }

    public static void sendMail(Mail mail) {

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom(DEV_MAIL);
            helper.setTo(mail.getTo());
            helper.setSubject(mail.getSubject());
            helper.setText(mail.getMessages());

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


    }
}
