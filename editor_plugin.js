(function(){tinymce.PluginManager.requireLangPack('subordinate');tinymce.create('tinymce.plugins.SubordinatePlugin',{init:function(g,h){g.addCommand('mceSubordinate',function(){var a;var b;var c;var d='';var e=g.editorId.split("_");a=g.editorId.split("-");if(e[1]=="theorem"){if(e[2]=="content"){b="statementtheoremcontent"}else if(e[2]=="part"){b="parttheoremcontent"}}else if(e[1]=="info"){b="infocontent"}else if(e[1]=="subordinate"){var f='';for(var i=1;i<a.length-1;i++){f+=a[i]+"-"}f+=a[a.length-1];d=f;c=e[2].split("-");b=e[1]+c[0]}else{c=e[2].split("-");b=e[1]+c[0]}for(var i=1;i<a.length-1;i++){b+=a[i]+"-"}b+=a[a.length-1];makeSubordinateDialog(g,b,d)});g.onNodeChange.add(function(a,b,n){if(a.selection.getContent()){b.setDisabled('subordinate',false)}else{b.setActive('subordinate',false);b.setDisabled('subordinate',true)}});g.addButton('subordinate',{title:'subordinate.desc',cmd:'mceSubordinate',image:h+'/img/subordinate.png'})},createControl:function(n,a){return null},getInfo:function(){return{longname:'Subordinate plugin',author:'Ga Young Kim',authorurl:'http://ualberta.ca ',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/subordinate',version:"1.0"}}});tinymce.PluginManager.add('subordinate',tinymce.plugins.SubordinatePlugin)})();function makeSubordinateDialog(b,c,d){var e=null;var f=document.createElement('div');var g=document.createElement('form');var h=document.createElement('div');var j=document.createElement('label');var k=document.createTextNode('Selected Text : ');var l=document.createElement('input');var m=document.createElement('label');var n=document.createTextNode('Subordinate Type : ');var o=document.createElement('select');var p=document.createElement('option');p.value="Information";var q=document.createTextNode('Information');var r=document.createElement('option');r.setAttribute("value","External Link");var s=document.createTextNode('External Link');var t=document.createElement('option');t.setAttribute("value","Internal Reference");var u=document.createTextNode('Internal Reference');var v=document.createElement('option');v.setAttribute("value","External Reference");var w=document.createTextNode('External Reference');var x=null;if($.browser.msie){x=b.selection.getNode().childNodes[0].tagName}else{x=b.selection.getNode().tagName}p.setAttribute("selected","selected");p.appendChild(q);r.appendChild(s);t.appendChild(u);v.appendChild(w);var y=document.createElement('div');var z=document.createElement('div');var A=document.createElement('input');var B=document.createElement('input');if(d!=''){if(x!='A'){e=document.createElement("div");c=isExistingIndex(c+"-1");e.id='msm_subordinate_container-'+c;e.className='msm_subordinate_containers';var C=findParentDiv(d);$(C).append(e)}else{var D='';if($.browser.msie){D=b.selection.getNode().childNodes[0].id}else{D=b.selection.getNode().id}var E=/([A-Za-z]*?)(\d+)((?:-\d+)*)/;var F=b.editorId.split("-");var G=/^\S*(statementtheoremcontent\d+\S*)$/;var H=/^\S*(parttheoremcontent\d+\S*)$/;var I=/^\S*(infocontent\d+\S*)$/;var J='';if(b.editorId.match(G)){var K=/^\S*(subordinateinfoContent)+(statementtheoremcontent\d+\S*)$/;if(b.editorId.match(K)){J=F[1].replace(E,"$2")}else{var L='';for(var i=1;i<F.length-1;i++){L+=F[i]+"-"}L+=F[F.length-1];var M=L.replace(E,"$3");var N=M.split("-");J=N[1]}}else if(b.editorId.match(H)){var O=/([A-Za-z]*?)(\d+-\d+-\d+)((?:-\d+)*)/;var L='';for(var i=1;i<F.length-1;i++){L+=F[i]+"-"}L+=F[F.length-1];J=L.replace(O,"$2")}else if(b.editorId.match(I)){var P=/([A-Za-z]*?)(\d+-\d+)((?:-\d+)*)/;var L='';for(var i=1;i<F.length-1;i++){L+=F[i]+"-"}L+=F[F.length-1];J=L.replace(P,"$2")}else{J=F[1].replace(E,"$2")}var Q=D.split("-");var R='';for(var i=1;i<Q.length-2;i++){R+=Q[i]+"-"}R+=Q[Q.length-2];c=R.replace(E,"$1"+J+"$3");e=document.getElementById('msm_subordinate_container-'+c)}}else{e=document.getElementById('msm_subordinate_container-'+c)}f.id='msm_subordinate-'+c;e.setAttribute("title","Create Subordinate");g.id='msm_subordinate_form-'+c;h.className="msm_subordinate_form_container";j.setAttribute("for",'msm_subordinate_highlighted-'+c);j.appendChild(k);l.id='msm_subordinate_highlighted-'+c;l.name='msm_subordinate_highlighted-'+c;l.setAttribute("disabled","disabled");m.setAttribute("for",'msm_subordinate_select-'+c);m.appendChild(n);o.id='msm_subordinate_select-'+c;o.name='msm_subordinate_select-'+c;o.onchange=function(a){changeForm(a,b,c)};y.id='msm_subordinate_content_form_container-'+c;y.className="msm_subordinate_content_form_containers";z.className='msm_subordinate_button_container';A.setAttribute("type","button");A.id='msm_subordinate_submit-'+c;A.className='msm_subordinate_button';A.setAttribute("value","Save");A.onclick=function(){submitSubForm(b,c,d)};B.setAttribute("type","button");B.id='msm_subordinate_cancel-'+c;B.className='msm_subordinate_button';B.setAttribute("value","Cancel");B.onclick=function(){closeSubFormDialog(c)};var S=makeInfoForm(b,c);y.appendChild(S);o.appendChild(p);o.appendChild(r);o.appendChild(t);o.appendChild(v);z.appendChild(A);z.appendChild(B);h.appendChild(j);h.appendChild(l);h.appendChild(document.createElement('br'));h.appendChild(document.createElement('br'));h.appendChild(m);h.appendChild(o);h.appendChild(y);g.appendChild(h);g.appendChild(document.createElement('br'));g.appendChild(document.createElement('br'));g.appendChild(z);f.appendChild(g);if(!e.hasChildNodes()){e.appendChild(f)}else{$('#msm_subordinate_container-'+c+" textarea").each(function(){if(tinymce.getInstanceById($(this).attr("id"))!=null){tinymce.execCommand('mceFocus',false,$(this).attr("id"));tinymce.execCommand('mceRemoveControl',false,$(this).attr("id"))}});$('#msm_subordinate_container-'+c).empty();e.appendChild(f)}if(x=="A"){changeSelectIndex(b,c);loadPreviousData(b,c)}createDialog(b,c)}