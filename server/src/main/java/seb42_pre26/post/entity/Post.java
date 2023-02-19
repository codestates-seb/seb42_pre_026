package seb42_pre26.post.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb42_pre26.comment.entity.Comment;
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
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    private LocalDateTime created = LocalDateTime.now();

    private LocalDateTime modified = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();
}
