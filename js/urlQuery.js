/**
 *URL请求地址分析
 *query主导函数，返回结果对象；
 *结果对象有几个方法get、keys、remove、count
 */
(function(root, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(factory);
	} else {
		root.URL = factory();
	}
})(this, function() {
	var URL = {};
	URL.query = function(search) {
		var s = search || location.search,
			reg = /([?&])?([^=]+?)(?=(=|&|$))(([^&$]*))?/g,
			r = {},
			match = {},
			total = 0;
		var _remove = function(key) {
			delete r[key];
			total -= 1;
		};
		while (match = reg.exec(s)) {
			if (match[2].indexOf("?") !== -1) {
				match[2] = match[2].slice((match[2].indexOf("?") + 1))
			}
			var val = decodeURIComponent(match[4]).replace(/^=/, '');
			if (match[2].indexOf('[]') !== -1) {
				var k = match[2].replace('[]', '');
				if (typeof r[k] === 'undefined') {
					r[k] = [val];
					total += 1;
				} else {
					r[k].push(val);
				}
			} else {
				r[match[2]] = val;
				total += 1;
			}
		}
		return {
			get: function(key) {
				return r[key];
			},
			keys: function() {
				var keys = [];
				if ('keys' in Object) {
					keys = Object.keys(r);
				} else {
					for (var key in r) {
						keys.push(key);
					}
				}
				return keys;
			},
			remove: _remove,
			count: function() {
				return total;
			},
			getAll : function(){
				return r;
			}
		}
	};
	return URL;
})