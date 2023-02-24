package seb42_pre26.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb42_pre26.member.dto.MemberSignUpDto;
import seb42_pre26.member.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberSignUpDto.Post requestBody);
    Member memberPatchToMember(MemberSignUpDto.Patch requestBody);
    MemberSignUpDto.Response memberToMemberResponse(Member member);
    List<MemberSignUpDto.Response> membersToMemberResponses(List<Member> members);
}
