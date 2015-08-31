(function(root, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(factory);
	} else {
		root.ajax = factory();
	}
})(this, function() {
	var defaultOpt = {
		method: 'get',
		url: '',
		data: null,
		type: 'text',
		done: function() {},
		fail: function() {}
	};

	var sConst = {
		mic: 'Microsoft.XMLHTTP',
		get: 'GET',
		post: 'POST',
		ct: 'content-Type',
		pH: 'application/x-www-form-urlencoded'
	};

	// 对象
	var ajax = {};
	// xhr 对象初始化
	ajax.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXOBject(sConst.mic);

	// 复制
	var extend = function(obj1, obj2) {
		for (var attr in obj2) {
			obj1[attr] = obj2[attr];
		}
	};
	// 常量
	var dataFormat = function(element) {
		var data ='';
		if (typeof element === 'object') { //有数据的请求
			for (var attr in element) {
				data += attr + '=' + element[attr] + '&';
			}
			return data.slice(0, data.length - 1);
		}
	};
	
	// =============================
	
	//url,
	//data 请求地址数据,
	//done
	ajax.get = function(element){
		var xhr = this.xhr;
		var opt = {
			url : '',
			data : null,
			done : function(){},
			fail : function(){}
		};
		extend(opt,element);
		if(opt.data){
			opt.url += '?' + dataFormat(opt.data);
		}
		xhr.open(sConst.get,opt.url,true);

		xhr.onreadystatechange = function(){
			var data;
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					data = xhr.responseText
					opt.done && opt.done(data)
				}else{
					opt.fail && opt.fail(xhr.status,data)
				}
			}
		};
		xhr.send(null);

	};
	//url,
	//data,
	//done,
	//fail
	ajax.post = function(element){
		var xhr = this.xhr;
		var opt = {
			url : '',
			data : null,
			done : function(){},
			fail : function(){}
		};
		extend(opt,element);
		if(!opt.data){
			return undefined;
		}
		xhr.open(sConst.post,opt.url,true);
		xhr.onreadystatechange = function(){
			var data;
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					data = xhr.responseText
					opt.done && opt.done(data)
				}else{
					opt.fail && opt.fail(xhr.status,data)
				}
			}
		};
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send(opt.data)
	};
	
	return ajax;
})