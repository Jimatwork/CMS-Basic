package com.kubian.mode.dao;

import com.kubian.mode.AppUser;
import com.kubian.mode.User;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface UserDao extends CrudRepository<User, Integer> {

	// 登录
	User findByUserNameAndUserPwdAndUserRole(String userName, String userPwd, Integer userRole);

	User findByUserNameAndUserPwd(String userName, String userPwd);

	User findByUserNameAndUserRole(String userName, Integer userRole);

	@Query(value = "select new User(u.homePageImg,u.detailPageImg) from User u where user_name =:userName and user_role=:userRole")
	User getUserByUserNameAndUserRole(@Param("userName") String userName, @Param("userRole") Integer userRole);

	// 通过ID查询
	User findById(Long id);

	User findByAuId(Long auid);

	// 根据用户id获取所关注的用户的信息
	@Query(nativeQuery = true, value = "select * from user where id in  (select be_followed_id from attention where follower_id = :followerId and judge = 1) limit :page,:limit")
	public List<User> getColContentByFollowerId(@Param("followerId") Long followerId, @Param("page") Integer page,
			@Param("limit") Integer limit);

	// 根据用户id获取关注自己的用户的信息
	@Query(nativeQuery = true, value = "select * from user where id in  (select follower_id from attention where be_followed_id = :beFollowedId)")
	public List<User> getColContentByBeFollowerId(@Param("beFollowedId") Long beFollowedId);
}
