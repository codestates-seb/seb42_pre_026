package seb42_pre26.comment.service;

import org.springframework.stereotype.Service;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.comment.exception.BusinessException;
import seb42_pre26.comment.exception.ExceptionCode;
import seb42_pre26.comment.repository.CommentRepository;
import seb42_pre26.post.entity.Post;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        findExistComment(comment.getCommentId());
        return commentRepository.save(comment);
    }


    public Comment findComment(long commentId) {
        return verifyComment(commentId);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = verifyComment(comment.getCommentId());
        findComment.setContent(comment.getContent());

        Optional.ofNullable(comment.getContent()).ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    public void deleteComment(long commentId) {
        findExistComment(commentId);

        commentRepository.deleteById(commentId);
    }

    public List<Comment> readComments(Post post) {
        return commentRepository.findAllByPostComments(post);
    }
    private Comment verifyComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_NOT_FOUND));
    }
    private void findExistComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isPresent()) {
            throw new BusinessException(ExceptionCode.COMMENT_EXIST);
        }
    }
}
