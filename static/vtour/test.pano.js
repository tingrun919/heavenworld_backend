//更新祈福位置
function update_comm_ele(p1, p2) {
	$("#comment-athv").attr("data-ath", p1).attr("data-atv", p2)
}

var comment_list = new Array();

//获取某scene下的所有祈福
// function getComment() {
// 	var prayId = window.location.pathname
// 	prayId = prayId.substr(prayId.length - 1, 1)
// 	var krpano = document.getElementById('krpanoSWFObject');
// 	//取得当前scene
// 	var s = krpano.get("scene[get(xml.scene)].name");
// 	//ajax开始=======================================
// 	$.ajax({
// 		type: "get",
// 		url: 'http://39.107.78.100:8080/banaworld_show/nopano/selListPray',
// 		dataType: "json",
// 		data: { panoid: prayId, scenename: s, ifredian: 1 },
// 		success: function (data) {
// 			comment_list = data.data;
// 			var data = data.data
// 			var imgList = [
// 				{ name: 'hotspot_4', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot1.png?2.2.7' },
// 				{ name: 'hotspot_5', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot2.png?2.2.7' },
// 				{ name: 'hotspot_6', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot3.png?2.2.7' },
// 				{ name: 'hotspot_7', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot4.png?2.2.7' },
// 				{ name: 'hotspot_8', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot5.png?2.2.7' },
// 				{ name: 'hotspot_9', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot6.png?2.2.7' },
// 				{ name: 'hotspot_10', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot7.png?2.2.7' },
// 				{ name: 'hotspot_11', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot8.png?2.2.7' },
// 				{ name: 'hotspot_12', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot9.png?2.2.7' },
// 				{ name: 'hotspot_13', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot10.png?2.2.7' },
// 				{ name: 'hotspot_14', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot11.png?2.2.7' },
// 				{ name: 'hotspot_15', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot12.png?2.2.7' },
// 				{ name: 'hotspot_16', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot13.png?2.2.7' },
// 				{ name: 'hotspot_17', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot14.png?2.2.7' },
// 				{ name: 'hotspot_18', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot15.png?2.2.7' },
// 				{ name: 'hotspot_19', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot16.png?2.2.7' },
// 				{ name: 'hotspot_20', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot17.png?2.2.7' },
// 				{ name: 'hotspot_21', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot18.png?2.2.7' },
// 				{ name: 'hotspot_22', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot19.png?2.2.7' },
// 				{ name: 'hotspot_23', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spotd1_gif.png?2.2.7' },
// 				{ name: 'hotspot_24', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spotd2_gif.png?2.2.7' },
// 				{ name: 'hotspot_25', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spotd3_gif.png?2.2.7' },
// 				{ name: 'hotspot_26', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spotd4_gif.png?2.2.7' },
// 				{ name: 'hotspot_27', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spotd5_gif.png?2.2.7' },
// 				{ name: 'hotspot_28', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_link.png?2.2.7' },
// 				{ name: 'hotspot_29', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_gallery.png?2.2.7' },
// 				{ name: 'hotspot_30', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_video.png?2.2.7' },
// 				{ name: 'hotspot_31', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_txt.png?2.2.7' },
// 				{ name: 'hotspot_32', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_music.png?2.2.7' },
// 				{ name: 'hotspot_33', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd1_gif.png?2.2.7' },
// 				{ name: 'hotspot_34', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd2_gif.png?2.2.7' },
// 				{ name: 'hotspot_35', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd3_gif.png?2.2.7' },
// 				{ name: 'hotspot_36', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd4_gif.png?2.2.7' },
// 				{ name: 'hotspot_37', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd5_gif.png?2.2.7' },
// 				{ name: 'hotspot_38', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd6_gif.png?2.2.7' },
// 				{ name: 'hotspot_39', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd7_gif.png?2.2.7' },
// 				{ name: 'hotspot_40', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd8_gif.png?2.2.7' },
// 				{ name: 'hotspot_41', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd9_gif.png?2.2.7' },
// 				{ name: 'hotspot_42', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd10_gif.png?2.2.7' },
// 				{ name: 'hotspot_43', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd11_gif.png?2.2.7' },
// 				{ name: 'hotspot_44', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd12_gif.png?2.2.7' },
// 				{ name: 'hotspot_45', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd1.png?2.2.7' },
// 				{ name: 'hotspot_46', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd2.png?2.2.7' },
// 				{ name: 'hotspot_47', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd3.png?2.2.7' },
// 				{ name: 'hotspot_48', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd4.png?2.2.7' },
// 				{ name: 'hotspot_49', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd5.png?2.2.7' },
// 				{ name: 'hotspot_50', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd6.png?2.2.7' },
// 				{ name: 'hotspot_51', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd7.png?2.2.7' },
// 				{ name: 'hotspot_52', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd8.png?2.2.7' },
// 				{ name: 'hotspot_53', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd9.png?2.2.7' },
// 				{ name: 'hotspot_54', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd10.png?2.2.7' },
// 				{ name: 'hotspot_55', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd11.png?2.2.7' },
// 				{ name: 'hotspot_56', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd12.png?2.2.7' },
// 				{ name: 'hotspot_57', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot20.png?2.2.7' },
// 				{ name: 'hotspot_58', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot21.png?2.2.7' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd01_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd02_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd03_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd04_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd05_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd06_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd07_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd08_gif.png' },
// 				{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd09_gif.png' },
// 				{ name: 'new_spotd1', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd10_gif.png' },
// 				{ name: 'new_spotd1', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd11_gif.png' },

