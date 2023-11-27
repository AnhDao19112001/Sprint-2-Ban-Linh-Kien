package com.example.banlinhkienad.order.dto;

public interface ProductProjection {
    Long getIdProduct();
    String getNameProduct();
    Float getPrice();
    String getDescription();
    String getCodeProduct();
    String getImagePath();
    Integer getQuantity();
    String getNameType();
}
