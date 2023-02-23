package seb42_pre26.oauth2_jwt;


import lombok.Builder;
import lombok.Getter;
import seb42_pre26.member.Role;
import seb42_pre26.member.SocialType;
import seb42_pre26.member.entity.Member;
import seb42_pre26.oauth2_jwt.userinfo.GoogleOAuth2UserInfo;
import seb42_pre26.oauth2_jwt.userinfo.KakaoOAuth2UserInfo;
import seb42_pre26.oauth2_jwt.userinfo.NaverOAuth2MemberInfo;
import seb42_pre26.oauth2_jwt.userinfo.OAuth2MemberInfo;

import java.util.Map;
import java.util.UUID;


@Getter
public class OAuthAttributes {

    private String nameAttributeKey;
    private OAuth2MemberInfo oauth2MemberInfo;

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2MemberInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2MemberInfo = oauth2UserInfo;
    }


    public static OAuthAttributes of(SocialType socialType,
                                     String userNameAttributeName, Map<String, Object> attributes) {

        if (socialType == SocialType.NAVER) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (socialType == SocialType.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new NaverOAuth2MemberInfo(attributes))
                .build();
    }


    public Member toEntity(SocialType socialType, OAuth2MemberInfo oauth2UserInfo) {
        return Member.builder()
                .socialType(socialType)
                .socialId(oauth2UserInfo.getId())
                .email(UUID.randomUUID() + "@socialUser.com")
                .name(oauth2UserInfo.getName())
                .role(Role.GUEST)
                .build();
    }
}
