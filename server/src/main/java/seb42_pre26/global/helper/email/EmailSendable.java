package seb42_pre26.global.helper.email;

import org.springframework.stereotype.Component;

@Component
public interface EmailSendable {
    void send(String message) throws InterruptedException;
}
