package seb42_pre26.comment.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import seb42_pre26.question.entity.Question;
import seb42_pre26.member.entity.Member;


import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    private Integer isLike;
}
