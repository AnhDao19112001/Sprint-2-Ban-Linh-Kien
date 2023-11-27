package com.example.banlinhkienad.order.dto;

public interface IOrderProjection {
    Long getIdOrder();
    Long getId();
    String getCode();
    String getFullName();
    String getOrderDetailPrice();
    String getOrderDate();
}
