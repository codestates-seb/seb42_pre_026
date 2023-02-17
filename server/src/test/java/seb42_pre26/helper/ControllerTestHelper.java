package seb42_pre26.helper;

import com.google.gson.Gson;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public interface ControllerTestHelper<T> {
    default RequestBuilder postRequestBuilder(URI uri,
                                              String content) {
        return MockMvcRequestBuilders
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }

    default RequestBuilder patchRequestBuilder(String uri,
                                               String content) {
        return MockMvcRequestBuilders
                .patch(uri)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

    }

    default RequestBuilder patchRequestBuilder(URI uri,
                                               String content) {
        return MockMvcRequestBuilders
                .patch(uri)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

    }

    default RequestBuilder getRequestBuilder(String uri) {
        return MockMvcRequestBuilders
                .get(uri)
                .accept(MediaType.APPLICATION_JSON);
    }

    default RequestBuilder getRequestBuilder(URI uri) {
        return MockMvcRequestBuilders
                .get(uri)
                .accept(MediaType.APPLICATION_JSON);
    }

    default RequestBuilder getRequestBuilder(URI uri, MultiValueMap<String, String> queryParams) {
        return MockMvcRequestBuilders
                .get(uri)
                .params(
                        queryParams
                )
                .accept(MediaType.APPLICATION_JSON);
    }

    default RequestBuilder deleteRequestBuilder(String uri) {
        return MockMvcRequestBuilders.delete(uri);
    }

    default RequestBuilder deleteRequestBuilder(URI uri) {
        return MockMvcRequestBuilders.delete(uri);
    }

    default URI createURI(String url) {
        return UriComponentsBuilder.newInstance().path(url).build().toUri();
    }

    default URI createURI(String url, long resourceId) {
        return UriComponentsBuilder.newInstance().path(url).buildAndExpand(resourceId).toUri();
    }

    default String toJsonContent(T t) {
        Gson gson = new Gson();
        String content = gson.toJson(t);
        return content;
    }
}
