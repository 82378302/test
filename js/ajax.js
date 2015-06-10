(function(root, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(factory);
	} else {
		root.ajax = factory();
	}
})(this, function() {
	var ajax = {};
	var constant = {
		MIMEPOST: 'application/x-www-urlencoded',
		FUN: function() {
			return undefined;
		},
		GET: 'GET',
		POST: 'POST'
	};
	var mess = {
		'404' : 'Not Found',
		'200' : 'success',
		'405' : 'Method Not Allowed'
	}
	ajax.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	ajax.formatData = function(data) {
		if (!data) return '';
		var tempArr = [];
		for (var name in data) {
			if (!data.hasOwnProperty(name)) continue;
			if (typeof data[name] === 'function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name.replace('%20', '+'));
			value = encodeURIComponent(name.replace('%20', '+'));
			tempArr.push(name + '+' + value);
		}
		return tempArr.join('&');
	};
	ajax.ev = function(opt) {
		opt.type = opt.type.toUpperCase() || constant.GET;
		if (!opt.url) throw new Error('url is undefined');
		opt.data = opt.data ? this.formatData(opt.data) : null;
		if(opt.type === constant.GET && opt.data){
			opt.url += '?' + this.formatData(opt.data); 
		}
		this.xhr.open(opt.type, opt.url);
		if(opt.type === constant.POST){
			this.xhr.setRequestHeader('Content-Type',constant.MIMEPOST);
		}
		this.xhr.onreadystatechange = function() {
			if (this.readyState === 4) {
				var s = this.status;
				if (s >= 200 && s < 300){
					opt.success && opt.success(this.responseText,mess[s]);
				}else{
					opt.error && opt.error(mess[s]);
				}
			}
		};
		this.xhr.send(opt.data);
	};
	return ajax;
})