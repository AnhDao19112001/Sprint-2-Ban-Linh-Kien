package com.example.banlinhkienad.product.dto;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class ImageDto implements Validator {
    private Long id;
    private String imagePath;
    private Boolean flagDeleted;
    private Long product;

    public ImageDto() {
    }

    public ImageDto(Long id, String imagePath, Boolean flagDeleted, Long product) {
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

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}
