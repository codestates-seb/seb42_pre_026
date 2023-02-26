package seb42_pre26.global.helper.event;


import lombok.Getter;
import seb42_pre26.member.entity.Member;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }
}
