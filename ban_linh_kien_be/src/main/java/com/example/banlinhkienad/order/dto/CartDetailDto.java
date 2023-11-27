package com.example.banlinhkienad.order.dto;

public class CartDetailDto {
    private Long idProduct;
    private String nameProduct;
    private Float price;
    private String imagePath;
    private Integer quantity;

    public CartDetailDto() {
    }

    public CartDetailDto(Long idProduct, String nameProduct, Float price, String imagePath, Integer quantity) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.price = price;
        this.imagePath = imagePath;
        this.quantity = quantity;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
