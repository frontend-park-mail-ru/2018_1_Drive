function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function gridViewTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug":".black-background\n.header\n    .logo-section\n        .logo-section__logo LOGO\n    .free-section\n    .profile-section\n.main-block\n    .menu.white-background\n"};
;pug_debug_line = 1;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"black-background\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"header\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"logo-section\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"logo-section__logo\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "LOGO\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"free-section\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-section\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"main-block\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Fjs\u002Fviews\u002FGridView\u002Fgrid-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"menu white-background\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}