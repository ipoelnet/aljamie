var app_main_;

$(function () {
	$.fn.app_main = function(opt){
		var opt= $.extend({
		},opt),
		that		= this,
		root		= $(that),
		app			= root.find('#app'),
		ServerLib	= 'http://app.daruttaqwa.or.id/lib/mjp/',
		delayTimerFilter;
		let ids=_readString('IDS') || 0,
			token=_readString('t') || 0,
			isLogin='T',
			urlServer=_readString('urlServer') || 0;
		var loginFile=_readFile("login_v3");
		if (typeof loginFile !== 'undefined' && loginFile!==''){
			loginFile=JSON.parse(loginFile);
			var datax=CryptoJS.AES.decrypt(loginFile, Token(), {
							format: CryptoJSAesJson
						}).toString(CryptoJS.enc.Utf8);
			var t=JSON.parse(JSON.parse(datax));
				if(t.success){
					isLogin='Y';
				};
		};
		/* _msgToast(loginFile); */
		$('body').addClass('close_app');
		app.empty();
		
		if(isLogin=='Y'){
			uiLoad.load(['themes/plugins/simplepicker/simplepicker.js','themes/plugins/simplepicker/simplepicker.css']);
			uiLoad.load(ServerLib+'homelist.js').then(function () {
				app.htmlLoadAppend({
					url : ServerLib+'html/homelist.php',
					success:function(data){
						$('#content').homelist();
					}
				});
			});
			
		}else{
			uiLoad.load(ServerLib+'login.js').then(function () {
				app.htmlLoadAppend({
					url : ServerLib+'html/login.php',
					success:function(data){
						$('#login-form').login();
					}
				});
			});
		};
	};
});
