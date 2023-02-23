package seb42_pre26.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_pre26.member.entity.Member;
//import seb42_pre26.member.entity.Role;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByName(String name);

//    Optional<Member> findByRefreshToken(String refreshToken);

    //Optional<Member> findBySocialTypeAndSocialId(Role.SocialType socialType, String socialType);

}
