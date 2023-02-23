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
import seb42_pre26.question.entity.Question;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PutMapping
    public ResponseEntity postComment(@RequestBody PostCommentDto postCommentDto) {

        //1. 서비스 사용하기

        //2. dto 파라미터로 받기

        //3. mapper 이용하기
        Comment comment = mapper.postCommentDtoToComment(postCommentDto);
        //TEST
        Question tmp = new Question();
        tmp.setQuestionId(postCommentDto.getQuestionId());
        comment.setQuestion(tmp);
        Comment response = commentService.createComment(comment);

        //4. ResponseEntity로 return 하기

        return new ResponseEntity(mapper.commentToCommentResponseDto(response), HttpStatus.CREATED);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId) {

        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity(mapper.commentToCommentResponseDto(comment), HttpStatus.OK);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                       @RequestBody PatchCommentDto patchCommentDto) {

        Comment comment = mapper.patchCommentDtoToComment(patchCommentDto);
        Comment response = commentService.updateComment(comment);

        return new ResponseEntity(mapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId) {

        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /*@GetMapping
    public ResponseEntity readComments(Question question) {

        List<Comment> list = commentService.readComments(question);
        List<CommentResponseDto> response = mapper.commentsToCommentResponseDtos(list);

        return new ResponseEntity(response, HttpStatus.OK);
    }
*/
    /*필터 기능 추후에 구현*/
//    @GetMapping
//    public ResponseEntity getCommentsBySort() {
//
//        return new ResponseEntity();
//    }

}
