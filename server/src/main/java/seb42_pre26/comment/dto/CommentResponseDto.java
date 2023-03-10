package seb42_pre26.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private long commentId;
    private long questionId;
    private String content;
    private int likeCount;
    private String memberName;
    private String memberEmail;
    private LocalDateTime created;
    private LocalDateTime modified;
}
