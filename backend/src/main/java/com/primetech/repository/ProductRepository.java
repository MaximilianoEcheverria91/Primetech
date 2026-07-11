package com.primetech.repository;

import com.primetech.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByOnSaleTrue();

    List<Product> findByCategoryId(Integer categoryId);

    List<Product> findByBrandId(Integer brandId);
}
