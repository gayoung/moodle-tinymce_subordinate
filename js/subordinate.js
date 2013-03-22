//
var _subIndex = 1;
//
//function init(content, id){
//    var selectedText;
//   
//    selectedText= document.getElementById('msm_subordinate_highlighted-'+id);
//   
//    selectedText.value = content;     
//}    
//        
function changeForm(e, ed, id) {
    var container = document.getElementById("msm_subordinate_content_form_container-"+id);
    var selectVal;
        
    switch(e)
    {
        case '':
            selectVal = 0;
            break;
        case "info":
            selectVal = 0;
            break;
        case "url":
            selectVal = 1;
            break;
        case "ir":
            selectVal = 2;
            break;
        case "er":
            selectVal = 3;
            break;
        default:
            selectVal = e.target.selectedIndex;
            break;
    }
        
    var prevValues = [];
    
    $("#msm_subordinate_form-"+id).find(".msm_subordinate_textareas").each(function() {
        if(this.id == "msm_subordinate_infoTitle-"+id)
        {
            prevValues["msm_subordinate_infoTitle"] = tinymce.get(this.id).getContent({
                format: "html"
            });
        }
        else if(this.id == "msm_subordinate_infoContent-"+id)
        {
            prevValues["msm_subordinate_infoContent"] = tinymce.get(this.id).getContent({
                format: "html"
            });
        }
    });    
    
    var fieldset = makeInfoForm(ed, id);  
    
    //-----------------------------start of external url form-----------------------------//
    var urlFieldSet = appendUrlForm(id);
    
    if(container.hasChildNodes())
    {
        while(container.firstChild)
        {
            container.removeChild(container.firstChild);
        }
    }    
    // remove URL form if already attached
    if($("#msm_subordinate_url-"+id))
    {
        $("#msm_subordinate_url-"+id).parent().empty().remove();
    }
        
    switch(selectVal)
    {       
        case 0:
            container.appendChild(fieldset);
            break;
        case 1:
            container.appendChild(urlFieldSet);
            container.appendChild(fieldset);
            break;
        case 2:
            alert("internal ref");
            break;
        case 3:
            alert("external ref");
            break;           
    }
    
    $("#msm_subordinate_form-"+id).find(".msm_subordinate_textareas").each(function() {
        if(this.id == "msm_subordinate_infoTitle-"+id)
        {
            $(this).val(prevValues["msm_subordinate_infoTitle"]);
        }
        else if(this.id == "msm_subordinate_infoContent-"+id)
        {
            $(this).val(prevValues["msm_subordinate_infoContent"]);
        }
    });
    
    
    initInfoEditor(id);    
}

