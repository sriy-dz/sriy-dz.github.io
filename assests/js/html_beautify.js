!function(){var t=function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){var i=n(2).mergeOpts,s=n(1),r=s.lineBreak,a=s.allLineBreaks;function h(t){return t.replace(/\s+$/g,"")}t.exports.Beautifier=function(t,e,n,s){var o,_,u,p,l,c,f,d,g,w,m,b,v,y,x,k,T,A,E,O,N;t=t||"",void 0!==(e=i(e=e||{},"html")).wrap_line_length&&0!==parseInt(e.wrap_line_length,10)||void 0===e.max_char||0===parseInt(e.max_char,10)||(e.wrap_line_length=e.max_char),_=void 0!==e.indent_inner_html&&e.indent_inner_html,u=void 0===e.indent_body_inner_html||e.indent_body_inner_html,p=void 0===e.indent_head_inner_html||e.indent_head_inner_html,l=void 0===e.indent_size?4:parseInt(e.indent_size,10),c=void 0===e.indent_char?" ":e.indent_char,d=void 0===e.brace_style?"collapse":e.brace_style,f=0===parseInt(e.wrap_line_length,10)?32786:parseInt(e.wrap_line_length||250,10),g=e.unformatted||["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","address","big","dt","ins","strike","tt"],w=e.content_unformatted||["pre"],m=void 0===e.preserve_newlines||e.preserve_newlines,b=m?isNaN(parseInt(e.max_preserve_newlines,10))?32786:parseInt(e.max_preserve_newlines,10):0,v=void 0!==e.indent_handlebars&&e.indent_handlebars,y=void 0===e.wrap_attributes?"auto":e.wrap_attributes,x=isNaN(parseInt(e.wrap_attributes_indent_size,10))?l:parseInt(e.wrap_attributes_indent_size,10),k="force"===y.substr(0,"force".length),T="force-expand-multiline"===y,A="force-aligned"===y,E=void 0!==e.end_with_newline&&e.end_with_newline,O="object"==typeof e.extra_liners&&e.extra_liners?e.extra_liners.concat():"string"==typeof e.extra_liners?e.extra_liners.split(","):"head,body,/html".split(","),N=e.eol?e.eol:"auto",e.indent_with_tabs&&(c="\t",l=1),"auto"===N&&(N="\n",t&&r.test(t||"")&&(N=t.match(r)[0])),N=N.replace(/\\r/,"\r").replace(/\\n/,"\n"),t=t.replace(a,"\n"),this.beautify=function(){for((o=new function(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=_,this.indent_body_inner_html=u,this.indent_head_inner_html=p,this.Utils={whitespace:"\n\r\t ".split(""),single_token:e.void_elements||["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","?php","basefont","isindex"],extra_liners:O,in_array:function(t,e){for(var n=0;n<e.length;n++)if(t===e[n])return!0;return!1}},this.is_whitespace=function(t){for(var e=0;e<t.length;e++)if(!this.Utils.in_array(t.charAt(e),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var t="";if(t=this.input.charAt(this.pos),this.Utils.in_array(t,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(t,this.Utils.whitespace);)m&&"\n"===t&&this.newlines<=b&&(this.newlines+=1),this.pos++,t=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(t){return this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,t),this.print_indentation(t),!0):(this.line_char_count++,t.push(" "),!1)},this.get_content=function(){for(var t="",e=[],n=0;"<"!==this.input.charAt(this.pos)||2===n;){if(this.pos>=this.input.length)return e.length?e.join(""):["","TK_EOF"];if(n<2&&this.traverse_whitespace())this.space_or_wrap(e);else{if(t=this.input.charAt(this.pos),v){if("{"===t?n+=1:n<2&&(n=0),"}"===t&&n>0&&0==n--)break;var i=this.input.substr(this.pos,3);if("{{#"===i||"{{/"===i)break;if("{{!"===i)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"===this.input.substr(this.pos,2)&&"{{else}}"===this.get_tag(!0))break}this.pos++,this.line_char_count++,e.push(t)}}return e.length?e.join(""):""},this.get_contents_to=function(t){if(this.pos===this.input.length)return["","TK_EOF"];var e="",n=new RegExp("</"+t+"\\s*>","igm");n.lastIndex=this.pos;var i=n.exec(this.input),s=i?i.index:this.input.length;return this.pos<s&&(e=this.input.substring(this.pos,s),this.pos=s),e},this.record_tag=function(t){this.tags[t+"count"]?(this.tags[t+"count"]++,this.tags[t+this.tags[t+"count"]]=this.indent_level):(this.tags[t+"count"]=1,this.tags[t+this.tags[t+"count"]]=this.indent_level),this.tags[t+this.tags[t+"count"]+"parent"]=this.tags.parent,this.tags.parent=t+this.tags[t+"count"]},this.retrieve_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!==e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]],this.tags.parent=this.tags[e+"parent"]),delete this.tags[t+this.tags[t+"count"]+"parent"],delete this.tags[t+this.tags[t+"count"]],1===this.tags[t+"count"]?delete this.tags[t+"count"]:this.tags[t+"count"]--}},this.indent_to_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!==e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]])}},this.get_tag=function(t){var e,n,i,s="",r=[],a="",h=!1,o=!0,_=!1,u=this.pos,p=this.line_char_count,l=!1;t=void 0!==t&&t;do{if(this.pos>=this.input.length)return t&&(this.pos=u,this.line_char_count=p),r.length?r.join(""):["","TK_EOF"];if(s=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(s,this.Utils.whitespace))h=!0;else{if("'"!==s&&'"'!==s||(s+=this.get_unformatted(s),h=!0),"="===s&&(h=!1),i=this.input.substr(this.pos-1),!T||!_||l||">"!==s&&"/"!==s||i.match(/^\/?\s*>/)&&(h=!1,l=!0,this.print_newline(!1,r),this.print_indentation(r)),r.length&&"="!==r[r.length-1]&&">"!==s&&h){var c=this.space_or_wrap(r)&&"/"!==s&&!k;if(h=!1,k&&"/"!==s){var f=!1;T&&o&&(f=!(null!==i.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/))),o&&!f||(this.print_newline(!1,r),this.print_indentation(r),c=!0)}if(c){_=!0;var d=x;A&&(d=r.indexOf(" ")+1);for(var m=0;m<d;m++)r.push(" ")}if(o)for(var b=0;b<r.length;b++)if(" "===r[b]){o=!1;break}}if(v&&"<"===n&&s+this.input.charAt(this.pos)==="{{"&&(s+=this.get_unformatted("}}"),r.length&&" "!==r[r.length-1]&&"<"!==r[r.length-1]&&(s=" "+s),h=!0),"<"!==s||n||(e=this.pos-1,n="<"),v&&!n&&r.length>=2&&"{"===r[r.length-1]&&"{"===r[r.length-2]&&(e="#"===s||"/"===s||"!"===s?this.pos-3:this.pos-2,n="{"),this.line_char_count++,r.push(s),r[1]&&("!"===r[1]||"?"===r[1]||"%"===r[1])){r=[this.get_comment(e)];break}if(v&&r[1]&&"{"===r[1]&&r[2]&&"!"===r[2]){r=[this.get_comment(e)];break}if(v&&"{"===n&&r.length>2&&"}"===r[r.length-2]&&"}"===r[r.length-1])break}}while(">"!==s);var y,E,O=r.join("");y=-1!==O.indexOf(" ")?O.indexOf(" "):-1!==O.indexOf("\n")?O.indexOf("\n"):"{"===O.charAt(0)?O.indexOf("}"):O.indexOf(">"),E="<"!==O.charAt(0)&&v?"#"===O.charAt(2)?3:2:1;var N=O.substring(E,y).toLowerCase();return"/"===O.charAt(O.length-2)||this.Utils.in_array(N,this.Utils.single_token)?t||(this.tag_type="SINGLE"):v&&"{"===O.charAt(0)&&"else"===N?t||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(N,g)||this.is_unformatted(N,w)?(a=this.get_unformatted("</"+N+">",O),r.push(a),this.pos,this.tag_type="SINGLE"):"script"===N&&(-1===O.search("type")||O.search("type")>-1&&O.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/)>-1)?t||(this.record_tag(N),this.tag_type="SCRIPT"):"style"===N&&(-1===O.search("type")||O.search("type")>-1&&O.search("text/css")>-1)?t||(this.record_tag(N),this.tag_type="STYLE"):"!"===N.charAt(0)?t||(this.tag_type="SINGLE",this.traverse_whitespace()):t||("/"===N.charAt(0)?(this.retrieve_tag(N.substring(1)),this.tag_type="END"):(this.record_tag(N),"html"!==N.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(r),this.Utils.in_array(N,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!==this.output[this.output.length-2]&&this.print_newline(!0,this.output))),t&&(this.pos=u,this.line_char_count=p),r.join("")},this.get_comment=function(t){var e="",n=">",i=!1;this.pos=t;var s=this.input.charAt(this.pos);for(this.pos++;this.pos<=this.input.length&&((e+=s).charAt(e.length-1)!==n.charAt(n.length-1)||-1===e.indexOf(n));)!i&&e.length<10&&(0===e.indexOf("<![if")?(n="<![endif]>",i=!0):0===e.indexOf("<![cdata[")?(n="]]>",i=!0):0===e.indexOf("<![")?(n="]>",i=!0):0===e.indexOf("\x3c!--")?(n="--\x3e",i=!0):0===e.indexOf("{{!--")?(n="--}}",i=!0):0===e.indexOf("{{!")?5===e.length&&-1===e.indexOf("{{!--")&&(n="}}",i=!0):0===e.indexOf("<?")?(n="?>",i=!0):0===e.indexOf("<%")&&(n="%>",i=!0)),s=this.input.charAt(this.pos),this.pos++;return e},this.get_unformatted=function(t,e){if(e&&-1!==e.toLowerCase().indexOf(t))return"";var n,i,s="",r="",a=!0,h=(n=t,i="",{add:function(t){var e=i+t.toLowerCase();i=e.length<=n.length?e:e.substr(e.length-n.length,n.length)},doesNotMatch:function(){return-1===i.indexOf(n)}});do{if(this.pos>=this.input.length)return r;if(s=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(s,this.Utils.whitespace)){if(!a){this.line_char_count--;continue}if("\n"===s||"\r"===s){r+="\n",this.line_char_count=0;continue}}r+=s,h.add(s),this.line_char_count++,a=!0,v&&"{"===s&&r.length&&"{"===r.charAt(r.length-2)&&(r+=this.get_unformatted("}}"))}while(h.doesNotMatch());return r},this.get_token=function(){var t;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var e=this.last_token.substr(7);return"string"!=typeof(t=this.get_contents_to(e))?t:[t,"TK_"+e]}return"CONTENT"===this.current_mode?"string"!=typeof(t=this.get_content())?t:[t,"TK_CONTENT"]:"TAG"===this.current_mode?"string"!=typeof(t=this.get_tag())?t:[t,"TK_TAG_"+this.tag_type]:void 0},this.get_full_indent=function(t){return(t=this.indent_level+t||0)<1?"":Array(t+1).join(this.indent_string)},this.is_unformatted=function(t,e){if(!this.Utils.in_array(t,e))return!1;if("a"!==t.toLowerCase()||!this.Utils.in_array("a",e))return!0;var n=(this.get_tag(!0)||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!(n&&!this.Utils.in_array(n[1],e))},this.printer=function(t,e,n,i,s){this.input=t||"",this.input=this.input.replace(/\r\n|[\r\u2028\u2029]/g,"\n"),this.output=[],this.indent_character=e,this.indent_string="",this.indent_size=n,this.brace_style=s,this.indent_level=0,this.wrap_line_length=i,this.line_char_count=0;for(var r=0;r<this.indent_size;r++)this.indent_string+=this.indent_character;this.print_newline=function(t,e){this.line_char_count=0,e&&e.length&&(t||"\n"!==e[e.length-1])&&("\n"!==e[e.length-1]&&(e[e.length-1]=h(e[e.length-1])),e.push("\n"))},this.print_indentation=function(t){for(var e=0;e<this.indent_level;e++)t.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(t){this.is_whitespace(t)&&!this.output.length||((t||""!==t)&&this.output.length&&"\n"===this.output[this.output.length-1]&&(this.print_indentation(this.output),t=t.replace(/^\s+/g,"")),this.print_token_raw(t))},this.print_token_raw=function(t){this.newlines>0&&(t=h(t)),t&&""!==t&&(t.length>1&&"\n"===t.charAt(t.length-1)?(this.output.push(t.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(t));for(var e=0;e<this.newlines;e++)this.print_newline(e>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}).printer(t,c,l,f,d);;){var i=o.get_token();if(o.token_text=i[0],o.token_type=i[1],"TK_EOF"===o.token_type)break;switch(o.token_type){case"TK_TAG_START":o.print_newline(!1,o.output),o.print_token(o.token_text),o.indent_content&&(!o.indent_body_inner_html&&o.token_text.match(/<body(?:.*)>/)||!o.indent_head_inner_html&&o.token_text.match(/<head(?:.*)>/)||o.indent(),o.indent_content=!1),o.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":o.print_newline(!1,o.output),o.print_token(o.token_text),o.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===o.last_token&&""===o.last_text){var r=(o.token_text.match(/\w+/)||[])[0],a=null;o.output.length&&(a=o.output[o.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null===a||a[1]!==r&&!o.Utils.in_array(a[1],g))&&o.print_newline(!1,o.output)}o.print_token(o.token_text),o.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var y=o.token_text.match(/^\s*<([a-z-]+)/i);y&&o.Utils.in_array(y[1],g)||o.print_newline(!1,o.output),o.print_token(o.token_text),o.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":for(var C=!1,S=o.output.length-1;S>=0&&"\n"!==o.output[S];S--)if(o.output[S].match(/{{#if/)){C=!0;break}C||o.print_newline(!1,o.output),o.print_token(o.token_text),o.indent_content&&(o.indent(),o.indent_content=!1),o.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":case"TK_CONTENT":o.print_token(o.token_text),o.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==o.token_text){o.print_newline(!1,o.output);var K,L=o.token_text,j=1;"TK_SCRIPT"===o.token_type?K="function"==typeof n&&n:"TK_STYLE"===o.token_type&&(K="function"==typeof s&&s),"keep"===e.indent_scripts?j=0:"separate"===e.indent_scripts&&(j=-o.indent_level);var I=o.get_full_indent(j);if(K){var U=function(){this.eol="\n"};U.prototype=e;var G=new U;L=K(L.replace(/^\s*/,I),G)}else{var R=L.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(o.indent_string).length-1,B=o.get_full_indent(j-R);L=L.replace(/^\s*/,I).replace(/\r\n|\r|\n/g,"\n"+B).replace(/\s+$/,"")}L&&(o.print_token_raw(L),o.print_newline(!0,o.output))}o.current_mode="TAG";break;default:""!==o.token_text&&o.print_token(o.token_text)}o.last_token=o.token_type,o.last_text=o.token_text}var z=o.output.join("").replace(/[\r\n\t ]+$/,"");return E&&(z+="\n"),"\n"!==N&&(z=z.replace(/[\n]/g,N)),z}}},function(t,e){var n="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",i=new RegExp("["+n+"]"),s=new RegExp("["+n+"̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿]");e.newline=/[\n\r\u2028\u2029]/,e.lineBreak=new RegExp("\r\n|"+e.newline.source),e.allLineBreaks=new RegExp(e.lineBreak.source,"g"),e.isIdentifierStart=function(t){return t<65?36===t||64===t:t<91||(t<97?95===t:t<123||t>=170&&i.test(String.fromCharCode(t)))},e.isIdentifierChar=function(t){return t<48?36===t:t<58||!(t<65)&&(t<91||(t<97?95===t:t<123||t>=170&&s.test(String.fromCharCode(t))))}},function(t,e){t.exports.mergeOpts=function(t,e){var n,i={};for(n in t)n!==e&&(i[n]=t[n]);if(e in t)for(n in t[e])i[n]=t[e][n];return i}},function(t,e,n){var i=n(0).Beautifier;t.exports=function(t,e,n,s){return new i(t,e,n,s).beautify()}}]);if("function"==typeof define&&define.amd)define(["require","./beautify","./beautify-css"],function(e){var n=e("./beautify"),i=e("./beautify-css");return{html_beautify:function(e,s){return t(e,s,n.js_beautify,i.css_beautify)}}});else if("undefined"!=typeof exports){var e=require("./beautify.js"),n=require("./beautify-css.js");exports.html_beautify=function(i,s){return t(i,s,e.js_beautify,n.css_beautify)}}else"undefined"!=typeof window?window.html_beautify=function(e,n){return t(e,n,window.js_beautify,window.css_beautify)}:"undefined"!=typeof global&&(global.html_beautify=function(e,n){return t(e,n,global.js_beautify,global.css_beautify)})}();