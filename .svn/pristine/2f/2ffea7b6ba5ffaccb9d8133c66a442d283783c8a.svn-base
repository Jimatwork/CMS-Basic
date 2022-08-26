package com.kubian.mode.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kubian.mode.ColumnContent;
import com.kubian.mode.SatColumnContent;

/**
 * 前言和活动的dao层 ClassName: SatColumnContent
 * 
 * @Description: TODO
 * @author HD
 * @date 2018年6月21日
 */
@Repository
@Transactional
public interface SatColumnContentDao extends CrudRepository<SatColumnContent, Integer> {

	public SatColumnContent findById(Long id);

	// 模糊搜索
	@Query(value = "from SatColumnContent where conTitle like :conTitle and type =:type and (state=1 or state=:state) order by id desc")
	public List<SatColumnContent> findByConTitleAndType(@Param("conTitle") String conTitle, @Param("type") String type,
			@Param("state") String state, Pageable pageable);

	// 模糊搜索
	@Query(value = "from SatColumnContent where conTitle like :conTitle and type =:type and (state=1 or state=:state) order by id desc")
	public List<SatColumnContent> findByConTitleAndType(@Param("conTitle") String conTitle, @Param("type") String type,
			@Param("state") String state);

	// 根据栏目id colId和状态state 和type分页获取数据
	public Page<SatColumnContent> findByColIdAndStateAndType(Long colId, String state, String type, Pageable pageable);

	public Page<SatColumnContent> findByColIdAndType(Long colId, String type, Pageable pageable);

	// 根据状态state和type分页获取数据
	public Page<SatColumnContent> findByStateAndType(String state, String type, Pageable pageable);

	public Page<SatColumnContent> findByType(String type, Pageable pageable);

	// 根据type获取推荐的内容
	@Query(value = "from SatColumnContent where top is not null and type =:type order by top desc")
	public List<SatColumnContent> getSatConByType(@Param("type") String type);

	@Query(value = "from SatColumnContent where top is not null order by top desc")
	public List<SatColumnContent> getSatConByType();

	// 根据type获取特别报导的内容
	public List<SatColumnContent> findByHotAndType(String hot, String type, Sort sort);

	public List<SatColumnContent> findByHot(String hot, Sort sort);

	// 根据用户姓名或标题搜索
	@Query(nativeQuery = true, value = "select * from sat_column_content where user_id in (select u.id from user u  where nick_name like :search_str) or con_title like :search_str or con_remark like :search_str and (is_public is null or is_public!=0) and state =1  order by create_date DESC limit :page,:size")
	public List<SatColumnContent> fuzzySearchSatCon(@Param("search_str") String search_str, @Param("page") Integer page,
			@Param("size") Integer size);

	@Query(nativeQuery = true, value = "select * from sat_column_content where user_id in (select u.id from user u  where nick_name like :search_str) or con_title like :search_str or con_remark like :search_str and (is_public is null or is_public!=0) and state =1  order by create_date DESC")
	public List<SatColumnContent> fuzzySearchSatCon(@Param("search_str") String search_str);
}
