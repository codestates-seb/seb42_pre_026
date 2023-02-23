package seb42_pre26.comment.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;
import seb42_pre26.comment.repository.CommentRepository;
import seb42_pre26.question.entity.Question;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        findExistComment(comment.getCommentId());
        return commentRepository.save(comment);
    }


    @Transactional(readOnly = true)
    public Comment findComment(long commentId) {
        return verifyComment(commentId);
    }

    @Transactional(propagation = Propagation.REQUIRED)
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

    //public List<Comment> readComments(Question question) {
     //   return commentRepository.findAllByPostComments(question);
    //}

    @Transactional(readOnly = true)
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
