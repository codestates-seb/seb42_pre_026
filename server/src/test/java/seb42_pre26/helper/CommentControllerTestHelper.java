package seb42_pre26.helper;

import java.net.URI;

public interface CommentControllerTestHelper extends ControllerTestHelper{
    String COMMENT_URL = "/comment";
    default URI getURI() {
        return createURI(COMMENT_URL);
    }

    default URI getURI(long commentId) {
        return createURI(COMMENT_URL + "/{commentId}", commentId);
    }
}
