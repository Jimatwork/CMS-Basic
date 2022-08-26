setInterval("showTime()", "3000");

function showTime() {
	var num = sessionStorage.getItem("menus");
	if(num == 1) {
		getcol();
		sessionStorage.setItem("menus", '');
	} else if (num == 2) {
		getCols(0);
		getCols(1);
		getCols(2);
		sessionStorage.setItem("menus", '');
	}
}

$(document).ready(function() {

	getcol();
	getCols(0);
	getCols(1);
	getCols(2);
	$('body').on('click', '.headline', function() {
		var rname = $(this).children('a').text(); // 一级栏目的名称
		sessionStorage.setItem("ton", $(this).children('p').text()); // 一级栏目的id
		sessionStorage.setItem("ton1", $(this).children('span').text()); // 栏目链接
		sessionStorage.setItem("conte", rname);
		sessionStorage.setItem("search", "");
		sessionStorage.setItem("qery", "");
	})
	$('#quit_sys').click(function() {

		if(confirm('确定退出吗？')) {
			sessionStorage.setItem("uname_login", ""); // 把用户信息设为空
			sessionStorage.setItem("uname_loginout", 1); // 退出登录的时候的验证信息
			$.ajax({
				type: "post",
				url: getRequestIp() + "loginout",
				async: true,
				data: {},
				dataType: "json",
				success: function(data) {
					if(data.success) {
						alert('退出成功！');
					}
				}
			});
		}
	});

	var userName = sessionStorage.getItem('uname_login');
	if(userName == '' || userName == undefined || userName == null) {
		$('.system_log').css('display', 'none');
		sessionStorage.setItem("uname_loginout", 1); // 退出登录的时候的验证信息
		alert('请登录！');
	} else if(userName != 'admin') {
		$('.system_log').css('display', 'none');
		$('#vip_user').css('display', 'block');
		$('#vip_user2').css('display', 'block');
	}
});

// 获取前言和活动和视频的栏目
function getCols(tag) {
	$('#qy_dl .headline').remove();
	$('#hd_dl .headline').remove();
	$('#sp_dl .headline').remove();
	$.ajax({
		type: "post",
		url: getRequestIp1() + "getColumn",
		async: true,
		data: {
			'tag': tag
		},
		dataType: 'json',
		success: function(data) {
			var item1 = '';
			var item2 = '';
			var item3 = '';
			$.each(data.list, function(i, result) {
				if(result.colName == '关注') {
					return;
				}
				if(tag == 0) {
					item1 += '<dd class="headline">'
					item1 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
					item1 += '<a class="cks" href="foreword.html" target="main">' + result.colName + '</a>'
					item1 += '<img class="icon5" src="img/coin21.png" />'
					item1 += '<p style="display: none;">' + result.id + '</p>'
					item1 += '<span style="display: none;">' + result.colLink + '</span>'
					item1 += '</dd>';
				}

				if(tag == 1) {
					item2 += '<dd class="headline">'
					item2 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
					item2 += '<a class="cks" href="dynamic.html" target="main">' + result.colName + '</a>'
					item2 += '<img class="icon5" src="img/coin21.png" />'
					item2 += '<p style="display: none;">' + result.id + '</p>'
					item2 += '<span style="display: none;">' + result.colLink + '</span>'
					item2 += '</dd>';
				}
				
				if(tag == 2) {
					item3 += '<dd class="headline">'
					item3 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
					item3 += '<a class="cks" href="video.html" target="main">' + result.colName + '</a>'
					item3 += '<img class="icon5" src="img/coin21.png" />'
					item3 += '<p style="display: none;">' + result.id + '</p>'
					item3 += '<span style="display: none;">' + result.colLink + '</span>'
					item3 += '</dd>';
				}

			});
			if(tag == 1) { // 是活动的
				$('#hd_dl').append(item2);
			} else if(tag == 0) { // 是前言的
				$('#qy_dl').append(item1);
			} else if (tag == 2) { //是视频的
				$('#sp_dl').append(item3);
			}

		}
	});
}

// 获取头条 热门 发现的栏目
function getcol() {
	$('#headline_dl .headline').remove();
	$('#hot_dl .headline').remove();
	$('#find_dl .headline').remove();
	$('#vip_user .headline').remove();
	$.ajax({
		type: "post",
		url: getRequestIp() + "getAllColumns",
		async: true,
		data: {},
		dataType: "json",
		success: function(data) {
			var item1 = '';
			var item2 = '';
			var item3 = '';
			var item4 = '';
			$.each(data.list, function(i, result) {
				if(result.colName == '关注') {
					return;
				}
				item1 += '<dd class="headline">'
				item1 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
				item1 += '<a class="cks" href="tab.html" target="main">' + result.colName + '</a>'
				item1 += '<img class="icon5" src="img/coin21.png" />'
				item1 += '<p style="display: none;">' + result.id + '</p>'
				item1 += '<span style="display: none;">' + result.colLink + '</span>'
				item1 += '</dd>';

				item2 += '<dd class="headline">'
				item2 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
				item2 += '<a class="cks" href="hot.html" target="main">' + result.colName + '</a>'
				item2 += '<img class="icon5" src="img/coin21.png" />'
				item2 += '<p style="display: none;">' + result.id + '</p>'
				item2 += '<span style="display: none;">' + result.colLink + '</span>'
				item2 += '</dd>';

				item3 += '<dd class="headline">'
				item3 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
				item3 += '<a class="cks" href="find.html" target="main">' + result.colName + '</a>'
				item3 += '<img class="icon5" src="img/coin21.png" />'
				item3 += '<p style="display: none;">' + result.id + '</p>'
				item3 += '<span style="display: none;">' + result.colLink + '</span>'
				item3 += '</dd>';

				item4 += '<dd class="headline">'
				item4 += '<img class="coin11" src="img/coin111.png" /><img class="coin22" src="img/coin222.png" />'
				item4 += '<a class="cks" href="myEssay.html" target="main">' + result.colName + '</a>'
				item4 += '<img class="icon5" src="img/coin21.png" />'
				item4 += '<p style="display: none;">' + result.id + '</p>'
				item4 += '<span style="display: none;">' + result.colLink + '</span>'
				item4 += '</dd>';
			});
			$('#headline_dl').append(item1);
			$('#hot_dl').append(item2);
			$('#find_dl').append(item3);
			$('#vip_user').append(item4);
		}
	});
}