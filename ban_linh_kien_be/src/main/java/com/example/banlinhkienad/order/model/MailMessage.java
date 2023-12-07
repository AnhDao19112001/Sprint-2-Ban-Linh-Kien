package com.example.banlinhkienad.order.model;

import com.example.banlinhkienad.user.model.AppUser;

import java.util.List;

public class MailMessage {
    private String to;
    private String subject;
    private String message;
    private Float totalPrice;
    private List<MailProjection> mailProjections;
    private AppUser appUser;
    private String orderCode;
    private boolean isVNP;

    public MailMessage() {
    }

    public MailMessage(String to, String subject, String message, Float totalPrice, List<MailProjection> mailProjections, AppUser appUser, String orderCode, boolean isVNP) {
        this.to = to;
        this.subject = subject;
        this.message = message;
        this.totalPrice = totalPrice;
        this.mailProjections = mailProjections;
        this.appUser = appUser;
        this.orderCode = orderCode;
        this.isVNP = isVNP;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<MailProjection> getMailProjections() {
        return mailProjections;
    }

    public void setMailProjections(List<MailProjection> mailProjections) {
        this.mailProjections = mailProjections;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public boolean isVNP() {
        return isVNP;
    }

    public void setVNP(boolean VNP) {
        isVNP = VNP;
    }
}
