$(document).ready(function() {
	$('#push_asd').click(function() {
		var server_path = $('#server_address').val();
		$.ajax({
			type : "post",
			url : getRequestIp() + "setServerPath",
			async : true,
			data : {
				'server_path' : server_path
			},
			dataType : "json",
			success : function(data) {
				if (data.serverPath.length > 0) {
					alert('设置成功!');
				}
			}
		});
	});
});