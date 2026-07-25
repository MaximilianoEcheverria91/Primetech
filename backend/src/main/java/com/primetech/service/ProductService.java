package com.primetech.service;

import com.primetech.dto.request.ProductRequest;
import com.primetech.dto.response.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    List<ProductResponse> getOffers();

    List<ProductResponse> getProductByCategory(Integer categoryId);

    ProductResponse createProduct(ProductRequest request);

    List<String> addImagesToProduct(Long productId, List<MultipartFile> files, int primaryIndex);
}