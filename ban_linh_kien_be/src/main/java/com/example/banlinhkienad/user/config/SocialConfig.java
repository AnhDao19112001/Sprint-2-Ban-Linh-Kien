package com.example.retro_care.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.social.connect.ConnectionFactory;
import org.springframework.social.connect.support.ConnectionFactoryRegistry;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;

@Configuration
public class SocialConfig {

    @Bean
    public ConnectionFactoryRegistry connectionFactoryRegistry() {
        ConnectionFactoryRegistry registry = new ConnectionFactoryRegistry();
        registry.addConnectionFactory(facebookConnectionFactory());
        return registry;
    }

    @Bean
    public ConnectionFactory<?> facebookConnectionFactory() {
        return new FacebookConnectionFactory(
                "<your-app-id>",
                "<your-app-secret>"
        );
    }
}

