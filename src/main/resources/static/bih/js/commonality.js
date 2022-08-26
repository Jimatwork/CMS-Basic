//公用Ajax

	function publicAjax(url, data, success, std, beforeSend, complete){
		var https;
		if(std == 1){
//			https = "http://192.168.10.108:8878/";
			https = "http://www.bihonline.world/";
		}else{
//			https = "http://192.168.10.108:8888/";
			https = "https://app.kuedit.com/";
		};
		$.ajax({
			type: 'POST',
			url: https + url,
			data: data,
			dataType: 'json',
			beforeSend: beforeSend,
			success: success,
			complete: complete, 
			error: function() {
				console.log("请求错误！");
			}
		});
	};
	
	//Html结构判断
	function htmlJieg(datas, i, jieg){
		if(jieg){
			return imgHtml(datas, i);
		}else{
			return videoHtml(datas, i);
		}	 
	};
	
	//阅读推荐Html
    function recommendDa(data, ls, hot){
    	return `<ul>
				<li>
					<div class="hot-article-img">
						<a href="article.html?id='${data[ls].id}&ls=${ls}" target="_blank">
							<img src="${data[ls].conImg}">
						</a>
					</div>
					<a href="article.html?id='${data[ls].id}&ls=${ls}" class="transition" target="_blank">${data[ls].conTitle}</a>
				</li>
			</ul>`
    };
    
  //视频结构
	function videoHtml(datas, i){
		var skipId = sessionStorage.getItem('navigationId');
		return `<div class="mod-thumb pull-left video-mod-thumb">
					<a class="transition" title="${datas[i].conTitle}" href="article.html?id='${datas[i].id}'&skipId='${skipId}'" target="_blank">
						<!--视频的box 与 文章图片 两者保留一个-->
						<div class="mod-video-box" style="background: url('${datas[i].conImg}') center no-repeat;background-size: 100%;">
							<div class="mod-video-icon">
								<img src="img/icon_play-video_small.png">
							</div>
							<div class="mod-video-time"><!--视频时间--></div>
							<div class="play-pic-box">
								<img src="img/video1.png">
							</div>
						</div>
					</a>
				</div>`
	};

//图片结构
	function imgHtml(datas, i){
		var skipId = sessionStorage.getItem('navigationId');
		return `<div class="mod-thumb pull-left ">
						<a class="transition" title="${datas[i].conTitle}" href="article.html?id='${datas[i].id}'&skipId='${skipId}'" target="_blank">
						<img class="lazy" data-original="${datas[i].conImg}" src="${datas[i].conImg}" alt="${datas[i].conTitle}" style="display: inline;">
					</a>
				</div>`
	};

//阅读推荐
	function getSatConByTop(recommend, type){		
		publicAjax("getSatConByTop", {"type" : type}, function(data) {
			//console.log(JSON.stringify(data))
		    if(data.success){
		    	var datas = data.list;
		    	var htmlse = "";
			    for(var l=0; l<datas.length; l++){		
			        htmlse += recommendDa(datas, l);
			    };			    
			    recommend.html(htmlse);
		   }
		},1);
	};
	
//头条       特别报导
	function getTopSatContent(recommend, hot, type){
		publicAjax("getTopSatContent", {"type" : type, "tag" : 5, "hot" : hot}, function(data) {
			//console.log("~~~~~~~~~~~~~~~~~"+JSON.stringify(data))
			if(data.success){
		    	var datas = data.list;
		    	var htmlse = "";
			    for(var l=0; l<datas.length; l++){
		
			        htmlse += recommendDa(datas, l, hot);
			    };
			    recommend.html(htmlse);
		   }	   
		},1);
	};
	
//过去时间    
    function pastTense(times) {
        var n = 1000*60*60*24*365, y = 1000*60*60*24*30, r = 1000*60*60*24, s = 1000*60*60, f = 1000*60,
        time = new Date().getTime(), jihe = time - times, arrleng,
        lengs = ["年前", "个月前", "天前", "小时前", "分钟前"],
        leng = [n ,y ,r ,s ,f] ;
        
        for(var l=0; l<leng.length; l++){
            if(jihe <= 60000){
                return "刚刚";
            }else{
                if(jihe > leng[l]){
                    return Math.floor(jihe/leng[l])+" "+lengs[l];
                }
            }
        }
    };

//获取年月日时分
    function times(times) {
        var time = new Date(times * 1),
            r = time.getDate() < 10 ? "0" + time.getDate() : time.getDate(),
            y = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1,
            n = time.getFullYear();
            s = time.getHours() < 10 ? "0" + time.getHours() : time.getHours(),
            f = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes(),
            m = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        return n + "-" +y + "-" + r + " / " + s + ":" + f;
    };

//	上广告
    function advertising(advertisin){	
		publicAjax("getAllSatAdvertisingByPage", {'site': 0,'page': 0,'limit': 10}, function(data) {
			var guangg = "";
			for(var s=0; s<data.content.length; s++){
				guangg += `<a href="${data.content[s].linkUrl}" class="silder-main-img"><img src="${data.content[s].imgUrl}" alt=""></a>`;
			};						
			advertisin.html(guangg);
			$(function (){
				$(".js-silder").silder({
					auto: true,//自动播放，传入任何可以转化为true的值都会自动轮播
					speed: 20,//轮播图运动速度
					sideCtrl: true,//是否需要侧边控制按钮
					bottomCtrl: false,//是否需要底部控制按钮
					defaultView: 0,//默认显示的索引
					interval: 3000,//自动轮播的时间，以毫秒为单位，默认3000毫秒
					activeClass: "active",//小的控制按钮激活的样式，不包括作用两边，默认active
				});
			});
		},1)
	};

//	右广告
	function rightAdvertising(advertisin){	
		publicAjax('getAllSatAdvertisingByPage', {'site': 1,'page': 0,'limit': 10}, function(data) {
			var htnll = "";			
			for(let p = 0; p < data.content.length; p++) {
				htnll += `<a href="${data.content[p].linkUrl}">
							<img style="width: 100%;height: 150px;margin-bottom: 2px;" src="${data.content[p].imgUrl}" />
						</a>`
			};
			advertisin.html(htnll);
		},1);
	};

//网址收藏
	function addBookmark(url, title) {
		if(!url) {
			url = window.location
		}
		if(!title) {
			title = document.title
		}
		var browser = navigator.userAgent.toLowerCase();
		if(window.sidebar) { // Mozilla, Firefox, Netscape
			window.sidebar.addPanel(title, url, "");
		} else if(window.external) { // IE or chrome
			if(browser.indexOf('chrome') == -1) { // ie
				window.external.AddFavorite(url, title);
			} else { // chrome
				alert('请按ctrl+D（或mac的命令+D）将此页面添加到书签中');
			}
		} else if(window.opera && window.print) { // Opera - automatically adds to sidebar if rel=sidebar in the tag
			return true;
		} else if(browser.indexOf('konqueror') != -1) { // Konqueror
			alert('请按ctrl+b将此页加入书签。');
		} else if(browser.indexOf('webkit') != -1) { // safari
			alert('请按ctrl+b（或mac的命令+D）将此页加入书签。');
		} else {
			alert('您的浏览器不能使用这个链接添加书签。请手动添加这个链接。')
		}
	};
	