/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

package com.tiffinbox.backend.configurations;

import com.tiffinbox.backend.utils.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http.csrf(AbstractHttpConfigurer::disable)
               .cors(cors -> cors.configurationSource(corsConfigurationSource()))
               .authorizeHttpRequests(request -> request
                       .requestMatchers("/api/auth/**").permitAll()
                       .requestMatchers("/api/admin/**").hasAnyAuthority(UserRole.ADMIN.name())
                       .requestMatchers("/api/home/**").permitAll()
                       .requestMatchers("/api/meal/**").permitAll()
                       .requestMatchers("/api/orders/**").authenticated()
                       .requestMatchers("/api/foodserviceprovider/**").authenticated()
                       .requestMatchers("/api/ordertrack/**").authenticated()
                       .requestMatchers("/api/subscription/**").authenticated()
                       .anyRequest().authenticated()
               ).sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authenticationProvider(authenticationProvider)
               .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("https://main--tiffinbox-csci5709.netlify.app");
        config.addAllowedOrigin("https://tiffinbox-csci5709.netlify.app");
//        config.addAllowedHeader(HttpHeaders.CONTENT_TYPE);
//        config.addAllowedHeader(HttpHeaders.AUTHORIZATION);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
