package com.kubian.mode.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kubian.mode.Partner;

@Transactional
@Repository
public interface PartnerDao extends CrudRepository<Partner, Integer> {
	Page<Partner> findAll(Pageable pageable);

	List<Partner> findAll();

	Partner findById(Long id);

}
