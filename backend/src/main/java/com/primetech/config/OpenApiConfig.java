package com.primetech.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "PrimeTech API - E-Commerce de Hardware & PC Custom",
                description = "Documentación técnica de los servicios RESTful para el catálogo de productos, gestión de marcas, ofertas y módulo armador de PCs de PrimeTech.",
                version = "1.0.0",
                contact = @Contact(
                        name = "Soporte Técnico PrimeTech",
                        email = "soporte@primetech.com",
                        url = "https://primetech.com"
                ),
                license = @License(
                        name = "Licencia Privada PrimeTech Hardware",
                        url = "https://primetech.com/licencia"
                )
        ),
        servers = {
                @Server(description = "Entorno Local de Desarrollo", url = "http://localhost:8080"),
                @Server(description = "Servidor de Producción (Render)", url = "https://primetech-backend.onrender.com")
        },
        security = {
                @SecurityRequirement(name = "cookieAuth")
        }
)
@SecurityScheme(
        name = "cookieAuth",
        description = "Autenticación basada en sesiones y cookies seguras (HttpOnly)",
        type = SecuritySchemeType.APIKEY,
        in = SecuritySchemeIn.COOKIE,
        paramName = "JSESSIONID"
)
public class OpenApiConfig {
}