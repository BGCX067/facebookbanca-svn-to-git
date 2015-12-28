function ReadyFunction() {
	alert("All ready, i am ready function ");
	//            jwplayer('mediaspace').setup({
	//                'flashplayer': 'http://facebookbanca.googlecode.com/svn/trunk/player.swf',
	//                'file': 'http://blip.tv/file/get/Mhdphim-intro635.mp4',
	//                image: "http://facebookbanca.googlecode.com/svn/trunk/mhdLogo.png",
	//                title: "0 - 16 parts",
	//                repeat: "list",
	//                'width': '910',
	//                'height': '360',
	//                'playlist.position': "right",
	//                'playlist.size': 270
	//            });

	// Add Server List Button
	if (LinkCounter('.TXLink') > 0) {
		var htmlAdded = $('#serverButtonDiv').html() + '<input id="TX SERVER" type="button" value="TX SERVER" style="width: 150px; height: 40px;" onclick="Redirect(\'?server=TX\')" />';
		$('#serverButtonDiv').html(htmlAdded);
	}

	if (LinkCounter('.MinusLink') > 0) {
		var htmlAdded = $('#serverButtonDiv').html() + '<input id="Minus SERVER" type="button" value="Minus SERVER" style="width: 150px; height: 40px;" onclick="Redirect(\'?server=Minus\')" />';
		$('#serverButtonDiv').html(htmlAdded);
	}

	if ('@ViewBag.Server' == '') {
		if (LinkCounter('.TXLink') > 0) {
			TxScanner();
			CurrentServer = "TX";
		}
		else if (LinkCounter('.MinusLink') > 0) {
			MiScanner();
			currentServer = "Minus";
		}
	}
	else if ('@ViewBag.Server' == "TX") {
		TxScanner();
	}
	else if ('@ViewBag.Server' = "Minus") {
		MiScanner();
	}
}

function setUpPlayler() {
	jwplayer('mediaspace').setup({
		'flashplayer': 'http://facebookbanca.googlecode.com/svn/trunk/player.swf',
		'file': 'http://video2.truongxua.vn/video/12501/12501638/video/201207/29/12501638_61050_NDPLcGZ.mp4',
		image: "http://facebookbanca.googlecode.com/svn/trunk/mhdLogo.png",
		title: "0 - 16 parts",
		repeat: "list",
		'width': '910',
		'height': '360',
		'playlist.position': "right",
		'playlist.size': 270
	});
}

function TxScanner() {
	$('.TXLink').each(function () {
		var Link = $(this).attr('value');
		var LinkName = $(this).attr('name');
		//                                $.get(Link, function (res) {
		//                                    var htmlText = res.responseText;
		//                                    var index = htmlText.indexOf("'url':'");
		//                                    index = index + 7;
		//                                    var EndLink = htmlText.substr(index, htmlText.length - index - 3).indexOf("'");
		//                                    var FinalLink = htmlText.substr(index, EndLink);
		//                                    $(this).html(FinalLink);
		//                                    $(".TXLink").html(FinalLink);
		//                                    addVideo(FinalLink, 'http://facebookbanca.googlecode.com/svn/trunk/mhdLogo.png', LinkName);
		//                                    //alert("Sync Step by step " + LinkName);
		//                                });

		
		$.ajax({
			url: Link,
			type: 'GET',
			success: function (res) {
				if (!Check1Part(LinkName)) {
					//alert("Sot Link - From Check 1 Part");
					var FinalLink = TXAddToPlaylist(res);
					addVideo(FinalLink, 'http://facebookbanca.googlecode.com/svn/trunk/mhdLogo.png', LinkName);
				}
			}
		})


	});

}

function TXAddToPlaylist(res) {
	var htmlText = res.responseText;
	var index = htmlText.indexOf("'url':'");
	index = index + 7;
	var EndLink = htmlText.substr(index, htmlText.length - index - 3).indexOf("'");
	var FinalLink = htmlText.substr(index, EndLink);
	return FinalLink;
}

function Check1Part(LinkName) {
	var playlist = jwplayer().getPlaylist();
	for (var i = 0; i < playlist.length; i++) {
		if (LinkName == playlist[i].title) {
			return true;
		}
	}

	return false;

}




function Checker(count) {
	var playlist = jwplayer().getPlaylist().length;

	if (count >= playlist || playlist == 1) {
		//alert("Thieu" + count + "  " + playlist);
		//window.location.href = window.location.href;
		return false;
	}
	return true;
}

function LinkCounter(LinkType) {
	var count = 0;
	$(LinkType).each(function () {
		count++;
	});

	return count;
}

function addVideo(videoUrl, videoThumb, videoTitle) {
	//alert("WHY YOU NO CALL ME");
	var playlist = jwplayer().getPlaylist();
	var newItem = {
		file: videoUrl,
		image: videoThumb,
		title: videoTitle
	};
	playlist.push(newItem);

	playlist.sort(function (a, b) {
		a = a.title.toLowerCase();
		b = b.title.toLowerCase();
		if (a < b) {
			return -1
		} else if (a > b) {
			return 1
		} else {
			return 0
		}
	});

	jwplayer().load(playlist);
}

function ClearPlayList() {
	var Playlist = jwplayer().getPlaylist();
	while (Playlist.length > 0) {
		Playlist.pop();
	}
	jwplayer().load(Playlist);
}