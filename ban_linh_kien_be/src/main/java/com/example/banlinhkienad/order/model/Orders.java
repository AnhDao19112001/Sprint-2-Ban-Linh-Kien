package com.example.banlinhkienad.order.model;
import com.example.banlinhkienad.user.model.AppUser;

import javax.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String dateTime;
    private Boolean flagDeleted;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    public Orders() {
    }

    public Orders(Long id, String code, String dateTime, Boolean flagDeleted) {
        this.id = id;
        this.code = code;
        this.dateTime = dateTime;
        this.flagDeleted = flagDeleted;
    }

    public Orders(Long id, String code, String dateTime, Boolean flagDeleted, AppUser appUser) {
        this.id = id;
        this.code = code;
        this.dateTime = dateTime;
        this.flagDeleted = flagDeleted;
        this.appUser = appUser;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }
}