function initInfoEditor(id)
{
    var titleid = "msm_subordinate_infoTitle-"+id;
    var contentid = "msm_subordinate_infoContent-"+id;
    
    YUI().use('editor_tinymce', function(Y) {
        M.editor_tinymce.init_editor(Y, titleid, {
            mode:"exact",
            elements: titleid,
            plugins:"safari,table,style,layer,advhr,advlink,emotions,inlinepopups,subordinate,searchreplace,paste,directionality,fullscreen,nonbreaking,contextmenu,insertdatetime,save,iespell,preview,print,noneditable,visualchars,xhtmlxtras,template,pagebreak,-dragmath,-moodlenolink,-spellchecker,-moodleimage,-moodlemedia",
            width: "100%",
            height: "70%",
            theme_advanced_font_sizes:"1,2,3,4,5,6,7",
            theme_advanced_layout_manager:"SimpleLayout",
            theme_advanced_toolbar_align:"left",
            theme_advanced_fonts:"Trebuchet=Trebuchet MS,Verdana,Arial,Helvetica,sans-serif;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,times new roman,times,serif;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Verdana=verdana,arial,helvetica,sans-serif;Impact=impact;Wingdings=wingdings",
            theme_advanced_resize_horizontal:true,
            theme_advanced_resizing:true,
            theme_advanced_resizing_min_height:30,
            min_height:30,
            theme_advanced_toolbar_location:"top",
            theme_advanced_statusbar_location:"bottom",
            language_load:false,
            langrev:-1,
            theme_advanced_buttons1:"fontselect,fontsizeselect,formatselect,|,undo,redo,|,search,replace,|,fullscreen",
            theme_advanced_buttons2:"bold,italic,underline,strikethrough,sub,sup,|,justifyleft,justifycenter,justifyright,|,cleanup,removeformat,pastetext,pasteword,|,forecolor,backcolor,|,ltr,rtl",
            theme_advanced_buttons3:"bullist,numlist,outdent,indent,|,link,unlink,moodlenolink,subordinate,|,image,moodlemedia,dragmath,nonbreaking,charmap,table,|,code,spellchecker",
            moodle_init_plugins:"dragmath:loader.php/dragmath/-1/editor_plugin.js,moodlenolink:loader.php/moodlenolink/-1/editor_plugin.js,spellchecker:loader.php/spellchecker/-1/editor_plugin.js,moodleimage:loader.php/moodleimage/-1/editor_plugin.js,moodlemedia:loader.php/moodlemedia/-1/editor_plugin.js",
            file_browser_callback:"M.editor_tinymce.filepicker",
            moodle_plugin_base: M.cfg.wwwroot+"/lib/editor/tinymce/plugins/"
        })
        
        M.editor_tinymce.init_filepicker(Y, id, tinymce_filepicker_options);
    });
    
    YUI().use('editor_tinymce', function(Y) {
        M.editor_tinymce.init_editor(Y, contentid, {
            mode:"exact",
            elements: contentid,
            plugins:"safari,table,style,layer,advhr,advlink,emotions,inlinepopups,subordinate,searchreplace,paste,directionality,fullscreen,nonbreaking,contextmenu,insertdatetime,save,iespell,preview,print,noneditable,visualchars,xhtmlxtras,template,pagebreak,-dragmath,-moodlenolink,-spellchecker,-moodleimage,-moodlemedia",
            width: "100%",
            height: "70%",
            theme_advanced_font_sizes:"1,2,3,4,5,6,7",
            theme_advanced_layout_manager:"SimpleLayout",
            theme_advanced_toolbar_align:"left",
            theme_advanced_fonts:"Trebuchet=Trebuchet MS,Verdana,Arial,Helvetica,sans-serif;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,times new roman,times,serif;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Verdana=verdana,arial,helvetica,sans-serif;Impact=impact;Wingdings=wingdings",
            theme_advanced_resize_horizontal:true,
            theme_advanced_resizing:true,
            theme_advanced_resizing_min_height:30,
            min_height:30,
            theme_advanced_toolbar_location:"top",
            theme_advanced_statusbar_location:"bottom",
            language_load:false,
            langrev:-1,
            theme_advanced_buttons1:"fontselect,fontsizeselect,formatselect,|,undo,redo,|,search,replace,|,fullscreen",
            theme_advanced_buttons2:"bold,italic,underline,strikethrough,sub,sup,|,justifyleft,justifycenter,justifyright,|,cleanup,removeformat,pastetext,pasteword,|,forecolor,backcolor,|,ltr,rtl",
            theme_advanced_buttons3:"bullist,numlist,outdent,indent,|,link,unlink,moodlenolink,subordinate,|,image,moodlemedia,dragmath,nonbreaking,charmap,table,|,code,spellchecker",
            moodle_init_plugins:"dragmath:loader.php/dragmath/-1/editor_plugin.js,moodlenolink:loader.php/moodlenolink/-1/editor_plugin.js,spellchecker:loader.php/spellchecker/-1/editor_plugin.js,moodleimage:loader.php/moodleimage/-1/editor_plugin.js,moodlemedia:loader.php/moodlemedia/-1/editor_plugin.js",
            file_browser_callback:"M.editor_tinymce.filepicker",
            moodle_plugin_base: M.cfg.wwwroot+"/lib/editor/tinymce/plugins/"
        })
        
        M.editor_tinymce.init_filepicker(Y, contentid, tinymce_filepicker_options);
    });
}

