package seb42_pre26.comment.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb42_pre26.vote.Vote;
import seb42_pre26.question.entity.Question;
import seb42_pre26.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    private int likeCount;

    @Column(nullable = true)
    @CreatedDate
    private LocalDateTime created = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);

    @Column(nullable = true, name = "MODIFIED")
    @LastModifiedDate
    private LocalDateTime modified = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    //@OneToMany(mappedBy = "comment")
    //private List<Vote> votes = new ArrayList<>();

}
