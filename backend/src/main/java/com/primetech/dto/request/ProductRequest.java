package com.primetech.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import org.hibernate.Internal;
import org.hibernate.annotations.Check;

import java.math.BigDecimal;

@Schema(description = "Creación de productos")
public record ProductRequest(

        @Schema(description = "Nombre del producto", example = "Samsung Odyssey G4")
        @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
        @NotBlank(message = "El nombre del producto no puede estar vacio")
        String name,

        @Schema(description = "Descripción del producto",example = "El Samsung Odyssey G4 de 25 pulgadas es un monitor de alto rendimiento")
        @Size(max = 250, message = "La descripción no puede superar los 250 caracteres")
        String description,

        @Schema(description = "Precio del producto", example = "125.53")
        @NotNull(message = "El precio es obligatorio")
        @Positive(message = "El precio deber ser positivo")
        BigDecimal price,

        @Schema(description = "Cantidad del stock disponible del producto", example = "257")
        @NotNull(message = "El stock es obligatorio")
        @Min(value = 0, message = "El stock no puede ser negativo")
        Integer stock,

        @Schema(description = "Si el producto es una oferta", example = "true")
        Boolean onSale,

        @Schema(description = "Precio del producto en oferta", example = "15.05")
        BigDecimal priceSale,

        @Schema(description = "ID de la marca del producto", example = "15")
        @NotNull(message = "La marca es obligatoria")
        Integer brandId,

        @Schema(description = "ID de la categoria del producto", example = "8")
        @NotNull(message = "La categoria es obligatoria")
        Integer categoryId

) {}

