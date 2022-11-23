function player(config){
    if ((navigator.userAgent.indexOf("MSIE") >= 0) || (navigator.userAgent.indexOf("Trident") >= 0)) {
        alert("本播放器在IE浏览器和兼容模式下无法播放，请将浏览器设置为 极速模式！");
    }
    if(config.url.indexOf(".m3u8")>0||config.url.indexOf(".mp4")>0||config.url.indexOf(".flv")>0||config.url.indexOf(".mkv")>0||config.url.indexOf("ixigua")>0){
        MPlayer(config.url,config.title,config.vkey,config.next,config.img);
    }else{
        $.ajaxSettings.timeout='30000'; 
    	$.post("api.php", {"url":config.url,"time":config.time,"key":config.key},
    	function(data) {
    		if(data.code=="200"){
    			MPlayer(data.url,config.title,config.vkey,config.next,config.img);
    		}else{
    			TheError();
    		}
    	},'json').error(function (xhr, status, info) {
            TheError();
        });
    }
}
function MPlayer(url,tittle,vkey,nexturl,image){
    $("#loading").remove();
    if(!nexturl){
        playcss(1);
    }else{
        playcss(2);
    }
    var playerConfig={
        container: '#mui-player',
	    themeColor: '#ff0000',
	    src: url,
	    title: tittle,
	    poster: image,
	    autoplay: true,
	    initFullFixed: true,
	    preload: 'auto',
	    autoOrientaion: true,
	    dragSpotShape: 'circula',
	    lang: 'zh-cn',
	    volume: '1',
	    videoAttribute:[
	        {attrKey:'webkit-playsinline',attrValue:'webkit-playsinline'},
	        {attrKey:'playsinline',attrValue:'playsinline'},
	        {attrKey:'x5-video-player-type',attrValue:'h5-page'},
	        ],
	    plugins: [
            new MuiPlayerDesktopPlugin({
                    leaveHiddenControls: true,
	                fullScaling: 1,
	            }),
	        new MuiPlayerMobilePlugin({
	                key:'01I01I01H01J01L01K01J01I01K01J01H01D01J01G01E',
	                showMenuButton: true,
	            })
	        ]
        };
    if(url.indexOf("m3u8")>0){
        playerConfig.parse= { 
            type:'hls',
	        loader:Hls,
	        config: {
	           debug:false,
	       },
	   };
	}else if(url.indexOf("flv")>0){
	    playerConfig.parse= { 
           type:'flv',
           loader:flvjs,
	        config: {
	           cors:true,
	        },
	   };
    }
    if(!!nexturl){
        playerConfig.custom={
            footerControls:[{
                slot:'nextMedia',
                position:'left',
                tooltip:'下一集',
                oftenShow:true,
                click:function(e) {
                    top.location.href=nexturl;
                },
            }]
        };
    }
    var mp = new MuiPlayer(playerConfig);
    mp.showToast('请勿相信视频中的广告，点左下角按钮播放视频');
    mp.on('ready',function(){
        var video = mp.video();
        var currentTime = localStorage.getItem(vkey);
        video.addEventListener("loadedmetadata",function(){
            this.currentTime = currentTime;
        });
        video.addEventListener("timeupdate",function(){
            var currentTime = Math.floor(video.currentTime);
            localStorage.setItem(vkey,currentTime);
        });
        video.addEventListener("ended",function(){
            localStorage.removeItem(vkey);
            if(!!nexturl){
                top.location.href=nexturl;
            }
        });
    });
}
function playcss(num){
    if(num==1){
        $("body").append("<div id=\"mui-player\" class=\"content\"></div>");
    }else{
        $("body").append("<div id=\"mui-player\" class=\"content\"><template slot=\"nextMedia\"><svg t=\"1584686776454\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1682\"><path d=\"M783.14692466 563.21664097L240.85307534 879.55472126c-39.1656664 24.10194914-90.38230866-6.02548665-90.38230865-51.21664226v-632.676158c0-45.19115433 51.21664097-75.31859011 90.38230865-51.21664226l542.29384932 316.33808029c39.1656664 21.08920518 39.1656664 81.34407804 0 102.43328194z\" p-id=\"1683\" fill=\"#ffffff\"></path><path d=\"M873.52923331 734.94302767c0 42.17841036-39.1656664 78.33133408-90.38230865 78.33133407s-90.38230866-36.15292371-90.38230735-78.33133407V289.05697233c0-42.17841036 39.1656664-78.33133408 90.38230735-78.33133407s90.38230866 36.15292371 90.38230865 78.33133407v445.88605534z\" p-id=\"1684\" fill=\"#ffffff\"></path></svg></template></div>");
    }
}
function TheError(){
    $("body").append('<div id=\"error\"><h1><font color="red">哦呀，解析失败了～</br>刷新重试或联系站长修复</font></br><a href="tencent://message/?uin=120241400" target="_blank"><font color="yellow">点击联系站长反馈</font></a></h1></div>');
	$("#loading").remove();
}
