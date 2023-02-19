package seb42_pre26.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb42_pre26.exception.BusinessException;
import seb42_pre26.member.entity.Member;
import seb42_pre26.post.entity.Post;
import seb42_pre26.post.mapper.PostMapper;
import seb42_pre26.post.service.PostService;

import javax.persistence.PreUpdate;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private PostMapper mapper;

    @PostMapping
    public ResponseEntity postPost(@RequestBody Post post){
        postService.createPost(post);

        return new ResponseEntity(post, HttpStatus.CREATED);
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") long postId) throws BusinessException {
        try{
            Post post = postService.findPost(postId);
            return new ResponseEntity(post, HttpStatus.OK);
        }
        catch (BusinessException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") long postId, @RequestBody Post post){
        post.setPostId(postId);
        Post response = postService.updatePost(post);

        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long postId)throws BusinessException{
        try {
            postService.deletePost(postId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (BusinessException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
