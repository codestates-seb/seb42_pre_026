package seb42_pre26.oauth2_jwt.userinfo;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2MemberInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }


}
