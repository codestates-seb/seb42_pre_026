package seb42_pre26.comment.entity;

import lombok.*;
import seb42_pre26.post.entity.Post;
import seb42_pre26.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    @NonNull
    private String content;
    private int likeCount;

    @Column(nullable = true)
    private LocalDateTime created = LocalDateTime.now();

    @Column(nullable = true, name = "MODIFIED")
    private LocalDateTime modified = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    /*Post entity 만드신 후 주석 풀어 주세여!*/

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @OneToMany(mappedBy = "comment")
    private List<Vote> votes = new ArrayList<>();

}
