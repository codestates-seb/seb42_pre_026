package seb42_pre26.question.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.comment.service.CommentService;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.service.MemberService;
import seb42_pre26.question.dto.QuestionDto;
import seb42_pre26.question.entity.Question;
import seb42_pre26.question.mapper.QuestionMapper;
import seb42_pre26.question.repository.QuestionRepository;
import seb42_pre26.question.service.QuestionService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin
@Validated
@AllArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post post){
        Question question = questionService.createQuestion(questionMapper.questionPostDtoToQuestion(post));

        QuestionDto.Response response = questionMapper.questionToResponse(question);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) throws BusinessException {
        try{
            Question question = questionService.readQuestion(questionId);
            QuestionDto.Response response = questionMapper.questionToResponse(question);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (BusinessException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam int page,@RequestParam int size){
        Page<Question> questionPage = questionService.readQuestions(page -1, size);
        List<Question> questions = questionPage.getContent();

        List<QuestionDto.Response> responses = questionMapper.questionsToResponses(questions);

        return new ResponseEntity(responses,  HttpStatus.OK);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") long questionId, @Valid @RequestBody QuestionDto.Patch patch) throws BusinessException{
        try {
            Question question =questionService.updateQuestion(questionId, questionMapper.questionPatchDtoToQuestion(patch));

            QuestionDto.Response response = questionMapper.questionToResponse(question);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (BusinessException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deletePost(@PathVariable("question-id") long questionId)throws BusinessException{
        try {
            questionService.deleteQuestion(questionId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (BusinessException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
