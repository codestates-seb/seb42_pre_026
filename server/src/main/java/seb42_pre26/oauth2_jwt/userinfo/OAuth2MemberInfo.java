package seb42_pre26.oauth2_jwt.userinfo;

import java.util.Map;

public abstract class OAuth2MemberInfo {

    protected Map<String, Object> attributes;

    public OAuth2MemberInfo(Map<String, Object> attributes) {this.attributes = attributes;}

    public abstract String getId();

    public abstract String getName();



}
