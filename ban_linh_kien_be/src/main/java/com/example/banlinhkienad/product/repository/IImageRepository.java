package com.example.banlinhkienad.product.repository;

import com.example.banlinhkienad.product.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IImageRepository extends JpaRepository<Image, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO image(name_path,flag_deleted,id_product) " +
            "VALUES ( :namePath, false, :idProduct)",nativeQuery = true)
    void insertImageProduct(@Param("namePath") String namePath,
                            @Param("idProduct") Long idProduct);
    @Transactional
    @Modifying
    @Query(value = "CALL update_img(:image , :idProduct)",nativeQuery = true)
    void updateImageProduct(@Param("image") String image,
                            @Param("idProduct") Long idProduct);

    @Transactional
    @Modifying
    @Query(value = "UPDATE image set flag_deleted = true where image.id_product = :id",nativeQuery = true)
    void deleteImageProduct(Long id);

    @Query(value = "SELECT i.id, i.image_path, i.flag_deleted, i.id_product " +
            "FROM image as i WHERE id_product = :idProduct AND i.flag_deleted =false",nativeQuery = true)
    List<Image> findImageByIdProduct(@Param("idProduct") Long idProduct);
}