// 			]
// 			for (var i = 0; i < data.length; i++) {
// 				var commname = "userComm_" + data[i].prayId;
// 				var png = '';
// 				for (var j = 0; j < imgList.length; j++) {
// 					if (data[i].prayMainpic == imgList[j].name) {
// 						png = imgList[j].url
// 					}
// 				}
// 				krpano.call(//显示可拖动的评论热点
// 					"addhotspot(" + commname + ");" +
// 					"set(hotspot[" + commname + "].url," + png + ");" +
// 					"set(hotspot[" + commname + "].ath," + data[i].prayLongitude + ");" +
// 					"set(hotspot[" + commname + "].atv," + data[i].prayDimension + ");" +
// 					"set(hotspot[" + commname + "].edge,bottom);" +
// 					"set(hotspot[" + commname + "].zoom,false);" +
// 					"set(hotspot[" + commname + "].onclick,js(blessing_detail(" + data[i].prayId + ")));" 
// 				);
// 			}
// 		}
// 	});
// 	//ajax开始=======================================end
// }
function blessing_detail(prayId) {
	$("#blessingDetail").attr("data-prayid", prayId)
	$("#blessingBtn").trigger("click");
}

function switch_show_comment(arg) {
	var krpano = document.getElementById('krpanoSWFObject');
	if (arg == 'true') {
		for (var i = 0; i < comment_list.length; i++) {
			krpano.call("set(hotspot[userComm_" + comment_list[i].prayId + "].visible,true);");
		}
	} else {
		for (var i = 0; i < comment_list.length; i++) {
			krpano.call("set(hotspot[userComm_" + comment_list[i].prayId + "].visible,false);");
		}
	}
}

var arr = new Array()
var isplay = true

function getMusciList() {
	var audio = document.getElementById("audioMusic")
	if (audio.paused) {
		audio.currentTime = currenttime
		audio.play()
		isplay = true
	} else {
		audio.pause()
		isplay = false
		currenttime = audio.currentTime
	}
}

function getMusciListApi() {
	var prayId = window.location.pathname
	prayId = prayId.substr(prayId.length - 1, 1)
	var audio = document.getElementById("audioMusic")
	if (!audio) {
		$.ajax({
			type: "get",
			url: 'http://39.107.78.100:8080/banaworld_show/nopano/panoMusic',
			dataType: "json",
			data: { panoid: prayId },
			success: function (data) {
				for (var i = 0; i <= data.data.length; i++) {
					if (i == data.data.length) {
						playMusic()
					} else {
						arr.push(data.data[i].music_url)
					}
				}
			}
		});
	}

}

function playMusic() {
	var index = 0;
	var myAudio = new Audio();
	var currenttime = 0;
	myAudio.id = "audioMusic"
	myAudio.preload = true;
	// myAudio.controls = true;
	myAudio.src = arr[index];
	myAudio.addEventListener('ended', playEndedHandler, false);
	// myAudio.play();
	if (isplay) {
		myAudio.play()
	} else {
		// var krpano = document.getElementById('krpanoSWFObject');
		// var name = 'soundico'
		myAudio.pause();
		myAudio.currentTime = currenttime;
		// krpano.set('layer[soundico].crop;', "0|70|62|62");
	}

	document.getElementById("audioBox").appendChild(myAudio);
	myAudio.loop = false;
	function playEndedHandler() {
		index++
		if (index == arr.length) {
			index = 0
			$("#audioMusic").remove()
			getMusciListApi()
		}
		myAudio.src = arr[index];
		myAudio.play();
	}
}

function testaaa() {
	// var param = getQueryVariable("param")
	// if (param) {
	// 	var krpano = document.getElementById('krpanoSWFObject');
	// 	krpano.call('loadscene("' + param + '", null, MERGE,BLEND(0.5));');
	// } else {
	var krpano = document.getElementById('krpanoSWFObject');
	krpano.call('loadscene("get(startscene)", null, MERGE,BLEND(0.5));');
	// }
	// getMusciListApi();
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}