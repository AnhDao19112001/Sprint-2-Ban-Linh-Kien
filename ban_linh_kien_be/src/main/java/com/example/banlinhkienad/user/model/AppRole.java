package com.example.banlinhkienad.user.model;
import javax.persistence.*;
import java.util.Set;

@Entity
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameRole;
    private Boolean flagDeleted;
    @OneToMany(mappedBy = "appRole")
    private Set<UserRole> userRoles;
    public AppRole() {
    }

    public AppRole(Long id, String nameRole, Boolean flagDeleted, Set<UserRole> userRoles) {
        this.id = id;
        this.nameRole = nameRole;
        this.flagDeleted = flagDeleted;
        this.userRoles = userRoles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameRole() {
        return nameRole;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

}
