package seb42_pre26.comment.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;
import seb42_pre26.comment.repository.CommentRepository;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.repository.MemberRepository;
import seb42_pre26.member.service.MemberService;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private MemberService memberService;

    // CREATE
    public Comment createComment(Comment comment) {
        findExistComment(comment.getCommentId());

        long memberId = memberService.getLoginMember().getMemberId();
        Member member = getMemberFromId(memberId);
        comment.setMember(member);
        return commentRepository.save(comment);
    }

    private Member getMemberFromId(long memberId) {
        return memberRepository.findById(memberId).get();
    }

    // READ
    @Transactional(readOnly = true)
    public Comment readComment(long commentId) {
        return verifyComment(commentId);
    }

    public List<Comment> readComments() {
        return commentRepository.findAll();
    }


    // UPDATE
    @Transactional(propagation = Propagation.REQUIRED)
    public Comment updateComment(long commentId, Comment comment) {
        Comment verifyComment = verifyWriter(commentId);
        verifyComment.setContent(comment.getContent());

        return commentRepository.save(comment);
    }

    // DELETE
    public void deleteComment(long commentId) {

        Comment verifyComment = verifyWriter(commentId);
        commentRepository.deleteById(verifyComment.getCommentId());
    }


    //ID ?????? ????????? ????????? ?????? ??????.
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

    private Comment verifyWriter(long commentId){
        //Test
        long memberId = memberService.getLoginMember().getMemberId();
        Comment comment = verifyComment(commentId);
        if (comment.getMember().getMemberId() != memberId){
            throw new BusinessException(ExceptionCode.NOT_AUTHORITY);
        }return comment;
    }
}
