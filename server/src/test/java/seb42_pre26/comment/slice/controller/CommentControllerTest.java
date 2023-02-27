package seb42_pre26.comment.slice.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import seb42_pre26.comment.controller.CommentController;
import seb42_pre26.comment.dto.CommentResponseDto;
import seb42_pre26.comment.dto.PatchCommentDto;
import seb42_pre26.comment.dto.PostCommentDto;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.comment.mapper.CommentMapper;
import seb42_pre26.comment.service.CommentService;
import seb42_pre26.helper.CommentControllerTestHelper;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static seb42_pre26.comment.slice.util.ApiDocumentUtils.getRequestPreProcessor;
import static seb42_pre26.comment.slice.util.ApiDocumentUtils.getResponsePreProcessor;

@WebMvcTest(controllers = CommentController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class CommentControllerTest implements CommentControllerTestHelper{
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @MockBean
    private CommentMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    public void createCommentTest() throws Exception {
        PostCommentDto post = new PostCommentDto(1,"안녕하세요 이건 테스트 더미 데이터 입니다!!", 1);
        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(
                        post("/comment")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)

                );

        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "post-comment",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 아이디"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("투표")
                                )
                        ),
                        responseHeaders(
                                //headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }
    @Test
    public void patchCommentTest() throws Exception {
        long commentId = 1L;
        PatchCommentDto patch = new PatchCommentDto( commentId, "수정 데이터 입니다아아아", 1);
        String content = gson.toJson(patch);

        Comment comment = new Comment();
        comment.setCommentId(1L);
        comment.setContent("수정 데이터 입니다아아아");
        comment.setLikeCount(0);

        given(mapper.patchCommentDtoToComment(Mockito.any(PatchCommentDto.class))).willReturn(comment);
        given(commentService.updateComment(Mockito.anyLong(), Mockito.any(Comment.class))).willReturn(comment);
        CommentResponseDto commentResponseDto =
                new CommentResponseDto(1,1,"수정 데이터 입니다아아아", 1, LocalDateTime.now(),LocalDateTime.now());
        given(mapper.commentToCommentResponseDto(Mockito.any(Comment.class))).willReturn(commentResponseDto);

        ResultActions actions =
                mockMvc.perform(
                        patch("/comment/{comment-id}", commentId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("commentId").value(patch.getCommentId()))
                .andExpect(jsonPath("content").value(patch.getContent()))
                .andExpect(jsonPath("likeCount").value(patch.getLikeCount()))
                .andDo(document("patch-comment",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("comment-id").description("댓글 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("투표: 1:추천/ -1: 비추천").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("게시글 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("투표: 1:추천/ -1: 비추천"),
                                        fieldWithPath("created").type(JsonFieldType.STRING).description("생성 날짜"),
                                        fieldWithPath("modified").type(JsonFieldType.STRING).description("마지막 날짜")
                                )
                        )
                ));

    }
}
