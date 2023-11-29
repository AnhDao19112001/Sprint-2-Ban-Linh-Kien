package com.example.banlinhkienad.product.repository;
import com.example.banlinhkienad.product.model.TypeProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITypeProductRepository extends JpaRepository<TypeProduct, Long> {
    @Query(value = "SELECT t.id_type, t.name_type FROM ban_linh_kien.type_product as t",nativeQuery = true)
    List<TypeProduct> findAllType();
}
