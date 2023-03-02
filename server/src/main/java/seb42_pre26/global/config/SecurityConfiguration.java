package seb42_pre26.global.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import seb42_pre26.global.auth.filter.JwtAuthenticationFilter;
import seb42_pre26.global.auth.filter.JwtVerificationFilter;
import seb42_pre26.global.auth.handler.MemberAccessDeniedHandler;
import seb42_pre26.global.auth.handler.MemberAuthenticationEntryPoint;
import seb42_pre26.global.auth.handler.MemberAuthenticationFailureHandler;
import seb42_pre26.global.auth.handler.MemberAuthenticationSuccessHandler;
import seb42_pre26.global.auth.jwt.JwtTokenizer;
import seb42_pre26.global.auth.utils.CustomAuthorityUtils;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers().frameOptions().disable()
            .and()
            .csrf().disable()
            .cors().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin().disable()
            .httpBasic().disable()
            .exceptionHandling()
            .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
            .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
            .and()
            .apply(new CustomFilterConfigure())
            .and()
            .authorizeHttpRequests(authorize -> authorize
                    .antMatchers(HttpMethod.GET, "/*/question").permitAll()
                    .antMatchers(HttpMethod.GET, "/*/question/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/*/comment/**").permitAll()
                    .antMatchers(HttpMethod.POST, "/*/members").permitAll()
                    .antMatchers(HttpMethod.POST, "/*/auth/login").permitAll()
                    .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")
                    .antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
                    .antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN")
                    .antMatchers(HttpMethod.DELETE, "/*/members/**").hasRole("USER")
                    .antMatchers(HttpMethod.POST, "/*/question").hasRole("USER")
                    .antMatchers(HttpMethod.PATCH, "/*/question/**").hasRole("USER")
                    .antMatchers(HttpMethod.DELETE, "/*/question/**").hasRole("USER")
                    .antMatchers(HttpMethod.POST, "/*/comment").hasRole("USER")
                    .antMatchers(HttpMethod.PATCH, "/*/comment/**").hasRole("USER")
                    .antMatchers(HttpMethod.DELETE, "/*/comment/**").hasRole("USER")
                    .anyRequest().permitAll()
            );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public class CustomFilterConfigure extends AbstractHttpConfigurer<CustomFilterConfigure, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                .addFilter(jwtAuthenticationFilter)
                .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}

