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
    private String name;
    private String content;
    private int likeCount;
    private LocalDateTime created;
    private LocalDateTime modified;
}
