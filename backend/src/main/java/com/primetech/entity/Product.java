package com.primetech.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 250)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "on_saale")
    private Boolean onSale;

    @Column(name = "price_sale")
    private BigDecimal priceSale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_fk")
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_fk")
    private Category category;

    @Version
    private Integer version;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", updatable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at", updatable = false)
    private LocalDateTime deletedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.onSale = this.onSale != null ? this.onSale : false;
        this.priceSale = this.priceSale != null ? this.priceSale : BigDecimal.ZERO;
        this.version = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
