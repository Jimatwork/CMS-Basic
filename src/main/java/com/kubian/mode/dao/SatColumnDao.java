package com.kubian.mode.dao;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kubian.mode.SatColumn;

@Transactional
@Repository
public interface SatColumnDao extends CrudRepository<SatColumn, Integer> {
	public SatColumn findById(Long id);
	
	public SatColumn findByIdAndTag(Long id , Integer tag);
	
	public List<SatColumn> findByTag(Integer tag, Sort sort);

	public List<SatColumn> findByColLinkAndTag(String colLink, Integer tag);
}
