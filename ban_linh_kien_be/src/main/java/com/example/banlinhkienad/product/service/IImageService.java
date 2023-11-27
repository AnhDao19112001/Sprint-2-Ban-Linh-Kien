package com.example.banlinhkienad.product.service;

import com.example.banlinhkienad.product.model.Image;

import java.util.List;

public interface IImageService {
    List<Image> findImageProductByIdProduct(Long idProduct);
    void updateImageProduct(String image, Long idProduct);
    void deleteImg(Long id);
    void insertImageByProductId(List<String> imageDtoList, Long idProduct);
}
