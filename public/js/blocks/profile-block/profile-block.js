function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function profileBlockTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug":"- if (authorized) {\n.profile-section__profile-authorized.material\n    .profile-photo\n        img.profile-img(src=\"..\u002F..\u002Fimg\u002Favatar.png\")\n    .profile-login\n        span.profile-login__first-letter #{firstLetter}\n        | #{otherLetters}\n- } else {\n.profile-section__profile-unauthorized.material\n    .profile-login__login\n        a(href=\"\u002Fsignin\") Log in\n    .profile-login__signup\n        a(href=\"\u002Fsignup\") Register\n-}"};
;var locals_for_with = (locals || {});(function (authorized, firstLetter, otherLetters) {;pug_debug_line = 1;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
if (authorized) {
;pug_debug_line = 2;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-section__profile-authorized material\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-photo\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cimg class=\"profile-img\" src=\"..\u002F..\u002Fimg\u002Favatar.png\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-login\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cspan class=\"profile-login__first-letter\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = firstLetter) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = otherLetters) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
} else {
;pug_debug_line = 9;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-section__profile-unauthorized material\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-login__login\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fsignin\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "Log in\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-login__signup\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fsignup\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
pug_html = pug_html + "Register\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "public\u002Fjs\u002Fblocks\u002Fprofile-block\u002Fprofile-block.pug";
}}.call(this,"authorized" in locals_for_with?locals_for_with.authorized:typeof authorized!=="undefined"?authorized:undefined,"firstLetter" in locals_for_with?locals_for_with.firstLetter:typeof firstLetter!=="undefined"?firstLetter:undefined,"otherLetters" in locals_for_with?locals_for_with.otherLetters:typeof otherLetters!=="undefined"?otherLetters:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}