package com.kubian;

import com.kubian.mode.Advertising;
import com.kubian.mode.AdvertisingEx;
import com.kubian.mode.Columns;
import com.kubian.mode.SatAdvertising;
import com.kubian.mode.dao.AdvertisingDao;
import com.kubian.mode.dao.AdvertisingExDao;
import com.kubian.mode.dao.ColumnsDao;
import com.kubian.mode.dao.SatAdvertisingDao;
import com.kubian.mode.util.ListRange;
import com.kubian.mode.util.MyTools;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 波士顿导报的普通广告管理
 *
 * @author WangW
 * @Description: TODO
 * @date 2018年4月10日
 */
@RestController
public class SatAdvertisingController {

	@Autowired
	private SatAdvertisingDao advertisingDao;

	@Value("${web.upload.path}")
	private String uploadPath;
	@Value("${web.img.path}")
	private String webImgPath;

	/**
	 * 查询所有的普通广告
	 *
	 * @return Object
	 * @throws @Description:
	 *             TODO
	 * @author WangW
	 * @date 2018年4月11日
	 */
	@RequestMapping(value = "/getAllSatAdvertising")
	@ResponseBody
	public Object getAllSatAdvertising() {
		List<SatAdvertising> list = advertisingDao.findAll();
		return list;
	}

	/**
	 * 查询所有的普通广告(分页)
	 *
	 * @return Object
	 * @throws @Description:
	 *             TODO
	 * @author WangW
	 * @date 2018年4月11日
	 */
	@RequestMapping(value = "/getAllSatAdvertisingByPage")
	@ResponseBody
	public Object getAllSatAdvertisingByPage(Integer page, Integer limit, String site) {
		if (MyTools.isEmpty(site)) {
			Page<SatAdvertising> list = advertisingDao.findAll(new PageRequest(page, limit));
			return list;
		}
		Page<SatAdvertising> list = advertisingDao.findBySite(site, new PageRequest(page, limit));
		return list;
	}

	/**
	 * 增加普通广告
	 *
	 * @param advertising
	 * @return Object
	 * @throws @Description:
	 *             TODO
	 * @author WangW
	 * @date 2018年4月11日
	 */
	@RequestMapping(value = "/addSatAdvertising")
	@ResponseBody
	public Object addSatAdvertising(@ModelAttribute SatAdvertising advertising,
			@RequestParam("myUpload") MultipartFile multipartFile) {
		ListRange<AdvertisingEx> listRange = new ListRange<AdvertisingEx>();
		try {
			String filePath = "";
			if (!MyTools.isEmpty(multipartFile)) {
				if (multipartFile.getSize() > 0) {
					// 获取文件名
					filePath = MyTools.saveFiles(multipartFile, uploadPath, webImgPath);
					if (filePath.equals("图片保存出错")) {
						listRange.setSuccess(false);
						listRange.setMessage("图片保存出错");
						return listRange;
					} else {
						advertising.setImgUrl(filePath);
					}
				}
			}

			if (advertising.getId() != null) {
				SatAdvertising advertising2 = advertisingDao.findById(advertising.getId());
				MyTools.updateNotNullFieldForPatient(advertising2, advertising);
				advertisingDao.save(advertising2);
				listRange.setSuccess(true);
				listRange.setMessage("增加成功!");
				return listRange;
			}
			advertisingDao.save(advertising);
			listRange.setSuccess(true);
			listRange.setMessage("增加成功!");
		} catch (Exception e) {
			e.printStackTrace();
			listRange.setSuccess(false);
			listRange.setMessage("增加失败!");
		}
		return listRange;
	}

	/**
	 * 删除普通广告
	 *
	 * @param advertising
	 * @return Object
	 * @throws @Description:
	 *             TODO
	 * @author WangW
	 * @date 2018年4月11日
	 */
	@RequestMapping(value = "/delSatAdvertising")
	@ResponseBody
	public Object delSatAdvertising(SatAdvertising advertising) {
		ListRange<SatAdvertising> listRange = new ListRange<SatAdvertising>();
		try {
			advertisingDao.delete(advertising);
			listRange.setSuccess(true);
			listRange.setMessage("删除成功!");
		} catch (Exception e) {
			e.printStackTrace();
			listRange.setSuccess(false);
			listRange.setMessage("删除失败!");
		}
		return listRange;
	}
}
