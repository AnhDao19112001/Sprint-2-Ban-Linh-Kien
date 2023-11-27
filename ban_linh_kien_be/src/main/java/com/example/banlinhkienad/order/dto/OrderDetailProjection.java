package com.example.banlinhkienad.order.dto;

public interface OrderDetailProjection {
    String getNameProduct();
    String getImageProduct();
    String getQuantityInCart();
    Float getPrice();
}
