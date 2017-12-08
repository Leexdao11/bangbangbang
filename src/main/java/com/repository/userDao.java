package com.repository;

import com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


/**
 * Created with IntelliJ IDEA. Description: User: luqing Date: 2017/10/20
 */
public interface userDao extends JpaRepository<User,Long>{
//  @Query("select u from User u where u.id=?1")
//    User findUserById(Long id);
//  @Query("delete from User u where u.id=?1")
 // @Modifying
 //@Transactional
 // void deleteUserById(Long id);
  List<User> findAll();
}
