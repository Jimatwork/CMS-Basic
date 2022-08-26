$(document).ready(function(){
	var limis = 5;
	var navigationId = sessionStorage.getItem('navigationId');
	if(navigationId == "" || navigationId == null){
		sessionStorage.setItem('navigationId', 0);
	};
	
	var menuitem = "";			  		  //默认前沿
	$('.js-show-menu').eq(navigationId).children('a').addClass('nav-news_color');
	
	publicAjax('getPageImg', "" ,function(data){
		$('#login_imgs').attr("src", data.homePageImg);
	},1);
	
	if(navigationId == 1){
		menuitem = "getSatCon";           //视频 
		allData(menuitem, limis, 2);
		
	}else if(navigationId == 2){
		menuitem = "getHeadLines"; 		  //精选
		allData1(menuitem, limis);
	}else if(navigationId == 3){
		menuitem = "queryFindLisAltert";  //各地
		allData1(menuitem, limis);
	}else if(navigationId == 4){
		menuitem = "getSatCon";  		  //活动
		allData(menuitem, limis, 1);
		
	}else{
		menuitem = "getSatCon";  		  //前沿
		//初始化主菜单	
		allData(menuitem, limis, 0);
	};
	
//主菜单点击
	$('.js-show-menu').click(function(){
		var thisIndex = $(this).index();
		var tests = $(this).children('a').text();
		
		$(this).children('a').addClass('nav-news_color');
		$(this).siblings().children('a').removeClass('nav-news_color');
		$('#theArticleLists').html("");
		if(thisIndex == 1){
			menuitem = "getSatCon";        	  //视频	
		}else if(thisIndex == 2){
			menuitem = "getHeadLines"; 		  //精选
		}else if(thisIndex == 3){
			menuitem = "queryFindLisAltert";  //各地
		}else{
			menuitem = "getSatCon";  		  //前沿
		};
		
		sessionStorage.setItem('tests', tests);
		sessionStorage.setItem('navigationId', thisIndex);
		sessionStorage.setItem('leID', 1);
		if(thisIndex > 1 && thisIndex < 4) {
			allData1(menuitem, limis);
		}else if(thisIndex == 1) {
			allData(menuitem, limis, 2);
		}else if(thisIndex == 4) {
			allData(menuitem, limis, 1);
		} else {
			allData(menuitem, limis, 0);
		}
	});

//子菜单点击
$('#positionss').on('click', '.abbrMenu', function(){		
	$(this).children('a').addClass('abbrMenu_background');
	$(this).siblings().children('a').removeClass('abbrMenu_background');
	var data_id = $(this).attr('data_id');
	var thisIndex = sessionStorage.getItem('navigationId');
	var anchors = '#anchor'+data_id;
		
	if($(anchors).attr("data_an") != undefined){
		$('.anchors').removeClass('anchorHeigth');
	}else{
		alert("暂无数据！");
	};
	$(anchors).addClass('anchorHeigth');
});

//搜搜
$('#submits').click(function(){
	var search = $('#search-input').val();
	if(search == "" || search == null){
		return
	}else{
		publicAjax('fuzzySearchSatCon', {"search_str" : search, "start" : 0, "limit" : 10, "tag" : 5}, function(data){
			//console.log(JSON.stringify(data));
			if(data.success){
				var totalSize = data.totalSize, data = data.list, zhansHtml = "", colNames;				
				for(var i=0; i<data.length; i++){
					var s = data[i].colName, userNames = data[i].userName, leID;
					colNames = s.substr(0, 2);
					if(colNames == "头条" || colNames == "发现"){
						sessionStorage.setItem('leID', 1);
					};
					
					if(data[i].userName == null || data[i].userName == ""){
						userNames = "酷小编"
					};
					zhansHtml += `<a class="search-hot_a" href="article.html?id='${data[i].id}&leID=${i}">
						            	<img src="${data[i].conImg}" />
						            	<div>
						            		<h4>${data[i].conTitle}</h4>
						            		<p>${data[i].conRemark}</p>
						            		<p>${userNames}&nbsp;&nbsp;${times(data[i].createDate)}</p>
						            	</div>
						            </a>`
				};
				$('.search-hot').html(zhansHtml);
			}
		},1);
	}
})

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
});


