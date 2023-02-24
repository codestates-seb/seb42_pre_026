package seb42_pre26.question.mapper;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import seb42_pre26.comment.dto.CommentResponseDto;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.question.dto.QuestionDto;
import seb42_pre26.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post post);
    Question questionPatchDtoToQuestion(QuestionDto.Patch patch);

    @Mapping(source = "member.name", target = "memberName")
    @Mapping(source = "member.email", target = "memberEmail")
    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentResponseDto")
    QuestionDto.Response questionToResponse(Question question);
    List<QuestionDto.Response> questionsToResponses(List<Question> questions);

    @Named("commentToCommentResponseDto")
    @Mapping(source = "question.questionId", target = "questionId")
    CommentResponseDto commentToCommentResponseDto(Comment comment);

}
