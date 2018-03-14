function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function formViewTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Fblocks\u002Fform\u002Fform-view.pug":"form(enctype = \"multipart\u002Fform-data\")\n    h1 #{caption}\n    - for (let field of fields) {\n        label(for = field[0] ) #{field[0]} :\n        input(\n        name = field[0]\n        type = field[1])\n        br\n    - }\n    .errors\n    .button #{buttonCaption}\n"};
;var locals_for_with = (locals || {});(function (buttonCaption, caption, fields) {;pug_debug_line = 1;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Cform enctype=\"multipart\u002Fform-data\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = caption) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
for (let field of fields) {
{
;pug_debug_line = 4;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Clabel" + (pug_attr("for", field[0], true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = field[0]) ? "" : pug_interp));
;pug_debug_line = 4;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + " :\u003C\u002Flabel\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attr("name", field[0], true, false)+pug_attr("type", field[1], true, false)) + "\u002F\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Cbr\u002F\u003E";
}
;pug_debug_line = 9;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
}
;pug_debug_line = 10;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"errors\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"button\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Fblocks\u002Fform\u002Fform-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = buttonCaption) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";}.call(this,"buttonCaption" in locals_for_with?locals_for_with.buttonCaption:typeof buttonCaption!=="undefined"?buttonCaption:undefined,"caption" in locals_for_with?locals_for_with.caption:typeof caption!=="undefined"?caption:undefined,"fields" in locals_for_with?locals_for_with.fields:typeof fields!=="undefined"?fields:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}