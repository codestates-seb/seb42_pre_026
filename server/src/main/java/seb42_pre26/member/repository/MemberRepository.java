package seb42_pre26.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb42_pre26.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}
