package com.example.banlinhkienad.order.dto;

import java.util.List;

public class OderDetailDto {
    List<CartDetailDto> cartDetailDtoList;

    public OderDetailDto() {
    }

    public OderDetailDto(List<CartDetailDto> cartDetailDtoList) {
        this.cartDetailDtoList = cartDetailDtoList;
    }

    public List<CartDetailDto> getCartDetailDtoList() {
        return cartDetailDtoList;
    }

    public void setCartDetailDtoList(List<CartDetailDto> cartDetailDtoList) {
        this.cartDetailDtoList = cartDetailDtoList;
    }
}
