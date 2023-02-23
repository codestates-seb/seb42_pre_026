package seb42_pre26.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_pre26.comment.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
