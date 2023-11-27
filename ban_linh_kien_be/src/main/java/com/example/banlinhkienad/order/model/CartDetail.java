package com.example.banlinhkienad.order.model;

import com.example.banlinhkienad.product.model.Product;
import com.example.banlinhkienad.user.model.AppUser;

import javax.persistence.*;

@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "app_user_id",referencedColumnName = "id")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(name = "id_product", referencedColumnName = "idProduct")
    private Product product;

    public CartDetail() {
    }

    public CartDetail(Long id, AppUser appUser, Product product) {
        this.id = id;
        this.appUser = appUser;
        this.product = product;
    }

    public CartDetail(Long id, Integer quantity, AppUser appUser, Product product) {
        this.id = id;
        this.quantity = quantity;
        this.appUser = appUser;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
