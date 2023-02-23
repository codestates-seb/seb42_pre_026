package seb42_pre26.member.entity;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.post.entity.Post;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Entity
@Builder
@Table(name = "MEMBER")
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String password;
    private String gender;
    private int age;

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime created = LocalDateTime.now();

    @Column(nullable = true, name = "MODIFIED")
    private LocalDateTime modified = LocalDateTime.now();


// security
    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Role.SocialType socialType; // kakao, naver, google

    private String socialId;  //로그인한 소셜 타입의 식별자 값(일반 로그인인 경우 null)

    private String refreshToken; // 리프레쉬 토큰

//    맴버 권한 설정 메소드
    public void authorizeMember() {
        this.role = Role.MEMBER;
    }

//    비밀번호 암호화 메서드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }



}
//??? 위치가 여기 맞나?
@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"), MEMBER("ROLE_MEMBER");

    private final String key;

    public enum SocialType {
        KAKAO, NAVER, GOOGLE
    }

}

