package com.primetech.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Map;

@Schema(description = "Estructura universal de errores de la API")
public record ErrorResponse(

        @Schema(description = "Código de estado HTTP", example = "404")
        int status,

        @Schema(description = "Nombre del error", example = "Not Found")
        String error,

        @Schema(description = "Mensaje amigable de qué pasó", example = "El código de verificación ha expirado")
        String message,

        @Schema(description = "Cuando ocurrió el error", example = "2026-04-11T10:15:30Z")
        LocalDateTime timestamp,

        @Schema(description = "Para capturar los errores de los DTOs", example = "El precio debe ser mayor a cero" )
        Map<String, String> validations
) {

    public ErrorResponse (int status, String error, String message){
        this(status,error,message,LocalDateTime.now(), null);
    }
}
