package seb42_pre26.member.service;


import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.member.dto.MemberSignUpDto;
import seb42_pre26.member.entity.Member;
import seb42_pre26.member.entity.Role;
import seb42_pre26.member.repository.MemberRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(MemberSignUpDto memberSignUpDto) throws Exception {
        if (memberRepository.findByEmail(memberSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (memberRepository.findByName(memberSignUpDto.getName()).isPresent()) {
            throw new Exception("이미 존재하는 이름입니다.");
        }

        User member = Member.builder()
                .email.(memberSignUpDto.getEmail())
                .password(memberSignUpDto.getPassword())
                .name(memberSignUpDto.getName())
                .age(memberSignUpDto.getAge())
                .phone(memberSignUpDto.getPhone())
                .gender(memberSignUpDto.getGender())
                .role(Role.MEMBER)
                .build();

        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);

    }

}
