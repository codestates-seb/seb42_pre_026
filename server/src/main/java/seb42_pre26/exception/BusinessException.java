package seb42_pre26.exception;


import lombok.Getter;

public class BusinessException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
