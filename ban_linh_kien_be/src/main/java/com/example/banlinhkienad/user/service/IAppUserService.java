package com.example.banlinhkienad.user.service;
import com.example.banlinhkienad.user.model.AppUser;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IAppUserService extends UserDetailsService {
    Boolean existsByUsername(String userName);
    void createNewAppUser(AppUser appUser, String role);
    Boolean logout(String userName);
    AppUser findAppUserIdByUserName(String userName);
    void updateCustomer(AppUser appUser);
    AppUser findByIdCustomer(Long id);
    void saveCustomerForAppUser(Long id);
    List<AppUser> getAllUser();
}
