package seb42_pre26.member.service;


import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;
import seb42_pre26.member.Role;
import seb42_pre26.member.dto.MemberSignUpDto;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.repository.MemberRepository;
import seb42_pre26.oauth2_jwt.util.CustomAuthorityUtils;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;

    private final PasswordEncoder passwordEncoder;

    private final CustomAuthorityUtils authorityUtils;


////생성자 DI용 파라미터 추가
//    public MemberService(MemberRepository memberRepository,
//                         ApplicationEventPublisher publisher,
//                         PasswordEncoder passwordEncoder,
//                         CustomAuthorityUtils authorityUtils) {
//        this.memberRepository = memberRepository;
//        this.publisher = publisher;
//        this.passwordEncoder = passwordEncoder;
//        this.authorityUtils = authorityUtils;
//    }




    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        // 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getPhone())
                .ifPresent(phone -> findMember.setPhone(phone));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessException(ExceptionCode.MEMBER_EXISTS);
    }






    public void signUp(MemberSignUpDto memberSignUpDto) throws Exception {
        if (memberRepository.findByEmail(memberSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (memberRepository.findByName(memberSignUpDto.getName()).isPresent()) {
            throw new Exception("이미 존재하는 이름입니다.");
        }

//        Member member = Member.builder()
//                .email.(memberSignUpDto.getEmail())
//                .password(memberSignUpDto.getPassword())
//                .name(memberSignUpDto.getName())
//                .age(memberSignUpDto.getAge())
//                .phone(memberSignUpDto.getPhone())
//                .gender(memberSignUpDto.getGender())
//                .role(Role.USER)
//                .build();
//
//        member.passwordEncode(passwordEncoder);
//        memberRepository.save(member);

    }


}
