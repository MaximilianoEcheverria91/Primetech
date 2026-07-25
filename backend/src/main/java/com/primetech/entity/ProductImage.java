package com.primetech.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_images")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String url; // Ej: "https://res.cloudinary.com/primetech/rtx4070-1.jpg"

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary; // true si es la foto de portada para el catálogo

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
