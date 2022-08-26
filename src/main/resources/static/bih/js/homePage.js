$(document).ready(function(){
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
	navigationId = $.getUrlParam('navigationId');  //选择菜单值
	
	var menuitem, limits = 20;			  //显示数据长度
	if(navigationId == 0){
		menuitem = "getHeadLines";        //头条
	}else if(navigationId == 1){
		menuitem = "getHotColumnContent"; //热门
	}else if(navigationId == 2){
		menuitem = "queryFindLisAltert";  //发现
	}else if(navigationId == 3){
		menuitem = "getSatCon";  		  //活动
	}else{
		menuitem = "getSatCon";  		  //前沿
	};
	
	if(navigationId == null || navigationId == ""){
		publicAjax("getColumn", {"tag" : 0}, function(data){
			var datas = data.list;
			dataHtml(menuitem, limits, datas[0].id, 0);
			sessionStorage.setItem('skipId', 4);  		//主栏目id
		},1);
	}else{
		if(navigationId <= 2){
			publicAjax("getAllColumns", "", function(data){
				var datas = data.list;
				dataHtml(menuitem, limits, datas[0].id);
			});
		}else if(navigationId == 3){
			publicAjax("getColumn", {"tag" : 1}, function(data){
				//console.log("活动——————————————————"+JSON.stringify(data))
				var datas = data.list;
				dataHtml(menuitem, limits, datas[0].id, 1);
			},1);
		}else{
			publicAjax("getColumn", {"tag" : 0}, function(data){
				var datas = data.list;
				dataHtml(menuitem, limits, datas[0].id, 0);
			},1);
		}
	};

//头部子菜单 热门 发现 头条
	publicAjax("getAllColumns", "", function(data){
		var datas = data.list;
		var htmls = "";
		for(var i=0; i<datas.length; i++){			
			htmls += '<li><a class="skipId" href="channel.html?id='+datas[i].id+'" target="_blank">'+datas[i].colName+'</a></li>';
		};
		
		$('.subtopic').html(htmls);
	});
	
//头部子菜单  前沿
	publicAjax("getColumn", {"tag" : 0}, function(data){
		//console.log("前沿——————————————————"+JSON.stringify(data))
		var datas = data.list;
		var htmls = "";
		for(var i=0; i<datas.length; i++){			
			htmls += '<li><a class="skipId" href="channel.html?id='+datas[i].id+'" target="_blank">'+datas[i].colName+'</a></li>';
		};
		
		$('.leading_edge').html(htmls);
	},1);
	
//头部子菜单 活动
	publicAjax("getColumn", {"tag" : 1}, function(data){
		//console.log("活动——————————————————"+JSON.stringify(data))
		var datas = data.list;
		var htmls = "";
		for(var i=0; i<datas.length; i++){			
			htmls += '<li><a class="skipId" href="channel.html?id='+datas[i].id+'" target="_blank">'+datas[i].colName+'</a></li>';
		};
		
		$('.activity').html(htmls);
	},1);


	//更多加载
	var starts = 1;
	$('.get-mod-more').click(function(){
		if(totalSizes > starts*limits){
			if(navigationId <= 2 && navigationId !== null ){
				publicAjax("getAllColumns", "", function(data){
					var datas = data.list;
					publicAjax(menuitem, {"id" : datas[0].id, "start" : starts, "limit" : limits, "tag" : 5}, function(data){
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
				})
			}else if(navigationId == 3){
				publicAjax("getColumn", {"tag" : 1}, function(data){
					//console.log("活动——————————————————"+JSON.stringify(data))
					var datas = data.list;
					publicAjax(menuitem, {"colId" : datas[0].id, "type" : 1,  "page" : starts, "size" : limits, "state" : 1}, function(data){
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
				},1);
			}else{
				publicAjax("getColumn", {"tag" : 0}, function(data){
					//console.log("前沿——————————————————"+JSON.stringify(data))
					var datas = data.list;
					publicAjax(menuitem, {"colId" : datas[0].id, "type" : 0,  "page" : starts, "size" : limits, "state" : 1}, function(datas){
						var datas = datas.list, htmlso = "";
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
				},1);
			}
		}else{
			$(this).html("已显示全部内容！");
		}
	});
	
	//阅读推荐
	publicAjax("getRandom", "", function(data) {
	    var htmlse = "";
	    for(var l=0; l<data.content.length; l++){

	        htmlse += recommendDa(data.content, l);
	    };
	    
	   $("#recommend").html(htmlse);
	});
	
//上广告	
	advertising($('.silder-main'));
	
//右广告	
	rightAdvertising($('#rigthAdvertising'));	
});



//数据渲染	http://192.168.10.108:8878/getSatCon?colId=1&type=0&page=0&size=20&state=1
function dataHtml(menuite, limi, ids, types){
	if(types == 0 || types == 1){
		publicAjax(menuite, {"colId" : ids, "type" : types,  "page" : 0, "size" : limi, "state" : 1}, function(data){
			if(data.success){
				totalSizes = data.totalSize;
				var datas = data.list, htmls = "", htmlso = "";
				var htmla1 = `<a href="article.html?id='${datas[0].id}'" target="_blank" class="transition">
		                        <div class="back-img">
		                            <img src="${datas[0].conImg}"  alt="${datas[0].conTitle}">
		                        </div>
		                        <div class="big-pic-content">
		                            <h1 class="t-h1">${datas[0].conTitle}</h1>
		                        </div>
		                    </a>`;
		                    
		        
		        $('.big-pic').html(htmla1);
		        $('.big2-pic-index-top').html(htmla1s(datas[1]));
		        $('.big2-pic-index-bottom').html(htmla1s(datas[2]));
		        
				for(var i=3; i<datas.length; i++){
					var dataVideoPath = false;
					if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
		                dataVideoPath = true;
		            };  
					htmlso += htmldata(datas, i, dataVideoPath);
				};
				
				$('.mod-info-flow').html(htmlso);
				
			}
		},1)
	}else{
		publicAjax(menuite, {"id" : ids, "start" : 0, "limit" : limi, "tag" : 5}, function(data){
			if(data.success){
				totalSizes = data.totalSize;
				var datas = data.list, htmls = "", htmlso = "";
				var htmla1 = `<a href="article.html?id='${datas[0].id}'&column=${0}" target="_blank" class="transition">
		                        <div class="back-img">
		                            <img src="${datas[0].conImg}"  alt="${datas[0].conTitle}">
		                        </div>
		                        <div class="big-pic-content">
		                            <h1 class="t-h1">${datas[0].conTitle}</h1>
		                        </div>
		                    </a>`;
		                    
		        
		        $('.big-pic').html(htmla1);
		        $('.big2-pic-index-top').html(htmla1s(datas[1]));
		        $('.big2-pic-index-bottom').html(htmla1s(datas[2]));
		        
				for(var i=3; i<datas.length; i++){
					var dataVideoPath = false;
					if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
		                dataVideoPath = true;
		            };
		            
					htmlso += htmldata(datas, i, dataVideoPath);
				};
				
				$('.mod-info-flow').html(htmlso);
				
			}
		})
	}
};

//图片数据html
function htmldata(datas, i, htmls){
	var slices = datas[i].conRemark.slice(0,2), conRemark = datas[i].conRemark;
	if(slices == "<p"){
		conRemark = "";
	};
	return `<div class="mod-b mod-art clearfix ">
						<!--栏目链接-->
						
						${htmlJieg(datas, i, htmls)}
						
						<div class="mob-ctt index-article-list-yh">
							<h2><a href="article.html?id='${datas[i].id}'" class="transition msubstr-row2"
					                           target="_blank">${datas[i].conTitle}</a></h2>
					
							<div class="mob-author">
								<div class="author-face">
									<a href="javascript:void(0)" target="_blank"><img src="${datas[i].userImg}"></a>
								</div>
								<a href="javascript:void(0)" target="_blank">
									<span class="author-name ">${datas[i].userName}</span>
								</a>
								<a href="javascript:void(0)" target="_blank"></a>
								<span class="time">${pastTense(datas[i].createDate)}</span>
								<i class="icon icon-cmt"></i><em>${datas[i].exaCount}</em>
								<i class="icon icon-fvr"></i><em>${datas[i].praiseCount}</em>
							</div>
					
							<!--外部文章/内部文章两者取其一-->
							<div class="mob-sub">${conRemark}</div>
						</div>
						<!--文章Tag展示-->
						<div class="column-link-box">
							<a href="javascript:void(0)" class="column-link" target="_blank">${datas[i].colName}</a>
						</div>
					</div>`;
};

//二级banner图
function htmla1s(data){
		return  `<a href="article.html?id='${data.id}'" class="back-img transition" target="_blank" >
                        <img class="lazy" src="${data.conImg}"
                             alt="${data.conTitle}">
                    </a>
                    <a href="article.html?id='${data.id}'" target="_blank" >
                        <div class="big2-pic-content">
                            <h2 class="t-h1">${data.conTitle}</h2>
                        </div>
                    </a>`;
};
