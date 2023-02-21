package seb42_pre26.post.mapper;

import org.mapstruct.Mapper;
import seb42_pre26.post.entity.Post;

@Mapper(componentModel = "spring")
public interface PostMapper {
    Post PostDtoTopost(Post postDto);

}
