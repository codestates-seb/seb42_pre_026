package seb42_pre26.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb42_pre26.post.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
