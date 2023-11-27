package com.example.banlinhkienad.product.model;

import javax.persistence.*;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String imagePath;
    private Boolean flagDeleted;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    public Image() {
    }

    public Image(Long id, String imagePath, Boolean flagDeleted, Product product) {
        this.id = id;
        this.imagePath = imagePath;
        this.flagDeleted = flagDeleted;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
