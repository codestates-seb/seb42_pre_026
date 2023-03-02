package seb42_pre26.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import seb42_pre26.comment.dto.PatchCommentDto;
import seb42_pre26.comment.dto.PostCommentDto;
import seb42_pre26.comment.dto.CommentResponseDto;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.question.dto.QuestionDto;
import seb42_pre26.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "questionId", target = "question.questionId")
    Comment postCommentDtoToComment(PostCommentDto postCommentDto);

    Comment patchCommentDtoToComment(PatchCommentDto patchCommentDto);

    @Mapping(source = "question.questionId", target = "questionId")
    @Mapping(source = "member.name", target = "memberName")
    @Mapping(source = "member.email", target = "memberEmail")
    CommentResponseDto commentToCommentResponseDto(Comment comment);

    List<CommentResponseDto> commentsToResponses(List<Comment> comments);

}