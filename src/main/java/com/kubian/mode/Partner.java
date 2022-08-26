package com.kubian.mode;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 合作伙伴
 * 
 * @Description: TODO
 * @author HD
 * @date 2018年5月8日
 */
@Entity
@Table(name = "partner")
public class Partner implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	// logo图片
	private String imgUrl;
	// 链接地址
	private String linkUrl;
	// 名称
	private String remark;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getLinkUrl() {
		return linkUrl;
	}

	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
