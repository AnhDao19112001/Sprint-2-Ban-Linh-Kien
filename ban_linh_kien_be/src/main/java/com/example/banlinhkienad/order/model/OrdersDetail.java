package com.example.banlinhkienad.order.model;
import com.example.banlinhkienad.product.model.Product;

import javax.persistence.*;

@Entity
public class OrdersDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    private Float price;
    private Boolean flagDeleted;
    @ManyToOne
    @JoinColumn(name = "id_order", referencedColumnName = "id")
    private Orders orders;
    @ManyToOne
    @JoinColumn(name = "id_product",referencedColumnName = "idProduct")
    private Product product;

    public OrdersDetail() {
    }

    public OrdersDetail(Long id, Integer quantity, Float price, Boolean flagDeleted, Orders orders, Product product) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.flagDeleted = flagDeleted;
        this.orders = orders;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
