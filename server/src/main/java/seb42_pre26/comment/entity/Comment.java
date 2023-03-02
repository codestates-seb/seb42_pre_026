package seb42_pre26.comment.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb42_pre26.audit.Auditable;
import seb42_pre26.question.entity.Question;
import seb42_pre26.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    private int likeCount;

//    @Column(nullable = true)
//    @CreatedDate
//    private LocalDateTime created = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
//
//    @Column(nullable = true, name = "MODIFIED")
//    @LastModifiedDate
//    private LocalDateTime modified = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

}
