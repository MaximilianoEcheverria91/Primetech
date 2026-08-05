package com.primetech.controller;

import com.primetech.dto.request.ProductRequest;
import com.primetech.dto.response.ProductResponse;
import com.primetech.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Productos", description = "Controlador para la gestión del catálogo de hardware de PrimeTech")
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "Listar todos los productos", description = "Obtiene una lista completa de todos los componentes de hardware activos en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de productos recuperada con éxito")
    })
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        log.info("Petición HTTP recibida: GET /api/product");
        List<ProductResponse> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "Obtener un producto por ID", description = "Busca un componente de hardware específico por su ID único")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Producto encontrado con éxito"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado en la base de datos", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        log.info("Petición HTTP recibida: GET /api/product/{}", id);
        ProductResponse product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Listar productos en oferta", description = "Obtiene la lista de todos los productos que tienen el flag de oferta activo")
    @GetMapping("/offers")
    public ResponseEntity<List<ProductResponse>> getOffers() {
        log.info("Petición HTTP recibida: GET /api/product/offers");
        List<ProductResponse> offers = productService.getOffers();
        return ResponseEntity.ok(offers);
    }

    @Operation(summary = "Filtrar productos por categoría", description = "Recupera todos los componentes pertenecientes a una categoría específica (ej: Placas de Video)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de productos filtrada con éxito"),
            @ApiResponse(responseCode = "404", description = "La categoría indicada no existe", content = @Content)
    })
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductByCategory(@PathVariable Integer categoryId) {
        log.info("Petición HTTP recibida: GET /api/product/category/{}", categoryId);
        List<ProductResponse> product = productService.getProductByCategory(categoryId);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Filtrar productos por marca\", description = \"Recupera todos los componentes pertenecientes a una marca específica (ej: Intel)")
    @ApiResponses(value= {
            @ApiResponse(responseCode = "200", description = "Lista de productos filtrada con éxito"),
            @ApiResponse(responseCode = "404", description = "La marca indicada no existe", content = @Content)
    })
    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<ProductResponse>> getProductByBrand(@PathVariable Integer brandId) {
        log.info("Petición HTTP recibida: GET /api/product/brand/{}", brandId);
        List<ProductResponse> product = productService.getProductByBrand(brandId);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Subir imágenes a un producto", description = "Sube una o varias imágenes a Cloudinary y las asocia a un producto existente")
    @PostMapping(value = "/{productId}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<String>> uploadProductImages(
            @PathVariable Long productId,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam(value = "primaryIndex", defaultValue = "0") int primaryIndex) {

        log.info("Petición recibida para subir {} imágenes al producto ID: {}", files.size(), productId);
        List<String> imageUrls = productService.addImagesToProduct(productId, files, primaryIndex);
        return ResponseEntity.status(HttpStatus.CREATED).body(imageUrls);
    }

    @Operation(summary = "Crear un nuevo producto", description = "Permite al administrador dar de alta un nuevo componente de hardware. Requiere datos válidos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Producto creado con éxito",
                    content = @Content(schema = @Schema(implementation = ProductResponse.class))),
            @ApiResponse(responseCode = "400", description = "Datos de petición inválidos (Validación fallida)", content = @Content)
    })
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        log.info("Petición HTTP recibida: POST /api/product para crear el producto: {}", request.name());
        ProductResponse product = productService.createProduct(request);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }
}
