package com.primetech.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.List;

@Schema(description = "Respuesta del producto")
public record ProductResponse(

      @Schema(description = "ID del producto", example = "12")
      Long id,

      @Schema(description = "Nombre del producto", example = "Samsung Odyssey G4")
      String name,

      @Schema(description = "Descripción del producto", example = "El Samsung Odyssey G4 de 25 pulgadas es un monitor de alto rendimiento")
      String description,

      @Schema(description = "Precio del producto", example = "250.00")
      BigDecimal price,

      @Schema(description = "Cantidad del producto en stock", example = "12")
      Integer stock,

      @Schema(description = "Si el producto esta en oferta o no", example = "true")
      Boolean onSale,

      @Schema(description = "Precio del producto en oferta", example = "10.00")
      BigDecimal priceSale,

      @Schema(description = "ID de la marca del producto", example = "456")
      Integer brandId,

      @Schema(description = "Nombre de la marca del producto", example = "Samsung")
      String brandName,

      @Schema(description = "ID de la categoria del producto", example = "17")
      Integer categoryId,

      @Schema(description = "Nombre de la categoría", example = "Monitor")
      String categoryName,

      @Schema(description = "Lista de las imagenes del producto", example = "https://res.cloudinary.com/dxetioest/image/upload/v1785898228/primetech/products/file_y7imyz.png")
      List<ProductImageResponse> images
) {}
