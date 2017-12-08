package com.service;


import com.entity.User;

import java.util.List;

import com.repository.userDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WebManageService {
	@Autowired
	public  userDao userdao;

	//用户管理
	
	
	public List<User> findAllUsers(){
		return userdao.findAll();
	}
	
	public User findUserByUserId(Long id){
      return userdao.findOne(id);
	}
	@Transactional
	public void updateUser(User user){
	   userdao.save(user);

	}
	
	public void deleteUserByUserId(Long id){
		userdao.delete(id);
	}

}
