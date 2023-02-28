package seb42_pre26.member.service;




import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;
import seb42_pre26.global.auth.utils.CustomAuthorityUtils;
import seb42_pre26.global.auth.utils.GetAuthUserUtils;
import seb42_pre26.global.util.CustomBeanUtils;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

//    public MemberService(MemberRepository memberRepository,
//                         CustomBeanUtils<Member> beanUtils,
//                         PasswordEncoder passwordEncoder,
//                         CustomAuthorityUtils authorityUtils) {
//        this.memberRepository = memberRepository;
//        this.beanUtils = beanUtils;
//        this.passwordEncoder = passwordEncoder;
//        this.authorityUtils = authorityUtils;
//    }

// 회원 가입
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        // Password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }


//    회원 수정

//    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        verifyExistsEmail2(member.getEmail());

        Member findMember = findVerifiedMember(member.getMemberId());

        if(getLoginMember().getMemberId() != member.getMemberId())
            throw new BusinessException(ExceptionCode.MEMBER_NOT_FOUND);

        beanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(findMember);
    }

//    회원 조회
@Transactional(readOnly = true)
public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
}

// 전체 회원 조회
public Page<Member> findMembers(int page, int size) {

        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

//    회원 삭제
public void deleteMember(long memberId) {

    Member findMember = findVerifiedMember(memberId);
    if(getLoginMember().getMemberId() != findMember.getMemberId())
        throw new BusinessException(ExceptionCode.MEMBER_NOT_FOUND);

    memberRepository.delete(findMember);
    }

// 회원 id로 검색
//    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() -> { throw  new BusinessException(ExceptionCode.MEMBER_NOT_FOUND);
        });
    }

    // member email 이 존재하는지 검증 --> 등록 시, email 같은 이메일이 존재한다면 exception 반환
    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessException(ExceptionCode.MEMBER_EXISTS);
    }

    // member email 이 존재하는지 검증 --> 수정 시, 같은 email 이여야지만 수정이 가능하도록 ( 해당 email 이 없다면 exception 반환 )
    private void verifyExistsEmail2(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isEmpty())
            throw new BusinessException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    // Login 한 Member 를 가져오는 로직
    public Member getLoginMember() {
        return  memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName())
                .orElseThrow(()
                        -> new BusinessException(ExceptionCode.MEMBER_NOT_FOUND));
    }


}


