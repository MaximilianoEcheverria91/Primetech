package com.primetech.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.primetech.dto.request.ProductRequest;
import com.primetech.dto.response.ProductResponse;
import com.primetech.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

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

    @Test
    @DisplayName("GET /api/product - Debe retornar 200 OK y la lista de productos")
    void getAllProducts_ShouldReturnStatus200() throws Exception {
        ProductResponse response = new ProductResponse(
                1L, "RTX 4070", "12GB", new BigDecimal("850000.00"),
                10, true, new BigDecimal("790000.00"), 1, "NVIDIA", 1, "Placas de Video"
        );

        when(productService.getAllProducts()).thenReturn(List.of(response));

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("RTX 4070"))
                .andExpect(jsonPath("$[0].brandName").value("NVIDIA"));
    }

    @Test
    @DisplayName("POST /api/product - Debe retornar 400 Bad Request si los datos requeridos fallan la validación")
    void createProduct_InvalidData_ShouldReturn400() throws Exception {
        // Request inválido con nombre en blanco y precio negativo
        ProductRequest invalidRequest = new ProductRequest(
                "", "Descripción", new BigDecimal("-100.00"),
                -5, false, null, null, null
        );

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }
}