function pug_escape(e) {
    var a = '' + e, t = pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = '';
    for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {
            case 34:
                n = '&quot;';
                break;
            case 38:
                n = '&amp;';
                break;
            case 60:
                n = '&lt;';
                break;
            case 62:
                n = '&gt;';
                break;
            default:
                continue;
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }
    return c !== r ? s + a.substring(c, r) : s;
}

var pug_match_html = /["&<>]/;

function pug_rethrow(n, e, r, t) {
    if (!(n instanceof Error)) throw n;
    if (!('undefined' == typeof window && e || t)) throw n.message += ' on line ' + r, n;
    try {
        t = t || require('fs').readFileSync(e, 'utf8');
    } catch (e) {
        pug_rethrow(n, null, r);
    }
    var i = 3, a = t.split('\n'), o = Math.max(r - i, 0), h = Math.min(a.length, r + i),
        ii = a.slice(o, h).map(function (n, e) {
            var t = e + o + 1;
            return (t == r ? '  > ' : '    ') + t + '| ' + n;
        }).join('\n');
    throw n.path = e, n.message = (e || 'Pug') + ':' + r + '\n' + ii + '\n\n' + n.message, n;
}

function menuTemplate(locals) {
    var pug_html = '', pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        var pug_debug_sources = {'public\u002Fblocks\u002Fmenu\u002Fmenu.pug': '.menu\n    .authorized\n        .button Play as #{username}\n        .button.button-half.button-settings Settings\n        .button.button-half.button-last Log out\n    .unauthorized\n        .button Play as guest\n        .button.button-half.button-login Log in\n        .button.button-half.button-register Register\n    .common-menu\n        .button Play singleplayer\n        .button.button-leaderboard Leaderboard'};
        var locals_for_with = (locals || {});
        (function (username) {
            pug_debug_line = 1;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="menu"\u003E';
            pug_debug_line = 2;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="authorized"\u003E';
            pug_debug_line = 3;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button"\u003E';
            pug_debug_line = 3;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Play as ';
            pug_debug_line = 3;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + (pug_escape(null == (pug_interp = username) ? '' : pug_interp)) + '\u003C\u002Fdiv\u003E';
            pug_debug_line = 4;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button button-half button-settings"\u003E';
            pug_debug_line = 4;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Settings\u003C\u002Fdiv\u003E';
            pug_debug_line = 5;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button button-half button-last"\u003E';
            pug_debug_line = 5;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Log out\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E';
            pug_debug_line = 6;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="unauthorized"\u003E';
            pug_debug_line = 7;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button"\u003E';
            pug_debug_line = 7;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Play as guest\u003C\u002Fdiv\u003E';
            pug_debug_line = 8;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button button-half button-login"\u003E';
            pug_debug_line = 8;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Log in\u003C\u002Fdiv\u003E';
            pug_debug_line = 9;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button button-half button-register"\u003E';
            pug_debug_line = 9;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Register\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E';
            pug_debug_line = 10;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="common-menu"\u003E';
            pug_debug_line = 11;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button"\u003E';
            pug_debug_line = 11;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Play singleplayer\u003C\u002Fdiv\u003E';
            pug_debug_line = 12;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + '\u003Cdiv class="button button-leaderboard"\u003E';
            pug_debug_line = 12;
            pug_debug_filename = 'public\u002Fblocks\u002Fmenu\u002Fmenu.pug';
            pug_html = pug_html + 'Leaderboard\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E';
        }.call(this, 'username' in locals_for_with ? locals_for_with.username : typeof username !== 'undefined' ? username : undefined));
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }

    return pug_html;
}