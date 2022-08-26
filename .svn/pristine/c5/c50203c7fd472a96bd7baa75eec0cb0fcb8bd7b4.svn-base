package com.kubian;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kubian.mode.Partner;
import com.kubian.mode.dao.PartnerDao;
import com.kubian.mode.util.MyTools;
import com.kubian.mode.util.ReturnMsg;

/**
 * 合作伙伴 ClassName: PartnerController
 * 
 * @Description: TODO
 * @author HD
 * @date 2018年6月28日
 */
@RestController
public class PartnerController {
	@Autowired
	private PartnerDao partnerDao;
	@Value("${web.upload.path}")
	private String uploadPath;
	@Value("${web.img.path}")
	private String webImgPath;

	/**
	 * 获取所有的合作伙伴
	 * 
	 * @Description: TODO
	 * @param @param
	 *            page
	 * @param @param
	 *            limit
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年6月28日
	 */
	@RequestMapping(value = "getAllPartener")
	public Object getAllPartener(Integer page, Integer limit) {
		ReturnMsg returnMsg = new ReturnMsg();
		try {
			if (MyTools.isEmpty(page) && MyTools.isEmpty(limit)) {
				List<Partner> list = partnerDao.findAll();
				returnMsg.setList(list);
				returnMsg.setMsg("获取成功");
				returnMsg.setSuccess(true);
				if (list != null && list.size() > 0) {
					returnMsg.setTotalSize(list.size());
				} else {
					returnMsg.setTotalSize(0);
				}
				return returnMsg;
			}
			Page<Partner> partners = partnerDao.findAll(new PageRequest(page, limit));
			returnMsg.setList(partners.getContent());
			returnMsg.setMsg("获取成功");
			returnMsg.setSuccess(true);
			returnMsg.setTotalSize(partners.getTotalElements());
		} catch (Exception e) {
			returnMsg.setList(null);
			returnMsg.setMsg("异常错误！");
			returnMsg.setSuccess(false);
			returnMsg.setTotalSize(0);
			e.printStackTrace();
		}
		return returnMsg;
	}

	/**
	 * 添加或修改合作伙伴
	 * 
	 * @Description: TODO
	 * @param @param
	 *            partner
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年6月28日
	 */
	@RequestMapping(value = "/addpartner")
	public Object addpartner(Partner partner, @RequestParam("myUpload") MultipartFile multipartFile) {
		ReturnMsg returnMsg = new ReturnMsg();
		try {
			String filePath = "";
			if (!MyTools.isEmpty(multipartFile)) {
				if (multipartFile.getSize() > 0) {
					// 获取文件名
					filePath = MyTools.saveFiles(multipartFile, uploadPath, webImgPath);
					if (filePath.equals("图片保存出错")) {
						returnMsg.setSuccess(false);
						returnMsg.setMsg("图片保存出错");
						return returnMsg;
					} else {
						partner.setImgUrl(filePath);
					}
				}
			}

			if (!MyTools.isEmpty(partner.getId())) {
				// 是修改
				Partner partner2 = partnerDao.findById(partner.getId());
				try {
					MyTools.updateNotNullFieldForPatient(partner2, partner);
					partnerDao.save(partner2);
					returnMsg.setList(null);
					returnMsg.setMsg("修改成功！");
					returnMsg.setSuccess(true);
					returnMsg.setTotalSize(0);
					return returnMsg;
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (NoSuchMethodException e) {
					e.printStackTrace();
				}
			}
			partnerDao.save(partner);
			returnMsg.setList(null);
			returnMsg.setMsg("添加成功！");
			returnMsg.setSuccess(true);
			returnMsg.setTotalSize(0);
		} catch (Exception e) {
			returnMsg.setList(null);
			returnMsg.setMsg("异常错误！");
			returnMsg.setSuccess(false);
			returnMsg.setTotalSize(0);
			e.printStackTrace();
		}
		return returnMsg;
	}

	/**
	 * 根据id删除对应的合作伙伴
	 * 
	 * @Description: TODO
	 * @param @param
	 *            id
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年6月28日
	 */
	@RequestMapping(value = "/delPartner")
	public Object delPartner(Long id) {
		ReturnMsg returnMsg = new ReturnMsg();
		try {
			Partner partner = partnerDao.findById(id);
			if (!MyTools.isEmpty(partner)) {
				partnerDao.delete(partner);
				returnMsg.setList(null);
				returnMsg.setMsg("删除成功！");
				returnMsg.setSuccess(true);
				returnMsg.setTotalSize(0);
			} else {
				returnMsg.setList(null);
				returnMsg.setMsg("数据不存在！");
				returnMsg.setSuccess(false);
				returnMsg.setTotalSize(0);
			}
		} catch (Exception e) {
			returnMsg.setList(null);
			returnMsg.setMsg("异常错误！");
			returnMsg.setSuccess(false);
			returnMsg.setTotalSize(0);
			e.printStackTrace();
		}

		return returnMsg;
	}
}
