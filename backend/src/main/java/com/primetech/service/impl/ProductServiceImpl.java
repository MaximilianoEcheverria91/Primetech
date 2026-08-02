package com.primetech.service.impl;

import com.primetech.dto.mapper.ProductMapper;
import com.primetech.dto.request.ProductRequest;
import com.primetech.dto.response.ProductResponse;
import com.primetech.entity.Brand;
import com.primetech.entity.Category;
import com.primetech.entity.Product;
import com.primetech.entity.ProductImage;
import com.primetech.exception.ResourceNotFoundException;
import com.primetech.repository.BrandRepository;
import com.primetech.repository.CategoryRepository;
import com.primetech.repository.ProductRepository;
import com.primetech.service.CloudinaryService;
import com.primetech.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public List<ProductResponse> getAllProducts() {
        log.info("Obteniendo el listado completo de productos");
        return  productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        return null;
    }

    @Override
    public List<ProductResponse> getOffers() {
        return List.of();
    }

    @Override
    public List<ProductResponse> getProductByCategory(Integer categoryId) {
        return List.of();
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {

        log.info("Iniciando la creación del producto: {}", request.name());
        log.debug("Buscando dependencias para el producto. BrandID: {}, CategoryID: {}", request.brandId(), request.categoryId());

        Brand brand = brandRepository.findById(request.brandId())
                .orElseThrow(() -> {
                    log.error("Error al crear producto: La marca con ID {} no existe", request.brandId());
                    return new ResourceNotFoundException("Marca especificada no existe.");
                });


        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> {
                    log.error("Error al crear producto: La categoria con ID {} no existe", request.categoryId());
                    return new ResourceNotFoundException("La categoría especificada no existe.");
                });

        Product product = productMapper.toEntity(request);
        product.setBrand(brand);
        product.setCategory(category);

        Product saveProduct = productRepository.save(product);

        log.info("Producto creado exitosamente con ID asignado: {}", saveProduct.getId());

        return productMapper.toResponse(saveProduct);
    }

    @Transactional
    public List<String> addImagesToProduct(Long productId, List<MultipartFile> files, int primaryIndex) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con el ID: " + productId));

        List<String> uploadedUrls = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);

            // 1. Subir a Cloudinary
            String imageUrl = cloudinaryService.uploadFile(file, "products");
            uploadedUrls.add(imageUrl);

            // 2. Crear la entidad ProductImage
            boolean isPrimary = (i == primaryIndex);
            ProductImage productImage = ProductImage.builder()
                    .url(imageUrl)
                    .isPrimary(isPrimary)
                    .product(product)
                    .build();

            product.getImages().add(productImage);
        }

        productRepository.save(product);
        return uploadedUrls;
    }
}

