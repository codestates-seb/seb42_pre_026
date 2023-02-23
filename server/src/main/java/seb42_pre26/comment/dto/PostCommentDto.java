package seb42_pre26.comment.dto;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
public class PostCommentDto {
    private long commentId;
    private long questionId;
    @NotNull
    private String content;
    private int likeCount;
    private LocalDateTime created;
    private LocalDateTime modified;
}
