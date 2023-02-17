package seb42_pre26.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatchCommentDto {
    private long commentId;
    private String content;
    private int likeCount;
}
