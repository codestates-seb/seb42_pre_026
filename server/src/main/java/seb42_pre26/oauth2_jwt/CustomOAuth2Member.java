package seb42_pre26.oauth2_jwt;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import javax.management.relation.Role;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

@Getter
public class CustomOAuth2Member extends DefaultOAuth2User {

    private String email;
    private Role role;

    public CustomOAuth2Member(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes, String nameAttributeKey,
                            String email, Role role) {
        super(authorities, attributes, nameAttributeKey);
        this.email = email;
        this.role = role;
    }

    public CustomOAuth2Member(Set<SimpleGrantedAuthority> singleton, Map<String, Object> attributes, String nameAttributeKey, String email, seb42_pre26.member.Role role) {
        super(singleton, attributes, nameAttributeKey);
    }
}

