package seb42_pre26.post.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.exception.ExceptionCode;
import seb42_pre26.member.entity.Member;
import seb42_pre26.post.entity.Post;
import seb42_pre26.post.repository.MemberRepository;
import seb42_pre26.post.repository.PostRepository;

import java.util.Optional;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post){
        findExistPost(post.getPostId());
        return postRepository.save(post);
    }


    public Post findPost(long postId){
        return verifyPost(postId);
    }

    public Post updatePost(Post post){
        Post findPost = verifyPost(post.getPostId());
        findPost.setContent(post.getContent());
        findPost.setTitle(post.getTitle());

        Optional.ofNullable(post.getTitle()).ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContent()).ifPresent(content-> findPost.setContent(content));

        return postRepository.save(post);
    }

    public void deletePost(long postId){
        verifyPost(postId);
        postRepository.deleteById(postId);
    }

    @Transactional
    private Post verifyPost(long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(() -> new BusinessException(ExceptionCode.POST_NOT_FOUND));
    }

    private void findExistPost(long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()){
            throw new BusinessException(ExceptionCode.POST_EXIST);
        }
    }
}
