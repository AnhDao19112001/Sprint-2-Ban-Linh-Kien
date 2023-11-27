package com.example.banlinhkienad.product.dto;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.List;

public class ProductDro implements Validator {
    private Long idProduct;
    private String nameProduct;
    private String codeProduct;
    private Float price;
    private String description;
    private Boolean flagDeleted;
    private ImageDto imageDto;
    private TypeProductDto typeProductDto;
    private List<String> imageDtoList;

    public ProductDro() {
    }

    public ProductDro(Long idProduct, String nameProduct, String codeProduct, Float price, String description, Boolean flagDeleted, ImageDto imageDto, TypeProductDto typeProductDto) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.codeProduct = codeProduct;
        this.price = price;
        this.description = description;
        this.flagDeleted = flagDeleted;
        this.imageDto = imageDto;
        this.typeProductDto = typeProductDto;
    }

    public ProductDro(Long idProduct, String nameProduct, String codeProduct, Float price, String description, Boolean flagDeleted, ImageDto imageDto, TypeProductDto typeProductDto, List<String> imageDtoList) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.codeProduct = codeProduct;
        this.price = price;
        this.description = description;
        this.flagDeleted = flagDeleted;
        this.imageDto = imageDto;
        this.typeProductDto = typeProductDto;
        this.imageDtoList = imageDtoList;
    }

    public List<String> getImageDtoList() {
        return imageDtoList;
    }

    public void setImageDtoList(List<String> imageDtoList) {
        this.imageDtoList = imageDtoList;
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

    public String getCodeProduct() {
        return codeProduct;
    }

    public void setCodeProduct(String codeProduct) {
        this.codeProduct = codeProduct;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public ImageDto getImageDto() {
        return imageDto;
    }

    public void setImageDto(ImageDto imageDto) {
        this.imageDto = imageDto;
    }

    public TypeProductDto getTypeProductDto() {
        return typeProductDto;
    }

    public void setTypeProductDto(TypeProductDto typeProductDto) {
        this.typeProductDto = typeProductDto;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductDro productDro = (ProductDro) target;
        if (productDro.getNameProduct() == null){
            errors.rejectValue("nameProduct","","Không để trống tên sản phẩm!");
        } else if (productDro.getNameProduct().trim().equals("")) {
            errors.rejectValue("nameProduct","","Vui lòng bổ sung thông tin!");
        } else if (productDro.getNameProduct().length() < 3) {
            errors.rejectValue("nameProduct","","Tên sản phẩm dài hơn 3 ký tự!");
        } else if (productDro.getNameProduct().length() > 100) {
            errors.rejectValue("nameProduct","","Tên sản phẩm ít hơn 100 ký tự!");
        } else if (!productDro.getNameProduct().matches("^[a-zA-ZÀ-Úà-úĂăĐđĨĩƠơƯưẠ-ỹ0-9 .,+]*$")) {
            errors.rejectValue("nameProduct","","Tên sản phẩm không chứa ký tự đặc biệt!");
        }
        if (productDro.getDescription().length() > 1000000){
            errors.rejectValue("description","","Mô tả vượt quá 1.000.000 ký tự!");
        }
        if (productDro.getPrice() == null){
            errors.rejectValue("price","","Không để trống giá sản phẩm!");
        } else if (productDro.getPrice() != null && productDro.getPrice() < 0) {
            errors.rejectValue("price","","Giá không được âm!");
        } else if (productDro.getPrice() != null && productDro.getPrice() > 10000000) {
            errors.rejectValue("price","","Giá sản phẩm ít hơn 10.000.000vnđ");
        } else if (String.valueOf(productDro.getPrice()).matches("^\\d{1,7}$")){
            errors.rejectValue("price","","Không được nhập chữ!");
        }
    }
}
