package com.example.banlinhkienad.order.dto;

import java.util.List;

public class OrderDto {
    List<ICartDetailDto> cartDetailDtoList;

    public OrderDto() {
    }

    public OrderDto(List<ICartDetailDto> cartDetailDtoList) {
        this.cartDetailDtoList = cartDetailDtoList;
    }

    public List<ICartDetailDto> getCartDetailDtoList() {
        return cartDetailDtoList;
    }

    public void setCartDetailDtoList(List<ICartDetailDto> cartDetailDtoList) {
        this.cartDetailDtoList = cartDetailDtoList;
    }
}
