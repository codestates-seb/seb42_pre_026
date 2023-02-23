package seb42_pre26.member.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberSignUpDto {

    private String email;
    private String name;
    private String phone;
    private String password;
    private String gender;
    private int age;
}
