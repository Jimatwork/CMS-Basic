package com.kubian.mode.dao;

import com.kubian.mode.Advertising;
import com.kubian.mode.SatAdvertising;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface SatAdvertisingDao extends CrudRepository<SatAdvertising, Integer> {

	// 获取所有的普通广告
	List<SatAdvertising> findAll();

	// 获取所有的普通广告(分页)
	Page<SatAdvertising> findAll(Pageable pageable);

	// 根据位置获取广告
	Page<SatAdvertising> findBySite(String site, Pageable pageable);

	SatAdvertising findById(Long id);
}