function makeInfoForm(ed, id)
{           
    // making a fieldset element for the info form (all selection will be using it
    // so make it available to all switch cases)    
    var fieldset = document.createElement("fieldset");
    fieldset.setAttribute("style", "border:1px solid black; padding: 2%; margin-top: 1%;");
        
    var infoLegend = document.createElement("legend");
    var legendText = document.createTextNode("Subordinate Information Form");
    infoLegend.appendChild(legendText);
        
    var infotitlediv = document.createElement("div");
    var infocontentdiv = document.createElement("div");
    
    var infoTitleLabel = document.createElement("label");
    var infoContentLabel = document.createElement("label");
        
    var infoTitle = document.createTextNode("Information Title: ");
    var infoContent = document.createTextNode("Information Content: ");
    
    var infoTitleInput = document.createElement("textarea");
    var infoContentInput = document.createElement("textarea");  
          
    infoTitleLabel.setAttribute("for", "msm_subordinate_infoTitle-"+id);        
    infoTitleLabel.appendChild(infoTitle);
        
    infoTitleInput.id = "msm_subordinate_infoTitle-"+id;
    infoTitleInput.name = "msm_subordinate_infoTitle-"+id;
    infoTitleInput.className = "msm_subordinate_textareas";        
        
    infoContentLabel.setAttribute("for", "msm_subordinate_infoContent-"+id);        
    infoContentLabel.appendChild(infoContent);
    
    infoContentInput.id = "msm_subordinate_infoContent-"+id;
    infoContentInput.name = "msm_subordinate_infoContent-"+id;
    infoContentInput.className = "msm_subordinate_textareas";
   
       
    fieldset.appendChild(infoLegend);
    infotitlediv.appendChild(infoTitleLabel);
    infotitlediv.appendChild(infoTitleInput);
    fieldset.appendChild(infotitlediv);        
        
    fieldset.appendChild(document.createElement("br"));
        
    infocontentdiv.appendChild(infoContentLabel);        
    infocontentdiv.appendChild(infoContentInput);
    fieldset.appendChild(infocontentdiv);    
    
    return fieldset;
}

function loadPreviousData(editor, id)
{ 
    var selectedAnchorIdInfo = editor.selection.getNode().id.split("-");
    
    var indexId = '';
    for(var i=1; i < selectedAnchorIdInfo.length-1; i++)
    {
        indexId += selectedAnchorIdInfo[i] + "-";
    }
    indexId += selectedAnchorIdInfo[selectedAnchorIdInfo.length-1];
       
    var prevSelectValue = null;
    var prevUrlValue = null;
    var prevInfoTitleValue = null;
    var prevInfoContentValue = null;
   
    $('#msm_subordinate_result-'+indexId).children('div').each(function() {
        if(this.id == 'msm_subordinate_select-'+indexId)
        {
            prevSelectValue = $(this).text();
        }
        else if(this.id == 'msm_subordinate_url-'+indexId)
        {
            prevUrlValue = $(this).text();
        }
        else if(this.id == 'msm_subordinate_infoTitle-'+indexId)
        {
            prevInfoTitleValue = $(this).html();
        }
        else if(this.id == 'msm_subordinate_infoContent-'+indexId)
        {
            prevInfoContentValue = $(this).html();
        }
    });
    
    
    var select = document.getElementById("msm_subordinate_select-"+id);
    //    var select = $("#msm_subordinate_form-"+id+ " #msm_subordinate_select-"+id);
        
    switch(prevSelectValue)
    {
        case "Information":
            select.selectedIndex = 0;
            break;
        case "External Link":
            select.selectedIndex = 1;
            break;
        case "Internal Reference":
            select.selectedIndex = 2;
            break;
        case "External Reference":
            select.selectedIndex = 3;
            break;
    }
  
    if((prevUrlValue != '')&&(prevUrlValue != 'undefined')&&(prevUrlValue !== null))
    {
        var urlFieldSet = appendUrlForm(id);
        $("#msm_subordinate_content_form_container-"+id).prepend(urlFieldSet);
        $("#msm_subordinate_form-"+id+ " #msm_subordinate_url-"+id).val(prevUrlValue);        
    }
    
    $(".msm_subordinate_textareas").each(function() {
        if(this.id == "msm_subordinate_infoTitle-"+id)
        {
            this.value = prevInfoTitleValue;
        }
        else if(this.id == "msm_subordinate_infoContent-"+id)
        {
            this.value = prevInfoContentValue;
        }
    });
     
}

