package seb42_pre26.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb42_pre26.question.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
