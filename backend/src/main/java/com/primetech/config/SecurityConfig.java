package com.primetech.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Inyectamos la configuración de CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // 2. Desactivamos CSRF solo de forma temporal para desarrollo (lo activaremos al meter cookies seguras)
                .csrf(csrf -> csrf.disable())
                // 3. Definimos que de momento, todas las peticiones son públicas para construir el MVP tranquilos
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                // 4. Configuración de sesiones tradicional para nuestras futuras cookies seguras
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                );

        return http.build();
    }

    // El corazón del CORS profesional
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Configuramos los orígenes permitidos.
        // En desarrollo permitimos localhost de React; al desplegar sumaremos la URL de Netlify
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173", // React con Vite por defecto
                "http://localhost:3000"  // React tradicional
        ));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        configuration.setExposedHeaders(List.of("Set-Cookie")); // Permitimos que el navegador lea las cookies de sesión
        configuration.setAllowCredentials(true); // ¡Clave Senior! Obligatorio para poder enviar y recibir cookies (HttpOnly)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica a todas las rutas de la API
        return source;
    }
}