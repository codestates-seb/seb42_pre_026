package seb42_pre26.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private long commentId;
    private long questionId;
    private String content;
    private int likeCount;
}
