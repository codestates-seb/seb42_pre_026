package seb42_pre26.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_pre26.comment.dto.PatchCommentDto;
import seb42_pre26.comment.dto.PostCommentDto;
import seb42_pre26.comment.dto.CommentResponseDto;
import seb42_pre26.comment.entity.Comment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "questionId", target = "question.questionId")
    Comment postCommentDtoToComment(PostCommentDto postCommentDto);
    Comment patchCommentDtoToComment(PatchCommentDto patchCommentDto);

    @Mapping(source = "question.questionId", target = "questionId")
    CommentResponseDto commentToCommentResponseDto(Comment comment);
    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments);
}
