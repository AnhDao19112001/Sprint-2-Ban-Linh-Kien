package com.example.banlinhkienad.user.repository;
import com.example.banlinhkienad.user.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IAppUserRepository extends JpaRepository<AppUser, Long> {
    @Transactional
    @Query(value = "SELECT * FROM ban_linh_kien.app_user WHERE " +
            "user_name = :userName and flag_deleted = false",nativeQuery = true)
    AppUser findAppUserByName(@Param("userName") String userName);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO app_user(full_name, email, user_name, `password`," +
            "            address,phone,image,flag_deleted,flag_online)" +
            "            VALUES ( :fullName, :email," +
            "            :userName, :password, :address," +
            "            :phone, :image,0,0)",nativeQuery = true)
    void createNewAppUser(@Param("fullName") String fullName, @Param("email") String email, @Param("userName") String userName,
                          @Param("password") String password, @Param("address") String address, @Param("phone") String phone,
                          @Param("image") String image);

    @Modifying
    @Transactional
    @Query(value = "UPDATE app_user set flag_online = 1 WHERE id = :#{#appUser.id}",nativeQuery = true)
    Integer updateAppUserIsOnline (AppUser appUser);

    @Modifying
    @Transactional
    @Query(value = "UPDATE app_user set flag_online = 0 WHERE user_name = :userName",nativeQuery = true)
    Integer updateAppUserIsOffline (@Param("userName") String userName);

    @Query(value = "SELECT au.* from ban_linh_kien.app_user au WHERE au.user_name = :userName",nativeQuery = true)
    AppUser findIdByUserName(@Param("userName") String userName);

    @Modifying
    @Transactional
    @Query(value =  " CALL insert_acc_users ( :password, :userName, :roleId, :address, :email, :fullName, " +
            ":image, :phone,0,0)" ,nativeQuery = true)
    void findAppRoleIdByNameUser(@Param("password") String password, @Param("userName") String userName,
                             @Param("roleId") Long roleId, @Param("address") String address,
                                 @Param("email") String email, @Param("fullName") String fullName,
                                 @Param("image") String image, @Param("phone") String phone);

    @Transactional
    @Modifying
    @Query(value = "UPDATE ban_linh_kien.app_user " +
            "SET full_name = :fullName, email = :email, " +
            " address = :address, phone = :phone " +
            "WHERE id =:id and flag_deleted = false",nativeQuery = true)
    void updateCustomer(@Param("fullName") String fullName,
                        @Param("email") String email,
                        @Param("address") String address,
                        @Param("phone") String phone,
                        @Param("id") Long id);

    @Query(value = "SELECT * FROM app_user where id = :id AND flag_deleted = false",nativeQuery = true)
    AppUser findCustomerById(@Param("id") Long id);

    @Query(value = "SELECT * FROM app_user WHERE flag_deleted = false",nativeQuery = true)
    List<AppUser> getAllUser();
}
