package seb42_pre26.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import seb42_pre26.question.dto.QuestionDto;
import seb42_pre26.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post post);
    Question questionPatchDtoToQuestion(QuestionDto.Patch patch);

    QuestionDto.ResponseCheck questionToResponseCheck(Question question);

    List<QuestionDto.Response> questionsToResponses(List<Question> questions);

    @Mapping(source = "member.name", target = "memberName")
    @Mapping(source = "member.email", target = "memberEmail")
    QuestionDto.Response questionToResponse(Question question);

}
