package seb42_pre26.comment.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class BusinessException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;
    public BusinessException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
