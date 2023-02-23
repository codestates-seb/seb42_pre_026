package seb42_pre26.member.entity;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.member.Role;
import seb42_pre26.member.SocialType;
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
    private SocialType socialType;

    private String socialId;

    private String refreshToken;


    public void authorizeMember() {
        this.role = Role.MEMBER;
    }


    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateName(String updateName) {this.name = updateName; }
    public void updateAge(int updateAge) {this.age = updateAge; }
    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(updatePassword);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}

