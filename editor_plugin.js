(function(){tinymce.PluginManager.requireLangPack('subordinate');tinymce.create('tinymce.plugins.SubordinatePlugin',{init:function(l,m){l.addCommand('mceSubordinate',function(){var c;var d;var e;var f=l.editorId.split("_");c=l.editorId.split("-");if(f[1]=="theorem"){if(f[2]=="content"){d="statementtheoremcontent"}else if(f[2]=="part"){d="parttheoremcontent"}}else{e=f[2].split("-");d=f[1]+e[0]}for(var i=1;i<c.length-1;i++){d+=c[i]+"-"}d+=c[c.length-1];makeSubordinateDialog(l,d);var g=$(window).width();var h=$(window).height();var j=g*0.6;var k=h*0.8;$('#msm_subordinate_container-'+d).dialog({open:function(a,b){$(".ui-dialog-titlebar-close").hide();$("#msm_subordinate_highlighted-"+d).val(l.selection.getContent({format:'text'}));initInfoEditor(d)},modal:true,autoOpen:false,height:k,width:j,closeOnEscape:false});$('#msm_subordinate_container-'+d).dialog('open').css('display','block')});l.onNodeChange.add(function(a,b,n){if(a.selection.getContent()){b.setDisabled('subordinate',false)}else{b.setActive('subordinate',false);b.setDisabled('subordinate',true)}});l.addButton('subordinate',{title:'subordinate.desc',cmd:'mceSubordinate',image:m+'/img/subordinate.png'})},createControl:function(n,a){return null},getInfo:function(){return{longname:'Subordinate plugin',author:'Ga Young Kim',authorurl:'http://ualberta.ca ',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/subordinate',version:"1.0"}}});tinymce.PluginManager.add('subordinate',tinymce.plugins.SubordinatePlugin)})();function makeSubordinateDialog(b,c){console.log("idNumber: "+c);var d;var e=document.createElement('div');var f=document.createElement('form');var g=document.createElement('div');var h=document.createElement('label');var i=document.createTextNode('Selected Text : ');var j=document.createElement('input');var k=document.createElement('label');var l=document.createTextNode('Subordinate Type : ');var m=document.createElement('select');var n=document.createElement('option');n.value="Information";var o=document.createTextNode('Information');var p=document.createElement('option');p.setAttribute("value","External Link");var q=document.createTextNode('External Link');var r=document.createElement('option');r.setAttribute("value","Internal Reference");var s=document.createTextNode('Internal Reference');var t=document.createElement('option');t.setAttribute("value","External Reference");var u=document.createTextNode('External Reference');var v=null;if($.browser.msie){v=b.selection.getNode().childNodes[0].tagName}else{v=b.selection.getNode().tagName}n.setAttribute("selected","selected");n.appendChild(o);p.appendChild(q);r.appendChild(s);t.appendChild(u);var w=document.createElement('div');var x=document.createElement('div');var y=document.createElement('input');var z=document.createElement('input');d=document.getElementById('msm_subordinate_container-'+c);e.id='msm_subordinate-'+c;d.setAttribute("title","Create Subordinate");f.id='msm_subordinate_form-'+c;g.className="msm_subordinate_form_container";h.setAttribute("for",'msm_subordinate_highlighted-'+c);h.appendChild(i);j.id='msm_subordinate_highlighted-'+c;j.name='msm_subordinate_highlighted-'+c;j.setAttribute("disabled","disabled");k.setAttribute("for",'msm_subordinate_select-'+c);k.appendChild(l);m.id='msm_subordinate_select-'+c;m.name='msm_subordinate_select-'+c;m.onchange=function(a){changeForm(a,b,c)};w.id='msm_subordinate_content_form_container-'+c;w.className="msm_subordinate_content_form_containers";x.className='msm_subordinate_button_container';y.setAttribute("type","button");y.id='msm_subordinate_submit-'+c;y.className='msm_subordinate_button';y.setAttribute("value","Save");y.onclick=function(){submitSubForm(b,c)};z.setAttribute("type","button");z.id='msm_subordinate_cancel-'+c;z.className='msm_subordinate_button';z.setAttribute("value","Cancel");z.onclick=function(){closeSubFormDialog(c)};var A=makeInfoForm(b,c);w.appendChild(A);m.appendChild(n);m.appendChild(p);m.appendChild(r);m.appendChild(t);x.appendChild(y);x.appendChild(z);g.appendChild(h);g.appendChild(j);g.appendChild(document.createElement('br'));g.appendChild(document.createElement('br'));g.appendChild(k);g.appendChild(m);g.appendChild(w);f.appendChild(g);f.appendChild(document.createElement('br'));f.appendChild(document.createElement('br'));f.appendChild(x);e.appendChild(f);if(!d.hasChildNodes()){d.appendChild(e)}else{$('#msm_subordinate_container-'+c+" textarea").each(function(){if(tinymce.getInstanceById($(this).attr("id"))!=null){tinymce.execCommand('mceFocus',false,$(this).attr("id"));tinymce.execCommand('mceRemoveControl',false,$(this).attr("id"))}});$('#msm_subordinate_container-'+c).empty();d.appendChild(e)}if(v=="A"){changeSelectIndex(b,c);loadPreviousData(b,c)}}