(function($){
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
	tionId = $.getUrlParam('id');  //文章id
	
	ls = $.getUrlParam('ls');	  		//右边值
	
	skipId = $.getUrlParam('skipId');
	
	publicAjax('getPageImg', "" ,function(data){
		$('#login_imgs').attr("src", data.detailPageImg);
	},1);
	
	var leID = sessionStorage.getItem('leID');
	

//数据请求
	skipId = skipId.replace("'","");
	skipId = skipId.replace("'","");
	console.log(skipId);
	tionId = tionId.replace("'","");
	tionId = tionId.replace("'","");	
	if(ls !== null){		
		publicAjax("getSatConById", {"id" : tionId, "appUserId" : ""}, function(data) {
				if(data.success){
					showData(data);
				}
			},1)
	}else{
		if(skipId > 1 && skipId < 4 && leID == 1){
			publicAjax("getColContentById", {"id" : tionId, "appUserId" : ""}, function(data) {
				if(data.success){
					showData(data);
				}
			})
		}else{
			publicAjax("getSatConById", {"id" : tionId, "appUserId" : ""}, function(data) {
				if(data.success){
					showData(data);
				}
			},1)
		}
	};

//展示数据
	function showData(data){
		var datas = data.list[0];
		var tests = sessionStorage.getItem('tests'), colNames;
		var s = datas.colName;
		if(tests == "" || tests == null){
			colNames = datas.colName;
		}else{
			colNames = tests+" "+s.substr(3, 5);
		};
		//console.log("HTML~~~~~~~~~~~"+datas.conHtml)
		$('title').html(datas.conTitle);
		$('.t-h1').html(datas.conTitle);
		$('.userName').html(datas.userName);
		$('.article-time').html(times(datas.createDate));
//		$('.article-share').html("阅读  "+datas.playCount);
		$('.article-pl').html("评论  "+datas.exaCount);
		$('.column-link').html(colNames);
		$('.article-imgs').attr('src', datas.conImg);
		$('.article-imgs').attr('alt', datas.conTitle);
		$('.active_html').html(datas.conHtml);
		$('.num').html(datas.praiseCount);                   //点赞
		
//		右边
		$('.author_face_img').attr('src', datas.userImg);
		$('.author_name_a').html(datas.userName);
		
		//全局变量，动态的文章ID
        var ShareURL = "";
        //绑定所有分享按钮所在A标签的鼠标移入事件，从而获取动态ID
        $(function () {
            $(".bdsharebuttonbox a").mouseover(function () {
                ShareURL = $(this).attr("data-url");
            });
        });

        /* 
        * 动态设置百度分享URL的函数,具体参数
        * cmd为分享目标id,此id指的是插件中分析按钮的ID
        *，我们自己的文章ID要通过全局变量获取
        * config为当前设置，返回值为更新后的设置。
        */
        function SetShareUrl(cmd, config) {            
            if (ShareURL) {
                config.bdUrl = ShareURL;    
            }
            return config;
        }
				
//				bdText : '自定义分享内容',	
//				bdDesc : '自定义分享摘要',	
//				bdUrl : '自定义分享url地址', 	
//				bdPic : '自定义分享图片'
        //插件的配置部分，注意要记得设置onBeforeClick事件，主要用于获取动态的文章ID
        window._bd_share_config = {
        	"common": {
        		onBeforeClick: SetShareUrl,
        		"bdSnsKey": {},
        		"bdText": "",
        		"bdMini": "2",
        		"bdMiniList": false,
        		"bdPic": datas.conImg,
        		"bdStyle": "0",
        		"bdSize": "24"
        	},
        	"share": {}
        };//插件的JS加载部分
        with (document) 0[(getElementsByTagName('head')[0] || body)
            .appendChild(createElement('script'))
            .src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
            + ~(-new Date() / 36e5)];
	};


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
})($)
