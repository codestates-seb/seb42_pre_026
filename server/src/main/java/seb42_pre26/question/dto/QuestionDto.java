package seb42_pre26.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import seb42_pre26.comment.dto.CommentResponseDto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        @NotBlank(message = "내용을 입력해주세요.")
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        @NotBlank(message = "내용을 입력해주세요.")
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private long questionId;
        private String title;
        private String content;
        private int viewCount;
        private LocalDateTime created;
        private LocalDateTime modified;


        private String memberName;
        private String memberEmail;

        private List<CommentResponseDto> comments;
    }

    @Getter
    @Setter
    public static class ResponseCheck{
        private long Id;
    }
}
