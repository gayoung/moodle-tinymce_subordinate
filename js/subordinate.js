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
    
    var fieldset = makeInfoForm(ed, id);  
    
    //-----------------------------start of external url form-----------------------------//
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
    
    //-----------------------------end of external url form---------------------------------//
        
    // erasing any previously appended children from previous choices made by the user
    //    $('#msm_subordinate_content_form_container-'+id+" textarea").each(function() {
    //        if(tinymce.getInstanceById($(this).attr("id")) != null)
    //        {
    //            console.log("in changeForm --> removing this editor: "+this.id);
    //            tinymce.execCommand('mceFocus', false, $(this).attr("id"));  
    //            tinymce.execCommand('mceRemoveControl', false, $(this).attr("id"));
    //        }
    //    });
    if(container.hasChildNodes())
    {
        while(container.firstChild)
        {
            container.removeChild(container.firstChild);
        }
    }    
        
    switch(selectVal)
    {       
        case 0:
            container.appendChild(fieldset);
            break;
        case 1:
            container.appendChild(urlfieldset);
            container.appendChild(fieldset);
            break;
        case 2:
            alert("internal ref");
            break;
        case 3:
            alert("external ref");
            break;           
    }   
    
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
    console.log("in loadPreviousData");
    
    var selectedAnchorIdInfo = editor.selection.getNode().id.split("-");
    
    var indexId = '';
    for(var i=1; i < selectedAnchorIdInfo.length-1; i++)
    {
        indexId += selectedAnchorIdInfo[i] + "-";
    }
    indexId += selectedAnchorIdInfo[selectedAnchorIdInfo.length-1];
       
    var prevSelectValue = null;
    var prevInfoTitleValue = null;
    var prevInfoContentValue = null;
   
    $('#msm_subordinate_result-'+indexId).children('div').each(function() {
        if(this.id == 'msm_subordinate_select-'+indexId)
        {
            prevSelectValue = $(this).text();
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
    
    switch(prevSelectValue)
    {
        case "Information":
            $("#msm_subordinate_form-"+id+ " #msm_subordinate_select-"+id).val(0);
            break;
        case "External Link":
            $("#msm_subordinate_form-"+id+ " #msm_subordinate_select-"+id).val(1);
            break;
        case "Internal Reference":
            $("#msm_subordinate_form-"+id+ " #msm_subordinate_select-"+id).val(2);
            break;
        case "External Reference":
            $("#msm_subordinate_form-"+id+ " #msm_subordinate_select-"+id).val(3);
            break;
    }
   
    //    var subDialog = document.getElementById("msm_subordinate_container-"+id);
    //    
    //    var title = subDialog.getElementById("msm_subordinate_infoTitle-"+id);
  
   
    $(".msm_subordinate_textareas").each(function() {
        if(this.id == "msm_subordinate_infoTitle-"+id)
        {
            console.log(prevInfoTitleValue);
            this.value = prevInfoTitleValue;
        }
        else if(this.id == "msm_subordinate_infoContent-"+id)
        {
            console.log(prevInfoContentValue);
            this.value = prevInfoContentValue;
        }
    });
     
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
    //        
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
               
        if(selectedNode != "A")
        {           
            var newContent = "<a href='#' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+subIndex+"'>"+$.trim(selectedText)+"</a> ";                       
            ed.selection.setContent(newContent); 
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
    
        var resultTitleDiv = document.createElement("div");
        resultTitleDiv.id = "msm_subordinate_infoTitle-"+idString;        
    
        $(resultTitleDiv).append($("#msm_subordinate_infoTitle-"+index).val());
    
        var resultContentDiv = document.createElement("div");
        resultContentDiv.id = "msm_subordinate_infoContent-"+idString;
    
        $(resultContentDiv).append($("#msm_subordinate_infoContent-"+index).val());
    
        resultContainer.appendChild(resultSelectDiv);
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

//
//// ed --> current editor that the plugin was triggered from
//function submitSubForm(ed, id)
//{
//    // focusNode seems to break it in IE
//    
//    //    var selected = ed.selection.getContent({
//    //        format: 'html'
//    //    });
//    var selected = ed.selection.getNode();
//
//    var selectedNode = ed.selection.getNode().nodeName;
//    
//    console.log(selectedNode);
//        
//    // checking if this selected text has already been submitted once 
//    // if so, find the existing storage div and update the data with new ones
//    // if not, then proceed to create a new storage div for the new subordinate data
//    if(selectedNode == "A")
//    {
//        var foundElement = findSubordinateResult(selected, id);
//        
//        if(foundElement)
//        {    
//            //            console.log("foundElement");
//            //            console.log(foundElement);
//            var oldIndex = foundElement.id.split('-');
//            var oldId='';
//            var oldsId='';
//            
//            for(var i=1; i < oldIndex.length-2; i++)
//            {
//                oldId += oldIndex[i]+"-";
//            }
//            oldId += oldIndex[oldIndex.length-2];
//            oldsId = oldIndex[oldIndex.length-1];
//            
//            var resultContainer = document.getElementById(foundElement.id);
//            //            console.log("resultContainer");
//            //            console.log(resultContainer);
//            createSubordinateData(oldId, oldsId, ed, resultContainer);
//        }
//    }
//    else
//    { 
//        var subResultContainer = document.createElement("div");
//        
//        // id defines which editor the subordinate is from and _subIndex is related to the hot tagged word that this subordinate is associated with
//        subResultContainer.id = "msm_subordinate_result-"+id+"-"+_subIndex;
//        subResultContainer.setAttribute("style","display:none;");
//    
//        createSubordinateData(id, _subIndex, ed, subResultContainer);
//        
//        _subIndex++;
//    }  
//}
//
//function createSubordinateData(id, sId, ed, subResultContainer)
//{   
//    console.log("id: "+id);
//    console.log("sId: "+sId);
//    console.log("ed: ");
//    console.log(ed);
//    console.log("subResultContainer: ");
//    console.log(subResultContainer);
//    
//    
//    var hasError = false;
//    var errorArray = [];
//    var infourl = null;
//    
//    $("#msm_subordinate-"+id+" textarea").each(function(){         
//        var childnodes = tinymce.get(this.id).getBody().childNodes;    
//        
//        var length = childnodes.length;
//         
//        // the childnodes array decreases in size as appendChild removes the first item of the 
//        // array every time.  
//        for(var i=0; i < length; i++)
//        {
//            this.appendChild(childnodes[0]);
//        }  
//        console.log("textarea in msm_subordinate-id");
//        console.log(this);
//    });   
//    
//    var subSelectVal = $("#msm_subordinate_select-"+id).val(); 
//    
//    console.log("subSelectVal: "+subSelectVal);
//      
//    $("#"+subResultContainer.id).empty();
//    
//    var selectChoiceContainer = document.createElement("div");
//    selectChoiceContainer.id = "msm_subordinate_select-"+id+"-"+sId;
// 
//    var selectChoiceContainerText = document.createTextNode(subSelectVal);
//    selectChoiceContainer.appendChild(selectChoiceContainerText);
//            
//    var infoTitleContainer = document.createElement("div");
//    infoTitleContainer.id = "msm_subordinate_infoTitle-"+id+"-"+sId;
//    
//    $('#msm_subordinate_infoTitle-'+id).clone(true).children().each(function() {       
//        infoTitleContainer.appendChild(this);
//    });  
//            
//    var infoContentContainer = document.createElement("div");
//    infoContentContainer.id = "msm_subordinate_infoContent-"+id+"-"+sId;
//    
//    var infoContentTextarea = document.getElementById("msm_subordinate_infoContent-"+id);   
//    
//    if(infoContentTextarea.hasChildNodes())
//    {
//        $('#msm_subordinate_infoContent-'+id).clone(true).children().each(function() {             
//            infoContentContainer.appendChild(this);
//        });         
//    }
//    else
//    {
//        hasError = true;
//        errorArray.push("#msm_subordinate_infoContent-"+id+"_ifr");
//    }
//      
//    //-----------------------------------------------------------------------------------//
//    switch(subSelectVal)
//    {
//        case "Information":
//            subResultContainer.appendChild(selectChoiceContainer);
//            subResultContainer.appendChild(infoTitleContainer);
//            subResultContainer.appendChild(infoContentContainer);
//            
//            console.log("Information branch: ");
//            console.log(subResultContainer);
//            break;
//            
//        case "External Link":
//            var urlInputValue = $("#msm_subordinate_url-"+id).val();
//            infourl = urlInputValue;
//            
//            //            if((urlInputValue.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/))||(urlInputValue.match(/(\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)))
//            //            if(urlInputValue.match(/(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/))
//            //            {
//            if(urlInputValue != '')
//            {
//                var urlContainer = document.createElement("div");
//                urlContainer.id = "msm_subordinate_url-"+id+"-"+sId;
//                        
//                var urlContainerText = document.createTextNode(urlInputValue);
//                urlContainer.appendChild(urlContainerText);
//                        
//                subResultContainer.appendChild(selectChoiceContainer);    
//                subResultContainer.appendChild(urlContainer);                   
//                subResultContainer.appendChild(infoTitleContainer);
//                subResultContainer.appendChild(infoContentContainer);
//            }
//            else
//            {
//                hasError = true;
//                errorArray.push("#msm_subordinate_url-"+id);
//            }
//            //            }
//            //            // invalid url was entered
//            //            else
//            //            {
//            //                console.log(errorArray);
//            //                
//            //                hasError = true;
//            //                errorArray.push("#msm_subordinate_url-"+id+"|invalidUrl");
//            //            }
//            //            
//           
//            break;
//            
//              
//        case "Internal Reference":
//            break;
//        case "External Reference":
//            break;     
//                
//    }
//    
//    if(!hasError)
//    {
//        
//        
//        // insert the div storing the result of subordinate form as nextsibling of textarea that triggered the subordinate plugin
//        var resultcontainer = document.getElementById("msm_subordinate_result_container-"+id);                
//        resultcontainer.appendChild(subResultContainer);
//        
//        var resultDialog = createInfoDialog(id+"-"+sId);
//        resultcontainer.appendChild(resultDialog);
//        
//        // swapping selected text as anchor element 
//        var selectedText = ed.selection.getContent();
//        
//        var selectedNode = null;
//        
//        if($.browser.msie)
//        {
//            selectedNode = ed.selection.getNode().childNodes[0].tagName;
//        }
//        else
//        {
//            selectedNode = ed.selection.getNode().tagName;
//        }
//       
//        if(selectedNode != "A")
//        {
//            if(infourl)
//            { 
//                ed.selection.setContent("<a href='http://"+infourl+"' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+id+"-"+sId+"' target='_blank'>"+selectedText+"</a>");    
//            }
//            else
//            {
//                //                console.dir("before switch at non anchor element");
//                //                console.dir(ed.selection.getNode());
//                
//                var newContent = "<a href='#' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+id+"-"+sId+"'>"+selectedText+"</a>";
//                ed.selection.setContent(newContent); 
//                
//            //                 console.dir("after switch at non anchor element");
//            //                 console.dir(ed.selection.getContent());
//                
//            }
//        }
//        
//        $('#msm_subordinate_container-'+id+" textarea").each(function() {
//            if(tinymce.getInstanceById($(this).attr("id")) != null)
//            {
//                tinymce.execCommand('mceFocus', false, $(this).attr("id"));  
//                tinymce.execCommand('mceRemoveControl', false, $(this).attr("id"));
//            }
//        });
//        
//        $('#msm_subordinate_container-'+id).dialog("close");    
//        
//    }
//    // null values are present
//    else
//    {  
//        nullErrorWarning(errorArray, id);
//    }
//   
//}
//
//function createInfoDialog(idNumber)
//{
//    var dialogDiv = document.createElement("div");
//    dialogDiv.id = "msm_subordinate_info_dialog-"+idNumber;
//    dialogDiv.className = "msm_subordinate_info_dialogs";
//
//    //    var titleElements = '';
//    //    $("#msm_subordinate_infoTitle-"+idNumber).clone(true).children().each(function() {
//    //        titleElements += this;
//    //    });    
//    //    
//    //    console.log($("#msm_subordinate_infoTitle-"+idNumber).html());
//    
//    dialogDiv.setAttribute("title", $("#msm_subordinate_infoTitle-"+idNumber).html());
//    
//    $("#msm_subordinate_infoContent-"+idNumber).clone(true).children().each(function() {
//        dialogDiv.appendChild(this); 
//    });
//    dialogDiv.setAttribute("style", "display:none;");
//    
//    return dialogDiv;
//}
//
//
//function loadValues(ed, id)
//{
//    var matchedElement;
//
//    var selected = ed.selection.getNode().nodeName;
//    
//    // previous value only exists if the node is already anchor element
//    // if it's just a plain text element, then there are no existing values to be considered
//    if(selected == 'A')
//    {
//        matchedElement = findSubordinateResult(ed.selection.getNode(), id);
//        
//        $("#"+matchedElement.id+" > div").each(function() {            
//            var divid = this.id.split("-");
//            var formid = '';
//            
//            // eliminate the last number in id that indicates which anchored element it belongs to
//            // b/c the editor id does not reflect this
//            
//            for(var i=0; i < divid.length-2; i++)
//            {
//                formid += divid[i]+"-"
//            }
//            formid += divid[divid.length-2];
//            
//            var formData = $(this).html();            
//            var editor = tinymce.get(formid);
//            
//            if(formid.match(/select/))
//            {
//                switch(formData)
//                {
//                    case "Information":
//                        changeForm("info", id);                        
//                        document.getElementById(formid).selectedIndex = 0;
//                        break;
//                    case "External Link":
//                        changeForm("url", id);
//                        document.getElementById(formid).selectedIndex = 1;
//                        break;
//                    case "Internal Reference":
//                        changeForm("ir", id);
//                        document.getElementById(formid).selectedIndex = 2;
//                        break;
//                    case "External Reference":
//                        changeForm("er", id);
//                        document.getElementById(formid).selectedIndex = 3;
//                        break;
//                }
//            }
//            
//            if(typeof editor != "undefined")
//            { 
//                var initialP = editor.dom.select('p');        
//                editor.dom.remove(initialP[0]);
//                
//                $(this).clone(true).children().each(function() {
//                    editor.getBody().appendChild(this);
//                });
//            }
//            
//            if(formid.match(/url/))
//            {
//                document.getElementById(formid).value = formData;
//            }
//        });
//        
//    }
//    // the element is not an anchor element --> empty out the form so user can fill it in again
//    else
//    {
//        // TODO need a function to eliminate nested anchor elements in the selected text
//        // cases:
//        // 1. user can have 2 separate words with one nested <a>
//        // 2. user cna have 3+ separate words highlighted together with 1+ nested <a> in any order
//        //        --> can also have middle of a word to middle of next word...etc
//        //        --> therefore no assumption on spacing...
//                
//                
//        //        var anchorElements = selected.getElementsByTagName("a");
//        //        
//        //        for(var i=0; i<anchorElements.length; i++)
//        //        {
//        //            var text = anchorElements[i].innerHTML;
//        //            ed.selection.replaceChild(text, anchorElements[i]);
//        //        }
//        //        //        // nested anchored element
//        //        //        if(ed.selection.getEnd().tagName == "A")
//        //        //        {            
//        //        //           
//        //        //        }
//        //        console.log("not anchor: "+ selected.tagName);
//        
//        var container = document.getElementById('msm_subordinate_content_form_container-'+id);
//        
//        // to prevent resetting the info form when it just was created in makeSubordinateDialog function
//        if(container.hasChildNodes())
//        {
//            $('#msm_subordinate_content_form_container-'+id).empty();
//            container.appendChild(makeInfoForm(id));
//            
//        }
//        
//    }
//    
//}
//
///**
//     *  This function finds the subordinate data submitted stored in the div and returns the 
//     *  HTML element itself. Used to load the information that were submitted by the user already and
//     *  allows for an editting function.
//     *  
//     *  @param selected    the element with highlighted text in editor
//     *  @param id          the id number attached to the div to specify the subordinate data in question
//     */
//function findSubordinateResult(selected, id)
//{    
//    var matchedElement;    
//    var selectedId = selected.id.split("-"); 
//    
//    $("#msm_subordinate_result_container-"+id + " > div").each(function() {
//        if(this.id.match(/result/))
//        {
//            var resultNumber = '';
//            var selectedNumber = '';
//    
//            var resultid = this.id.split("-"); 
//            
//            for(var i=1; i < resultid.length-1; i++)
//            {
//                resultNumber += resultid[i]+"-";
//            }
//            
//            for (var i=1; i < selectedId.length-1; i++)
//            {
//                selectedNumber += selectedId[i]+"-";
//            }
//                
//            resultNumber += resultid[resultid.length-1];
//            selectedNumber += selectedId[selectedId.length-1];
//            
//            if(resultNumber == selectedNumber)
//            {           
//                matchedElement = this;
//            }
//        }
//        
//    });
//        
//    return matchedElement;
//}