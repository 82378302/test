(function(root, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(factory);
	} else {
		root.nav = factory();
	}
})(this, function() {
	var os = {},
		uA = navigator.userAgent,
		isVersion = eval("''+/*@cc_on" + " @_javascript_version@*/-0") * 1;
	if (!uA) {
		return 'undefined';
	}
	os.isIe = function() {
		return {
			ie: /*@cc_on!@*/ !1,
			ie9: isVersion === 5.9,
			ie8: isVersion === 5.8,
			ie7: isVersion === 5.7,
			ie6: isVersion === 5.6,
			ie5: isVersion === 5.5,
			ie10: window.navigator.msPointerEnabled,
			ie11: ('-ms-scroll-limit' in document.documentElement.style) || !!window.MSInputMethodContext
		}
	};
	
	os.isFireFox = function() {
		return firefox = !!window.updateCommands;
	};
	os.isChrome = function() {
		return /chrome/i.test(navigator.userAgent);
	};
	os.isSafari = function() {
		return safari = !!(navigator.vendor && navigator.vendor.match(/Apple/));
	};
	os.isAnd = function() {
		return !!uA.match(/(Android)[\s\/]+([\d\.]+)/);
	};
	os.isIos = function() {
		return !!uA.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/);
	};
	os.isWp = function() {
		return !!uA.match(/(Windows\s+Phone)\s([\d\.]+)/);
	};
	os.isWX = function() {
		return /MicroMessenger/i.test(uA);
	};
	os.isWB = function(){
		return /Weibo/i.test(uA);	
	};
	os.isPc = function(){
		return (!os.isAnd() && !os.isIos())
	}
	return os;
})