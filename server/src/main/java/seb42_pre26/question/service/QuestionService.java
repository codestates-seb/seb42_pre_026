package seb42_pre26.question.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.comment.repository.CommentRepository;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.repository.MemberRepository;
import seb42_pre26.member.service.MemberService;
import seb42_pre26.question.entity.Question;
import seb42_pre26.question.repository.QuestionRepository;

import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class QuestionService {

    private QuestionRepository questionRepository;
    private MemberRepository memberRepository;
    private CommentRepository commentRepository;
    private MemberService memberService;


    // CREATE
    public Question createQuestion(Question question){
        //Todo: 멤버 ID 담아서 저장하기
        // long memberId = memberService.getLoginMember().getMemberId();
        // Member member = getMemberFromId(memberId);

        return questionRepository.save(question);
    }
    // READ
    public Question readQuestion(long questionId){
        Question question = existQuestion(questionId);

        question.setViewCount(question.getViewCount() + 1);
        return questionRepository.save(question);
    }

    // UPDATE
    public Question updateQuestion(long questionId, Question question){
        Question verificationQuestion = verifyWriter(question.getQuestionId());

        verificationQuestion.setTitle(question.getTitle());
        verificationQuestion.setContent(question.getContent());

        return questionRepository.save(verificationQuestion);
    }

    // DELETE
    public void deleteQuestion(long questionId){
        Question verificationQuestion = verifyWriter(questionId);

        questionRepository.deleteById(verificationQuestion.getQuestionId());
    }

    // PAGINATION
    public Page<Question> readQuestions(int page, int size){
        return questionRepository.findAll(
                PageRequest.of(page, size, Sort.by("questionId").descending())
        );
    }
    // ID로 member 객체 찾기
    private Member getMemberFromId(long memberId) {
        return memberRepository.findById(memberId).get();
    }

    // 존재하는 게시글인지 확인하기
    private Question existQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        return question.orElseThrow(()-> new BusinessException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    // 게시글 작성자와 사용자가 같은지 확인
    private Question verifyWriter(long questionId){
        //Test
        long memberId = 1;
        Question question = existQuestion(questionId);
        if (question.getMember().getMemberId() != memberId){
            throw new BusinessException(ExceptionCode.NOT_AUTHORITY);
        }
        return question;
    }
}
