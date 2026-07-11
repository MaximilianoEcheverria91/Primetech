package com.primetech.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Brands")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_brand")
    private Integer id;

    @Column(nullable = false, length = 50)
    private String name;

    @Version
    private Integer version;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "deleted_at")
    private  LocalDateTime deletedAt;

    @PrePersist
    protected  void onCreate(){
        createdAt = LocalDateTime.now();
        updateAt = LocalDateTime.now();
        version = 0;
    }

    @PreUpdate
    protected  void onUpdate(){
        updateAt = LocalDateTime.now();
    }
}
