package seb42_pre26.comment.slice.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.comment.dto.PostCommentDto;
import seb42_pre26.helper.CommentControllerTestHelper;
import seb42_pre26.helper.Stubdata;

import java.net.URI;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class CommentControllerTest implements CommentControllerTestHelper {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private ResultActions postResultActions;
    private PostCommentDto post;

    public void init() throws Exception {
        this.post = (PostCommentDto) Stubdata.MockComment.getRequestBody(HttpMethod.POST);
        String content = gson.toJson(post);
        URI uri = getURI();
        this.postResultActions = mockMvc.perform(postRequestBuilder(uri, content));
    }
}
