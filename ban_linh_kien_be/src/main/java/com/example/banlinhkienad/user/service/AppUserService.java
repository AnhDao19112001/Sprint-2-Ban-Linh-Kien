package com.example.banlinhkienad.user.service;
import com.example.banlinhkienad.user.dto.JwtResponseUserDetail;
import com.example.banlinhkienad.user.model.AppUser;
import com.example.banlinhkienad.user.model.UserRole;
import com.example.banlinhkienad.user.repository.IAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppUserService implements IAppUserService {
    @Autowired
    private IAppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findAppUserByName(username);
        if (appUser == null) {
            throw new UsernameNotFoundException("User name or password is wrong");
        }

        List<GrantedAuthority> grantList = new ArrayList<>();
        for (UserRole userRole : appUser.getUserRoles()) {
            grantList.add(new SimpleGrantedAuthority(userRole.getAppRole().getNameRole()));
        }
        UserDetails userDetails = new JwtResponseUserDetail(
                appUser.getUserName(),
                appUser.getPassword(),
                appUser.getFlagOnline(),
                grantList);
        appUserRepository.updateAppUserIsOnline(appUser);
        return userDetails;
    }

    @Override
    public Boolean existsByUsername(String userName) {
        AppUser appUser = appUserRepository.findAppUserByName(userName);
        return appUser != null;
    }

    @Override
    public void createNewAppUser(AppUser appUser, String role) {
        appUserRepository.findAppRoleIdByNameUser(appUser.getPassword()
                ,appUser.getUserName()
                ,2L
                ,appUser.getAddress()
                ,appUser.getEmail()
                ,appUser.getFullName()
                ,appUser.getImage()
                ,appUser.getPhone());
    }

    @Override
    public Boolean logout(String userName) {
        return appUserRepository.updateAppUserIsOffline(userName) > 0;
    }

    @Override
    public AppUser findAppUserIdByUserName(String userName) {
        return appUserRepository.findIdByUserName(userName);
    }

    @Override
    public void updateCustomer(AppUser appUser) {
        appUserRepository.updateCustomer(appUser.getFullName(),
                appUser.getEmail(), appUser.getAddress(),
                appUser.getPhone(), appUser.getId());
    }

    @Override
    public AppUser findByIdCustomer(Long id) {
        return appUserRepository.findCustomerById(id);
    }
}
