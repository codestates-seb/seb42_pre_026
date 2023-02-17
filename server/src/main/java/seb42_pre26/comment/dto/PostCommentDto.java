package seb42_pre26.comment.dto;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class PostCommentDto {
    private long commentId;
    @NotNull
    private String content;
    private int likeCount;
    private LocalDateTime created;
    private LocalDateTime modified;
}
