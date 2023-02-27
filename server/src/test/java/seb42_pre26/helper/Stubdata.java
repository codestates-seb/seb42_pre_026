package seb42_pre26.helper;

import org.springframework.http.HttpMethod;
import seb42_pre26.comment.dto.CommentResponseDto;
import seb42_pre26.comment.dto.PatchCommentDto;
import seb42_pre26.comment.dto.PostCommentDto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class Stubdata {
    private static Map<HttpMethod, Object> stubRequestBody;

    static {
        stubRequestBody = new HashMap<>();
        stubRequestBody.put(HttpMethod.POST, new PostCommentDto(1,"안녕하세요 이건 테스트 더미 데이터 입니다!!", 1));
        stubRequestBody.put(HttpMethod.PATCH, new PatchCommentDto(1,"안녕하세요 이건 수정하는 더미 데이터입니다아아아아악~!!!!", 1));

    }
    public static class MockComment {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static CommentResponseDto getSingleResponseBody() {
            return new CommentResponseDto(1,1,"응답을 받아볼게요~~~", 1, LocalDateTime.now(), null);
        }
    }
}
