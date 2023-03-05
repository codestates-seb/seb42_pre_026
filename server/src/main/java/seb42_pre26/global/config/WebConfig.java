package seb42_pre26.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS 에러 방지를 위함
@Configuration
public class WebConfig implements WebMvcConfigurer {

 @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://preproject.s3-website.ap-northeast-2.amazonaws.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS" , "PATCH")
	    .exposedHeaders("Authorization", "RefreshToken")
	    .allowCredentials(true);
    }


}
