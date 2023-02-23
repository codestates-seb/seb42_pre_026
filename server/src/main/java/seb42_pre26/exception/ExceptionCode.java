package seb42_pre26.exception;

import lombok.Getter;

public enum ExceptionCode {
    COMMENT_NOT_FOUND(1, "댓글을 찾지 못하였습니다"),
    COMMENT_EXIST(2,"댓글이 존재합니다"),
    QUESTION_NOT_FOUND(3,"게시글을 찾지 못하였습니다"),
    QUESTION_EXIST(4, "게시글이 존재합니다"),
    NOT_AUTHORITY(5, "권한이 없습니다.");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
