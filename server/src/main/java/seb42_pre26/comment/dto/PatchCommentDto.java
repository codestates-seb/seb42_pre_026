package seb42_pre26.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PatchCommentDto {
    private long commentId;
    private String content;
    private int likeCount;
}
