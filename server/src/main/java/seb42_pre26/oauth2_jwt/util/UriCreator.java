package seb42_pre26.oauth2_jwt.util;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {

    public static URI createUri(String defaultUrl, long resourcedId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl + "/{resource-id}")
                .buildAndExpand(resourcedId)
                .toUri();
    }



}
