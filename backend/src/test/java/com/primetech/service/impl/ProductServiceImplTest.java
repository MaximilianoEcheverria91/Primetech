package com.primetech.service.impl;

import com.primetech.dto.mapper.ProductMapper;
import com.primetech.dto.request.ProductRequest;
import com.primetech.dto.response.ProductResponse;
import com.primetech.entity.Brand;
import com.primetech.entity.Category;
import com.primetech.entity.Product;
import com.primetech.exception.ResourceNotFoundException;
import com.primetech.repository.BrandRepository;
import com.primetech.repository.CategoryRepository;
import com.primetech.repository.ProductRepository;
import com.primetech.service.CloudinaryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    @Mock
    private ProductRequest sampleRequest;

    @Mock
    private Brand sampleBrand;

    @Mock
    private Category sampleCategory;

    @Mock
    private Product sampleProduct;

    @Mock
    private ProductResponse sampleResponse;

    @Mock
    private CloudinaryService cloudinaryService;

    @BeforeEach
    void setUp() {
        sampleRequest = new ProductRequest(
                "RTX 4070", "12GB GDDR6X", new BigDecimal("850000.00"),
                10, true, new BigDecimal("790000.00"), 1, 1
        );

        sampleBrand = new Brand();
        sampleBrand.setId(1);
        sampleBrand.setName("NVIDIA");

        sampleCategory = new Category();
        sampleCategory.setId(1);
        sampleCategory.setName("Placas de Video");

        sampleProduct = new Product();
        sampleProduct.setId(1L);
        sampleProduct.setName("RTX 4070");

        sampleResponse = new ProductResponse(
                1L, "RTX 4070", "12GB GDDR6X", new BigDecimal("850000.00"),
                10, true, new BigDecimal("790000.00"), 1, "NVIDIA", 1, "Placas de Video"
        );
    }

    @Test
    @DisplayName("Debe crear un producto con éxito cuando la Marca y Categoría existen")
    void createProduct_Success() {
        // Arrange (Simular respuestas de los repositorios y mapper)
        when(brandRepository.findById(1)).thenReturn(Optional.of(sampleBrand));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(sampleCategory));
        when(productMapper.toEntity(sampleRequest)).thenReturn(sampleProduct);
        when(productRepository.save(any(Product.class))).thenReturn(sampleProduct);
        when(productMapper.toResponse(sampleProduct)).thenReturn(sampleResponse);

        // Act (Ejecutar el método a probar)
        ProductResponse result = productService.createProduct(sampleRequest);

        // Assert (Verificar que el resultado sea el esperado)
        assertNotNull(result);
        assertEquals("RTX 4070", result.name());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Debe lanzar ResourceNotFoundException si la Marca no existe")
    void createProduct_BrandNotFound_ThrowsException() {
        // Arrange
        when(brandRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> productService.createProduct(sampleRequest)
        );
        assertTrue(exception.getMessage().contains("Marca especificada no existe."));
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    @DisplayName("addImagesToProduct - Debe subir imágenes a Cloudinary y asociarlas al producto en la BD")
    void addImagesToProduct_Success() {
        // Arrange
        Long productId = 1L;
        MockMultipartFile file1 = new MockMultipartFile("files", "foto1.jpg", "image/jpeg", "data1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "foto2.jpg", "image/jpeg", "data2".getBytes());
        List<MultipartFile> files = List.of(file1, file2);

        Product product = new Product();
        product.setId(productId);
        product.setImages(new ArrayList<>());

        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(cloudinaryService.uploadFile(file1, "products")).thenReturn("https://cloudinary.com/foto1.jpg");
        when(cloudinaryService.uploadFile(file2, "products")).thenReturn("https://cloudinary.com/foto2.jpg");
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Act
        List<String> resultUrls = productService.addImagesToProduct(productId, files, 0);

        // Assert
        assertNotNull(resultUrls);
        assertEquals(2, resultUrls.size());
        assertEquals("https://cloudinary.com/foto1.jpg", resultUrls.get(0));
        assertEquals(2, product.getImages().size());
        assertTrue(product.getImages().get(0).getIsPrimary());  // La foto 0 es la principal
        assertFalse(product.getImages().get(1).getIsPrimary()); // La foto 1 NO es la principal

        verify(productRepository, times(1)).save(product);
    }

    @Test
    @DisplayName("getAllProducts - Debe retornar la lista completa de productos mapeados a DTO")
    void getAllProducts_ShouldReturnListOfProducts() {
        // Arrange
        when(productRepository.findAll()).thenReturn(List.of(sampleProduct));
        when(productMapper.toResponse(sampleProduct)).thenReturn(sampleResponse);

        // Act
        List<ProductResponse> result = productService.getAllProducts();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("RTX 4070", result.get(0).name());
        verify(productRepository, times(1)).findAll();
    }


}