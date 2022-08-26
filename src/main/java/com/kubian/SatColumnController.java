package com.kubian;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kubian.mode.Columns;
import com.kubian.mode.SatColumn;
import com.kubian.mode.dao.SatColumnDao;
import com.kubian.mode.util.MyTools;
import com.kubian.mode.util.ReturnMsg;

/**
 * 前言和活动的栏目操作 ClassName: SatColumnController
 * 
 * @Description: TODO
 * @author HD
 * @date 2018年5月31日
 */
@RestController
public class SatColumnController {
	@Value("${web.upload.path}")
	private String uploadPath;
	@Value("${web.img.path}")
	private String webImgPath;
	@Value("${web.img.path1}")
	private String webImgPath1;
	@Autowired
	private SatColumnDao satColumnDao;

	/**
	 * 添加或修改栏目
	 * 
	 * @Description: TODO
	 * @param @param
	 *            columns
	 * @param @param
	 *            uploadColmn
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年5月31日
	 */
	@RequestMapping(value = "/addSatColumn")
	private Object addSatColumn(@ModelAttribute SatColumn satColumn,
			@RequestParam("myUpload") MultipartFile uploadColmn) {
		ReturnMsg returnMsg = new ReturnMsg();
		SatColumn satColumn2 = new SatColumn();
		if (!uploadColmn.isEmpty()) {
			if (uploadColmn.getSize() > 0) {
				// 有文件上传
				File file = new File(uploadPath + "/columnImg");
				if (!file.exists()) {
					file.mkdirs();
				}
				// 文件名称
				String fname = MyTools.getFileType(uploadColmn.getOriginalFilename());
				Long time = System.currentTimeMillis();
				File files = new File(file + File.separator + time + fname);
				try {
					FileUtils.copyInputStreamToFile(uploadColmn.getInputStream(), files);
					satColumn.setColIcon(webImgPath + "columnImg/" + files.getName());
				} catch (IOException e) {
					returnMsg.setSuccess(false);
					returnMsg.setMsg("异常错误！");
					returnMsg.setList(null);
					returnMsg.setTotalSize(0);
					e.printStackTrace();
				}
			}

		}
		if (!MyTools.isEmpty(satColumn.getId())) {
			// id不为空 是修改
			satColumn2 = satColumnDao.findById(satColumn.getId());
			try {
				MyTools.updateNotNullFieldForPatient(satColumn2, satColumn);
				satColumnDao.save(satColumn2);
				returnMsg.setSuccess(true);
				returnMsg.setList(null);
				returnMsg.setTotalSize(0);
				returnMsg.setMsg("操作成功！");
			} catch (Exception e) {
				returnMsg.setSuccess(false);
				returnMsg.setMsg("异常错误！");
				returnMsg.setList(null);
				returnMsg.setTotalSize(0);
				e.printStackTrace();
			}
		} else {
			// id为空 是添加
			try {
				satColumnDao.save(satColumn);
				returnMsg.setSuccess(true);
				returnMsg.setList(null);
				returnMsg.setTotalSize(0);
				returnMsg.setMsg("操作成功！");

			} catch (Exception e) {
				returnMsg.setSuccess(false);
				returnMsg.setMsg("异常错误！");
				returnMsg.setList(null);
				returnMsg.setTotalSize(0);
				e.printStackTrace();
			}
		}
		return returnMsg;
	}

	/**
	 * 根据tag获取对应的栏目 0.是前沿下面的栏目 1.活动下面的栏目
	 * 
	 * @Description: TODO
	 * @param @param
	 *            tag
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年6月21日
	 */
	@RequestMapping(value = "/getColumn")
	public Object getColumn(Integer tag) {
		ReturnMsg returnMsg = new ReturnMsg();
		try {
			Sort sort = new Sort(Sort.Direction.ASC, "sort");
			List<SatColumn> staColumns = satColumnDao.findByTag(tag, sort);
			returnMsg.setList(staColumns);
			returnMsg.setMsg("获取成功！");
			returnMsg.setSuccess(true);
			returnMsg.setTotalSize(0);
		} catch (Exception e) {
			returnMsg.setSuccess(false);
			returnMsg.setMsg("异常错误！");
			returnMsg.setList(null);
			returnMsg.setTotalSize(0);
			e.printStackTrace();
		}
		return returnMsg;
	}

	/**
	 * 根据栏目id删除栏目 参数 id
	 * 
	 * @Description: TODO
	 * @param @param
	 *            satColumn
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年6月21日
	 */
	@RequestMapping(value = "/delColumn")
	public Object delColumn(@ModelAttribute SatColumn satColumn) {
		ReturnMsg returnMsg = new ReturnMsg();
		try {
			satColumnDao.delete(satColumn);
			returnMsg.setList(null);
			returnMsg.setMsg("删除成功！");
			returnMsg.setSuccess(true);
			returnMsg.setTotalSize(0);
		} catch (Exception e) {
			returnMsg.setSuccess(false);
			returnMsg.setMsg("异常错误！");
			returnMsg.setList(null);
			returnMsg.setTotalSize(0);
			e.printStackTrace();
		}
		return returnMsg;
	}

	/**
	 * 根据ColLink获取栏目信息
	 * 
	 * @Description: TODO
	 * @param @param
	 *            colLink
	 * @param @return
	 * @return Object
	 * @throws @author
	 *             HD
	 * @date 2018年6月25日
	 */
	@RequestMapping(value = "/getSatColumnByColLink")
	public Object getSatColumnByColLink(String colLink , Integer tag) {
		ReturnMsg returnMsg = new ReturnMsg();
		try {
			List<SatColumn> satColumns = satColumnDao.findByColLinkAndTag(colLink , tag);
			returnMsg.setList(satColumns);
			returnMsg.setSuccess(true);
			returnMsg.setTotalSize(0);
			returnMsg.setMsg("操作成功！");
		} catch (Exception e) {
			returnMsg.setSuccess(false);
			returnMsg.setMsg("异常错误！");
			returnMsg.setList(null);
			returnMsg.setTotalSize(0);
			e.printStackTrace();
		}
		return returnMsg;
	}
}
