package seb42_pre26.member.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_pre26.audit.Auditable;
import seb42_pre26.comment.entity.Comment;
import seb42_pre26.question.entity.Question;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor

public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    // 추가
    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 13, nullable = false, unique = true)
    private String phone;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Question> comments = new ArrayList<>();

    @Column(nullable = true)
    private LocalDateTime created = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);

    @Column(nullable = true, name = "MODIFIED")
    private LocalDateTime modified = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comment> comment = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email, String name) {
        this.email = email;
        this.name = name;
    }

}
