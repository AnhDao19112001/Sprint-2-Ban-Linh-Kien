package com.example.banlinhkienad.product.dto;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class TypeProductDto implements Validator {
    private Long idType;
    private String nameType;

    public TypeProductDto() {
    }

    public TypeProductDto(Long idType, String nameType) {
        this.idType = idType;
        this.nameType = nameType;
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

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}
