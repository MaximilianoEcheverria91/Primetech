package com.primetech.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.primetech.dto.request.ProductRequest;
import com.primetech.dto.response.ProductResponse;
import com.primetech.exception.ResourceNotFoundException;
import com.primetech.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false) // Desactiva filtros de seguridad para aislar el test del controlador
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    private ProductResponse sampleResponse;
    private ProductRequest validRequest;

    @BeforeEach
    void setUp() {
        sampleResponse = new ProductResponse(
                1L, "RTX 4070", "12GB GDDR6X", new BigDecimal("850000.00"),
                10, true, new BigDecimal("790000.00"), 1, "NVIDIA", 1, "Placas de Video"
        );

        validRequest = new ProductRequest(
                "RTX 4070", "12GB GDDR6X", new BigDecimal("850000.00"),
                10, true, new BigDecimal("790000.00"), 1, 1
        );
    }


    @Test
    @DisplayName("GET /api/product - Debe retornar 200 OK y la lista de productos")
    void getAllProducts_ShouldReturnStatus200() throws Exception {

        when(productService.getAllProducts()).thenReturn(List.of(sampleResponse));

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("RTX 4070"))
                .andExpect(jsonPath("$[0].brandName").value("NVIDIA"));
    }


    @Test
    @DisplayName("GET /api/product/{id} - Debe retornar 200 OK y el producto cuando el ID existe")
    void getProductById_Success_ShouldReturnStatus200() throws Exception {
        when(productService.getProductById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/product/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("RTX 4070"));
    }

    @Test
    @DisplayName("GET /api/product{id} - Debe retornar 404 Not Found cuando el ID no existe")
    void getProductById_NotFound_ShouldReturnStatus404() throws Exception {
        when(productService.getProductById(99L))

                .thenThrow(new ResourceNotFoundException("Producto no econtrado en el ID: 99"));

        mockMvc.perform(get("/api/product/99"))
                .andExpect(status().isNotFound());
    }



    @Test
    @DisplayName("GET /api/product/offers - Debe retornar 200 OK y la lista de ofertas")
    void getOffers_ShouldReturnStatus200() throws  Exception {
        when(productService.getOffers()).thenReturn(List.of(sampleResponse));
        mockMvc.perform(get("/api/product/offers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].onSale").value(true));
    }


    @Test
    @DisplayName("GET /api/product/category/{categoryId} - Debe retornar 404 Not Found si la categoría no existe")
    void getProductByCategory_NotFound_ShouldReturnStatus404() throws Exception {
        when(productService.getProductByCategory(99))
                .thenThrow(new ResourceNotFoundException("La categoría especificada no existe."));
        mockMvc.perform(get("/api/product/category/99"))
                .andExpect(status().isNotFound());
    }


    @Test
    @DisplayName("GET /api/product/brand/{brandId} - Debe retornar 200 OK y lista de productos por marca")
    void getProductByBrand_Success_shouldReturnStatus200() throws Exception {
        when(productService.getProductByBrand(1)).thenReturn(List.of(sampleResponse));
        mockMvc.perform(get("/api/product/brand/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brandName").value("NVIDIA"));
    }



    @Test
    @DisplayName("GET /api/product/brand/{brandId} - Debe retornar 404 Not Found si la marca no existe")
    void  getProductByBrand_NotFound_ShouldReturnStatus404() throws Exception {
        when (productService.getProductByBrand(99))
                .thenThrow(new ResourceNotFoundException("La marca espesificada no existe"));
        mockMvc.perform(get("/api/product/brand/99"))
                .andExpect(status().isNotFound());

    }


    @Test
    @DisplayName("POST /api/product - Debe retornar 201 Created y el producto cuando la petición es válida")
    void createProduct_Success_ShouldReturnStatus201() throws Exception {
        when(productService.createProduct(any(ProductRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/product")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("RTX 4070"));
    }


    @Test
    @DisplayName("POST /api/product - Debe retornar 400 Bad Request si los datos requeridos fallan la validación")
    void createProduct_InvalidData_ShouldReturn400() throws Exception {
        ProductRequest invalidRequest = new ProductRequest(
                "", "Descripción", new BigDecimal("-100.00"),
                -5, false, null, null, null
        );

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/product/{productId}/images - Debe retornar 201 Created y la lista de URLs de imagenes")
    void uploadProductImages_Success_ShouldReturnStatus201() throws Exception {
        MockMultipartFile file1 = new MockMultipartFile(
                "files", "foto1.jpg", MediaType.IMAGE_JPEG_VALUE, "Contenido foto1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile(
                "files", "foto2.png", MediaType.IMAGE_JPEG_VALUE, "Contenido foto2".getBytes());

        List<String> listURL = List.of(
                "https://res.cloudinary.com/primetech/foto1.jpg",
                "https://res.cloudinary.com/primetech/foto2.jpg"
        );

        when(productService.addImagesToProduct(anyLong(), anyList(), anyInt())).thenReturn(listURL);

        mockMvc.perform(multipart("/api/product/1/images")
                    .file(file1)
                    .file(file2)
                    .param("primaryIndex", "0"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$[0]").value("https://res.cloudinary.com/primetech/foto1.jpg"))
                .andExpect(jsonPath("$[1]").value("https://res.cloudinary.com/primetech/foto2.jpg"));


    }

}