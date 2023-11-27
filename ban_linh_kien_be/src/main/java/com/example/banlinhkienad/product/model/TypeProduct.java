package com.example.banlinhkienad.product.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idType;
    private String nameType;

    @OneToMany(mappedBy = "typeProduct")
    @JsonBackReference
    private List<Product> products;

    public TypeProduct() {
    }

    public TypeProduct(Long idType, String nameType, List<Product> products) {
        this.idType = idType;
        this.nameType = nameType;
        this.products = products;
    }

    public Long getIdType() {
        return idType;
    }

    public void setIdType(Long idType) {
        this.idType = idType;
    }

    public String getNameType() {
        return nameType;
    }

    public void setNameType(String nameType) {
        this.nameType = nameType;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