function appendUrlForm(id)
{
    var urlfieldset = document.createElement("fieldset");
    urlfieldset.setAttribute("style", "border:1px solid black; padding: 2%; margin-top: 1%;");
    
    var urlLegend = document.createElement("legend");
    var urllegendText = document.createTextNode("External URL Form");
    urlLegend.appendChild(urllegendText);
    
    var urlLabel = document.createElement("label");
    var urlLabelText = document.createTextNode("External URL: ");
    urlLabel.setAttribute("for", "msm_subordinate_url-"+id);
    
    urlLabel.appendChild(urlLabelText);
    
    var urlInput = document.createElement("input");
    urlInput.setAttribute("type", "text"); //type url is not compatible with IE and safari
    urlInput.className = "msm_subordinate_urls";
    urlInput.id = "msm_subordinate_url-"+id;
    urlInput.name = "msm_subordinate_url-"+id;
    urlInput.setAttribute("style", "min-width: 83%;");
    
    var urlErrorSpan = document.createElement("span");
    urlErrorSpan.id = "msm_invalid_url_span";
    urlErrorSpan.setAttribute("style", "color: red; display: none; margin-left: 85px;");
    
    var urlErrorSpanText = document.createTextNode("Please enter a valid URL.");
    urlErrorSpan.appendChild(urlErrorSpanText);    
    
    urlfieldset.appendChild(urlLegend);
    urlfieldset.appendChild(urlLabel);
    urlfieldset.appendChild(urlInput);
    urlfieldset.appendChild(urlErrorSpan);
    
    return urlfieldset;
}

function closeSubFormDialog(id)
{
    $('#msm_subordinate_container-'+id+" textarea").each(function() {
        if(tinymce.getInstanceById($(this).attr("id")) != null)
        {
            tinymce.execCommand('mceFocus', false, $(this).attr("id"));  
            tinymce.execCommand('mceRemoveControl', false, $(this).attr("id"));
        }
    });
    
    $('#msm_subordinate_container-'+id).empty();
    $('#msm_subordinate_container-'+id).dialog("close");
}

/**
 *
 *  @param tinyMCE object  ed --> the id of the editor where the popup was triggered from
 *  @param string          id --> ending of HTML ID of the subordinate components to make them unique
 **/
function submitSubForm(ed, id)
{  
    var selectedText = ed.selection.getContent();
            
    var selectedNode = null;
        
    if($.browser.msie)
    {
        selectedNode = ed.selection.getNode().childNodes[0].tagName;
    }
    else
    {
        selectedNode = ed.selection.getNode().tagName;
    }    
    
    var newSubordinateDiv = null;
    
    if(selectedNode != 'A')
    {
        newSubordinateDiv = createSubordinateDiv(id, id+"-"+_subIndex);  
    }
    else
    {
        var textIdInfo = ed.selection.getNode().id.split("-");
        var textId = '';
        for(var i=1; i < textIdInfo.length-1; i++)
        {
            textId += textIdInfo[i]+"-";
        }
        textId+= textIdInfo[textIdInfo.length-1];        
        
        newSubordinateDiv = replaceSubordinateDiv(id, textId);
    }
            
    if(newSubordinateDiv instanceof Array)
    {
        nullErrorWarning(newSubordinateDiv, id);
    }
    else
    {
        var subordinateDivIndexInfo = newSubordinateDiv.id.split("-");
    
        var subIndex = '';
        for(var i=1; i < subordinateDivIndexInfo.length-1; i++)
        {
            subIndex+= subordinateDivIndexInfo[i]+"-";
        }
        subIndex += subordinateDivIndexInfo[subordinateDivIndexInfo.length-1];    
    
        $("#msm_subordinate_result_container-"+id).append(newSubordinateDiv);
        
        var urltext = '';        
        if($("#msm_subordinate_url-"+id).val() != '')
        {
            urltext = $("#msm_subordinate_url-"+id).val();
        }
             
        var newContent = '';             
        if(selectedNode != "A")
        {           
            if(urltext != '')
            {
                newContent = "<a href='"+$.trim(urltext)+"' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+subIndex+"'>"+$.trim(selectedText)+"</a> "; 
            }
            else
            {
                newContent = "<a href='#' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+subIndex+"'>"+$.trim(selectedText)+"</a> ";                       

            }
            console.log(newContent);
            ed.selection.setContent(newContent + ' html'); 
        }    
        closeSubFormDialog(id);
    }
   
}

function replaceSubordinateDiv(index, hotId)
{
    $("#msm_subordinate_result_container-"+index).children("div").each(function() {
        if(this.id == "msm_subordinate_result-"+hotId)
        {
            $(this).empty().remove();
        }
    });
   
    var subordinateResultContainer = createSubordinateDiv(index, hotId);
   
    return subordinateResultContainer;
}

