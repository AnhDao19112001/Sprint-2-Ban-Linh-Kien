package com.example.banlinhkienad.order.dto;

public interface ICartDetailDto {
    Long getIdProduct();
    String getNameProduct();
    String getImagePath();
    Float getPrice();
    Integer getQuantity();
}
