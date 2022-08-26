(function($) {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
//数据Id
	data_id = $.getUrlParam('id');
	
	publicAjax('getPageImg', "" ,function(data){
		$('#login_imgs').attr("src", data.detailPageImg);
	},1);
	
//数据类Id    请求类           数据总长度	       显示数据长度
	var skipId = sessionStorage.getItem('navigationId'), menuitem, totalSizes, limits = 20;
	
	if(skipId == 1){
		menuitem = "getSatCon";           //视频
	}else if(skipId == 2){
		menuitem = "getHeadLines"; 		  //精选
	}else if(skipId == 3){
		menuitem = "queryFindLisAltert";  //发现
	}else if(skipId == 4){
		menuitem = "getSatCon";  		  //各地
	}else{
		menuitem = "getSatCon";  		  //前沿
	};

//不同数据展示
	if(skipId > 1 && skipId < 4){
		//页面数据展示	  热门  发现 头条
		publicAjax(menuitem, {"id" : data_id, "start" : 0, "limit" : limits, "tag" : 5}, function(data){
			if(data.success){
				var datas = data.list, htmls = "", htmlso = "", colNames;
				if(data.list.length > 0){
					var tests = sessionStorage.getItem('tests');					
					var s = datas[0].colName;					
					if(tests == "" || tests == null){
						colNames = datas[0].colName;
					}else{
						colNames = tests+" "+s.substr(3, 5);
					};
				}else{
					colNames = "栏目暂无数据";
				};
				$('.column-wraps').html(colNames);
				
				for(var i=0; i<datas.length; i++){
					var dataVideoPath = false;
					if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
		                dataVideoPath = true;
		            };
					htmlso += htmldata(datas, i, dataVideoPath);
				};
				$('.mod-info-flow').html(htmlso);
				totalSizes = data.totalSize;
			}
		});
	}else if(skipId == 1){
		publicAjax(menuitem, {"colId" : data_id, "type" : 2,  "page" : 0, "size" : limits, "state" : 1}, function(data){
			//console.log("视频——————————————————"+JSON.stringify(data))
			dataSuccess(data);
		},1);
	}else if(skipId == 4){
		publicAjax(menuitem, {"colId" : data_id, "type" : 1,  "page" : 0, "size" : limits, "state" : 1}, function(data){
			//console.log("活动——————————————————"+JSON.stringify(data))
			dataSuccess(data);
		},1);
	}else{
		publicAjax(menuitem, {"colId" : data_id, "type" : 0,  "page" : 0, "size" : limits, "state" : 1}, function(data){
			//console.log("前沿——————————————————"+JSON.stringify(data))
			dataSuccess(data);
		},1);
	}
	
	//更多加载
	var starts = 1;
	$('.get-mod-more').click(function(){
		if(totalSizes > starts*limits){
			if(skipId > 1 && skipId < 4){
				//页面数据展示	  热门  发现 头条
				
				publicAjax(menuitem, {"id" : data_id, "start" : starts, "limit" : limits, "tag" : 5}, function(data){
					var datas = data.list, htmlso = "";
					for(var i=0; i<datas.length; i++){
						var dataVideoPath = false;
						if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
			                dataVideoPath = true;
			            };
						htmlso += htmldata(datas, i, dataVideoPath);				
					};			
					starts += 1;
					$('.mod-info-flow').append(htmlso);	
				})
			}else if(skipId == 1){
				publicAjax(menuitem, {"colId" : data_id, "type" : 2,  "page" : starts, "size" : limits, "state" : 1}, function(data){
					//console.log("视频——————————————————"+JSON.stringify(data))
					dataSuccess2(data)
				},1);
			}else if(skipId == 4){
				publicAjax(menuitem, {"colId" : data_id, "type" : 1,  "page" : starts, "size" : limits, "state" : 1}, function(data){
					//console.log("活动——————————————————"+JSON.stringify(data))
					dataSuccess2(data)
				},1);
			}else{			
				publicAjax(menuitem, {"colId" : data_id, "type" : 0,  "page" : starts, "size" : limits, "state" : 1}, function(data){
					//console.log("前沿——————————————————"+JSON.stringify(data))
					dataSuccess2(data)
				},1);
			}
		}else{
			$(this).html("已显示全部内容！");
		}
	});

//阅读推荐
getSatConByTop($("#recommend"));

//头条
getTopSatContent($("#headline"), 2);

//特别报导
getTopSatContent($("#specialReport"), 1);
    
//上广告
advertising($('.silder-main'));  
	
//右广告	
rightAdvertising($('#rigthAdvertising'));
})($);

//展示数据Html
function htmldata(datas, i, jieg){
	var slices = datas[i].conRemark.slice(0,2), conRemark = datas[i].conRemark;
	if(slices == "<p"){
		conRemark = "";
	};
	return `<div class="mod-b mod-art clearfix" data-aid="">
				<div class="mod-angle">热</div>
				${htmlJieg(datas, i, jieg)}
				<div class="mob-ctt channel-list-yh">
					<h2>
		        		<a href="article.html?id='${datas[i].id}'" class="transition msubstr-row2" target="_blank">${datas[i].conTitle}</a>
		    		</h2>
					<div class="mob-author">
						<div class="author-face">
							<a href="javascript:void(0)" target="_blank"><img src="${datas[i].userImg}"></a>
						</div>
						<a href="javascript:void(0)" target="_blank">
							<span class="author-name">${datas[i].userName}</span>
						</a>
						<a href="javascript:void(0)" target="_blank"></a>
						<span class="time">${pastTense(datas[i].createDate)}</span>
						<i class="icon icon-cmt"></i><em>${datas[i].exaCount}</em>
						<i class="icon icon-fvr"></i><em>${datas[i].praiseCount}</em>
					</div>
		
					<div class="mob-sub">${conRemark}</div>
				</div>
			</div>`
};

function dataSuccess(data){
	if(data.success){
				var datas = data.list, htmls = "", htmlso = "", colNames;
				if(data.list.length > 0){
					var tests = sessionStorage.getItem('tests');
					var s = datas[0].colName;
					if(tests == "" || tests == null){
						colNames = datas[0].colName;
					}else{
						colNames = tests+" "+s.substr(3, 5);
					};
				}else{
					colNames = "栏目暂无数据";
				};
				
				$('.column-wraps').html(colNames);
				for(var i=0; i<datas.length; i++){
					var dataVideoPath = false;
					if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
		                dataVideoPath = true;
		            };
					htmlso += htmldata(datas, i, dataVideoPath);
				};
				$('.mod-info-flow').html(htmlso);
				totalSizes = data.totalSize;
			}
};

function dataSuccess2(data){
	if(data.success){
						var datas = data.list, htmls = "", htmlso = "";
						for(var i=0; i<datas.length; i++){
							var dataVideoPath = false;
							if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
				                dataVideoPath = true;
				            };
							htmlso += htmldata(datas, i, dataVideoPath);
						};
						starts += 1;
						$('.mod-info-flow').append(htmlso);
					}
};