function createSubordinateDiv(index, idString)
{
    var errorArray = [];
    
    var resultContainer = document.createElement("div");
    resultContainer.id = "msm_subordinate_result-"+idString;
    resultContainer.className = "msm_subordinate_results";
    
    $("#msm_subordinate-"+index+" textarea").each(function(){          
        this.value = tinymce.get(this.id).getContent({
            format: "html"
        });       
       
        if(this.value == '')
        {
            errorArray.push(this.id+"_ifr");
        }    
    }); 
    
    if(errorArray.length == 0)
    {
        var resultSelectDiv = document.createElement("div");
        resultSelectDiv.id = "msm_subordinate_select-"+idString;    
        var resultSelectText = document.createTextNode($("#msm_subordinate_select-"+index).val());
        resultSelectDiv.appendChild(resultSelectText);
        
        var resultUrlDiv = null;
        if($("#msm_subordinate_url-"+index).val() != '')
        {
            resultUrlDiv = document.createElement("div");
            resultUrlDiv.id = "msm_subordinate_url-"+idString
            var resultUrlText = document.createTextNode($("#msm_subordinate_url-"+index).val());
            resultUrlDiv.appendChild(resultUrlText);
        }
    
        var resultTitleDiv = document.createElement("div");
        resultTitleDiv.id = "msm_subordinate_infoTitle-"+idString;        
    
        $(resultTitleDiv).append($("#msm_subordinate_infoTitle-"+index).val());
    
        var resultContentDiv = document.createElement("div");
        resultContentDiv.id = "msm_subordinate_infoContent-"+idString;
    
        $(resultContentDiv).append($("#msm_subordinate_infoContent-"+index).val());
    
        resultContainer.appendChild(resultSelectDiv);
        if(resultUrlDiv != null)
        {
            resultContainer.appendChild(resultUrlDiv);
        }
        resultContainer.appendChild(resultTitleDiv);
        resultContainer.appendChild(resultContentDiv);
        
        _subIndex++;
    
        return resultContainer;
    }
    else
    {
        return errorArray;
    }    
}

function nullErrorWarning(errorArray, id)
{ 
    for(var i=0; i < errorArray.length; i++)
    {
        var match = errorArray[i].match(/subordinate.url./);
            
        if(match)
        {
            var invalidornull = errorArray[i].split("|");
            
            if(invalidornull.length > 1)
            {
                $("#msm_invalid_url_span").css("display","block");
                $(invalidornull[0]).css("border", "solid 4px #FFA500");
            }
            $("#"+errorArray[i]).css("border", "solid 4px #FFA500");
            
        }
        else
        {
            $("#"+errorArray[i]).css("border", "solid 4px #FFA500");
        }
    }        
                
    $("<div class=\"dialogs\" id=\"msm_emptySubContent\"> Please fill out the highlighted areas with appropriate information to complete the form. </div>").appendTo('#msm_subordinate_container-'+id);

    $("#msm_emptySubContent").dialog({
        modal: true,
        buttons: {
            Ok: function() {
                errorArray = null;
                $(this).dialog("close");
            }
        }
    }); 
}

function changeSelectIndex(ed, id)
{
    var selectedNodeInfo = ed.selection.getNode().id.split("-");
        
    var selectedId = '';
    for(var i = 1; i < selectedNodeInfo.length-1; i++)
    {
        selectedId += selectedNodeInfo[i]+"-";
    }
    selectedId += selectedNodeInfo[selectedNodeInfo.length-1];
        
    var prevSelectValue = null;
        
    $('#msm_subordinate_result-'+selectedId).children('div').each(function() {
        if(this.id == 'msm_subordinate_select-'+selectedId)
        {
            prevSelectValue = $(this).text();
        }
       
    });
        
    //    var select = document.getElementById("msm_subordinate_select-"+id);
    var select = $("#msm_subordinate_form-"+id+ " #msm_subordinate_select-"+id);
        
    switch(prevSelectValue)
    {
        case "Information":
            select.selectedIndex = 0;
            break;
        case "External Link":
            select.selectedIndex = 1;
            break;
        case "Internal Reference":
            select.selectedIndex = 2;
            break;
        case "External Reference":
            select.selectedIndex = 3;
            break;
    }  
}
