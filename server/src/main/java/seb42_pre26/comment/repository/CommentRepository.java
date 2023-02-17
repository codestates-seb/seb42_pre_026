package seb42_pre26.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.post.entity.Post;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostComments(Post post);
}