function dataHtml(menuite, limi, ids, types){
	if(types == 0 || types == 1 || types == 2){		
		publicAjax(menuite, {"colId" : ids, "type" : types,  "page" : 0, "size" : limi, "state" : 1}, function(data){
			if(data.success){				
				totalSizes = data.totalSize;
				if(totalSizes > 0){
					//console.log(totalSizes+"`````````````"+JSON.stringify(data))
					var datas = data.list, htmls = "", htmlso = "";

					for(var i=3; i<datas.length; i++){
						var dataVideoPath = false;
						if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
			                dataVideoPath = true;
			            };  
						htmlso += htmldata(datas, i, dataVideoPath);
					};
					
					$('#theArticleLists').append(datazuix(datas, htmlso, ids));
				}
			}
		},1)
	}else{
		publicAjax(menuite, {"id" : ids, "start" : 0, "limit" : limi, "tag" : 5}, function(data){
			if(data.success){
				
				totalSizes = data.totalSize;
				if(totalSizes > 0){
					//console.log(totalSizes+"`````````````"+JSON.stringify(data));
					var datas = data.list, htmls = "", htmlso = "";
					for(var i=3; i<datas.length; i++){
						var dataVideoPath = false;
						if((datas[i].conVideoPath == null || datas[i].conVideoPath == "") && (datas[i].conLivePath == null || datas[i].conLivePath == "")) {
			                dataVideoPath = true;
			            };
			            
						htmlso += htmldata(datas, i, dataVideoPath);
					};
					
					$('#theArticleLists').append(datazuix(datas, htmlso, ids));
				}
			}
		})
	};
};

//所有数据渲染
function datazuix(datas, htmlso, ids){
	var tests = sessionStorage.getItem('tests'), colName;
	var s = datas[0].colName;
	if(tests == "" || tests == null){
		colName = datas[0].colName;
	}else{
		colName = tests+" "+s.substr(3, 5);
	};
	
	return `<div id="anchor${ids}" data_an="${ids}" class="anchors"></div>
	<div class="box-moder moder-project-list" style="clear:both;">
			        <h3>${colName}</h3>
			        <span class="pull-right project-more"><a href="channel.html?id=${ids}" class="transition" target="_blank">全部</a></span>
			        <span class="span-mark"></span>
			    </div>
			    <div class="placeholder"></div>
		        <div class="big-pic-box">
		                <!--一级banner图-->
		                <div class="big-pic">
		                    ${htmla1s(datas)}
		                </div>
		                <!--二级banner图-->
		                <div class="big2-pic big2-pic-index big2-pic-index-top">	                    
		                    ${htmla2s(datas[1])}
		                </div>
		            
		                <div class="big2-pic big2-pic-index big2-pic-index-bottom">
		                    ${htmla2s(datas[2])}
		                </div>
		    	</div>
		            <!--文章列表-->
		    <div class="mod-info-flow">
				${htmlso}
			</div>`
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


function allData(menuitem, limis, tag){
	publicAjax("getColumn", {
				"tag": tag
			}, function(data) {
				//console.log("视频——————————————————"+JSON.stringify(data))
				var datas = data.list, abbrMenu = "";
				for(var i=0; i<datas.length; i++){
					abbrMenu += zidaohang(datas, i);
					dataHtml(menuitem, limis, datas[i].id, tag);
				};
				$('#positionss').html(abbrMenu);
			}, 1);
};

function allData1(menuitem, limis){
	publicAjax("getAllColumns", "", function(data) {
		var datas = data.list,
			abbrMenu = "";
		for(var i = 0; i < datas.length; i++) {
			abbrMenu += zidaohang(datas, i);
			dataHtml(menuitem, limis, datas[i].id);
		};
		$('#positionss').html(abbrMenu);
	})
};

//子菜单Html
function zidaohang(datas, i){
	return `<p class="abbrMenu" data_id="${datas[i].id}"><a href="#anchor${datas[i].id}">${datas[i].colName}</a></p>`;
};

//一级banner图
function htmla1s(datas){
	var skipId = sessionStorage.getItem('navigationId');
		return  `<a href="article.html?id='${datas[0].id}'&skipId='${skipId}'" target="_blank" class="transition">
			                        <div class="back-img">
			                            <img src="${datas[0].conImg}"  alt="${datas[0].conTitle}">
			                        </div>
			                        <div class="big-pic-content">
			                            <h1 class="t-h1">${datas[0].conTitle}</h1>
			                        </div>
			                    </a>`;
};


//二级banner图
function htmla2s(data){
	if(data == undefined){
		return "";
	}else{
		var skipId = sessionStorage.getItem('navigationId');
		return  `<a href="article.html?id='${data.id}'&skipId='${skipId}'" class="back-img transition" target="_blank" >
                        <img class="lazy" src="${data.conImg}"
                             alt="${data.conTitle}">
                    </a>
                    <a href="article.html?id='${data.id}'" target="_blank" >
                        <div class="big2-pic-content">
                            <h2 class="t-h1">${data.conTitle}</h2>
                        </div>
                    </a>`
   	};
};
