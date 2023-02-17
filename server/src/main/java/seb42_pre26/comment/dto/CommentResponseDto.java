package seb42_pre26.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentResponseDto {
    private long commentId;
    private String content;
    private int likeCount;
}
