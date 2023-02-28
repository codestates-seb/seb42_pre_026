package seb42_pre26.comment.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class PostCommentDto {
    private long questionId;

    @NotBlank(message = "내용을 입력해주세요.")
    private String content;

    private int likeCount;
}
