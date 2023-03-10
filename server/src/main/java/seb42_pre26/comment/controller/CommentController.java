package seb42_pre26.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb42_pre26.comment.dto.CommentResponseDto;
import seb42_pre26.comment.dto.PatchCommentDto;
import seb42_pre26.comment.dto.PostCommentDto;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.comment.mapper.CommentMapper;
import seb42_pre26.comment.service.CommentService;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.question.dto.QuestionDto;
import seb42_pre26.question.entity.Question;

import javax.persistence.PreUpdate;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;

    }

    @PostMapping
    public ResponseEntity createComment(@Valid @RequestBody PostCommentDto postCommentDto) {
        //1. 서비스 사용하기
        //2. dto 파라미터로 받기
        //3. mapper 이용하기
        //4. ResponseEntity로 return 하기

        Comment comment = commentService.createComment(mapper.postCommentDtoToComment(postCommentDto));
        CommentResponseDto response = mapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId) throws BusinessException {
        try {
            Comment comment = commentService.readComment(commentId);
            CommentResponseDto response = mapper.commentToCommentResponseDto(comment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public ResponseEntity getComments(){
        List<Comment> comments = commentService.readComments();
        List<CommentResponseDto> responses = mapper.commentsToResponses(comments);
        return new ResponseEntity(responses,  HttpStatus.OK);
    }
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                       @Valid @RequestBody PatchCommentDto patchCommentDto) throws BusinessException {
        try {
            Comment comment = commentService.updateComment(commentId, mapper.patchCommentDtoToComment(patchCommentDto));
            CommentResponseDto response = mapper.commentToCommentResponseDto(comment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId) throws BusinessException {
        try {
            commentService.deleteComment(commentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
