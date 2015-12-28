
function isNotEmpty(str) {
 return !((str == undefined) || (str == ''));
}


function ShowLMCButton(cliptext, capt, js, furl)
{
 var params = 'txt=' + encodeURIComponent(cliptext);
 if (!isNotEmpty(furl)) { furl = "../../Scripts/lmcbutton.swf"; }
 if (isNotEmpty(capt)) { params += '&capt=' + capt; }
 if (isNotEmpty(js)) { params += '&js=' + js; }
 
document.write('<object width="40" height="20">');
document.write(' <param name="movie" value="' + furl + '">');
document.write(' <PARAM NAME=FlashVars VALUE="' + params + '">');
document.write(' <embed src="' + furl + '" flashvars="' + params + '"  width="40" height="20"></embed>');
document.write('</object>');

}
