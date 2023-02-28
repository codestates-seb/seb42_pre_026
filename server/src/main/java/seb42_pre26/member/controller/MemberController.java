package seb42_pre26.member.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb42_pre26.global.dto.MultiResponseDto;
import seb42_pre26.global.dto.SingleResponseDto;
import seb42_pre26.member.dto.MemberDto;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.mapper.MemberMapper;
import seb42_pre26.member.service.MemberService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;


//    회원 등록(회원 가입)
    @PostMapping("/sign-up")
    public ResponseEntity postMember (@Valid @RequestBody MemberDto.Post requestBody) {

        Member member = mapper.memberPostToMember(requestBody);
        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(createMember)), HttpStatus.CREATED);

    }


//    회원 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember (@PathVariable("member-id") @Positive long memberId,
                                       @Valid @RequestBody MemberDto.Patch requestBody) {

        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)), HttpStatus.OK);

    }

//    회원 조회(마이페이지)
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }

//    회원 전체 조회
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponses(members),pageMembers), HttpStatus.OK);
    }


//    회원 삭제
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
