
var _subIndex = 1;

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
    
    var fieldset = makeInfoForm(ed, id, false);
    
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
    
    var msmIdInfo = window.location.search.split("=");
    var msmId = msmIdInfo[1];
    
    var accordionContainer = document.createElement("div");

    var refString = '';
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
            accordionContainer.id = "msm_subordinate_accordion-"+id;
            container.appendChild(accordionContainer);
            makeRefForm(ed, id, '');
            refString = "Internal References";
            break;
        case 3:
            accordionContainer.id = "msm_subordinate_accordion-"+id;
            container.appendChild(accordionContainer);
            makeRefForm(ed, id, '');
            refString = "External References";
            break;
        
    }
    
    $("#msm_subordinate_accordion-"+id).accordion({
        heightStyle: "content",
        beforeActivate: function(e, ui) {
            if(ui.newPanel[0].id.match(/msm_info_accordion/))
            {
                $(".msm_subordinate_textareas").each(function() {
                    if(typeof tinymce.getInstanceById(this.id) === "undefined")
                    {
                        tinymce.execCommand("mceAddControl", true, this.id);
                    }                    
                });
            }
        }
    });
    $("#msm_search_submit").click(function(e) {
        submitAjax(refString, msmId, id, "subordinate");
    });
    
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

// existingRefId is given by msm_subordinate_ref-id result div and is a
// compositor ID for existing reference
function makeRefForm(ed, id, existingRefId)
{
    var infoAccordionHeader = $("<h3> Information Form </h3>");
    var infoFormFieldset = makeInfoForm(ed, id, true);
    var infoDiv = $("<div id='msm_info_accordion_container-"+id+"'></div>");
    
    $(infoDiv).append(infoFormFieldset);
    
    $("#msm_subordinate_accordion-"+id).append(infoAccordionHeader);
    $("#msm_subordinate_accordion-"+id).append(infoDiv);
    
    if(existingRefId == '')
    {
        var searchAccordionHeader = $("<h3> Search Form </h3>");
        var searchDiv = $("<div>\n\
                                <form id='msm_search_form'>\n\
                                    <label for='msm_search_type'>Type: </label>\n\
                                    <select id='msm_search_type' name='msm_search_type'>\n\
                                        <option value='definition'>Definition</option>\n\
                                        <option value='theorem'>Theorem</option>\n\
                                        <option value='comment'>Comment</option>\n\
                                        <option value='unit'>Unit</option>\n\
                                    </select>\n\
                                    <br /><br />\n\
                                    <label for='msm_search_word'>Search: </label>\n\
                                    <input id='msm_search_word' name='msm_search_word' style='width: 80%;'/>\n\
                                    <select id='msm_search_word_type' name='msm_search_word_type' style='margin-left: 1%;'>\n\
                                        <option value='title'>Title</option>\n\
                                        <option value='content'>Content</option>\n\
                                        <option value='description'>Description</option>\n\
                                        <option value='all'>Title/Content/Description</option>\n\
                                    </select>\n\
                                    <br /><br />\n\
                                    <input type='button' value='Search' id='msm_search_submit' class='msm_search_buttons'/>\n\
                                </form>\n\
                            </div>");
        
        $("#msm_subordinate_accordion-"+id).append(searchAccordionHeader);
        $("#msm_subordinate_accordion-"+id).append(searchDiv);
    
        var searchResultAccordionHeader = $("<h3> Search Results </h3>");
        var searchResultAccordionDiv = $("<div id='msm_search_result'></div>");
    
        $("#msm_subordinate_accordion-"+id).append(searchResultAccordionHeader);
        $("#msm_subordinate_accordion-"+id).append(searchResultAccordionDiv);
    
        $("input#msm_search_word").css("width", "75%");
    }
    else
    {
        var displayHeader = $("<h3> Current Reference Material </h3>");
        var displayDiv = $("<div id='msm_subordinate_ref_display'></div>");
        $("#msm_subordinate_accordion-"+id).append(displayHeader);
        $("#msm_subordinate_accordion-"+id).append(displayDiv);
        
        $.ajax({
            type: 'POST',
            url:"editorCreation/msmLoadUnit.php",
            data: {
                loadRefId: existingRefId
            },
            success: function(data)
            {
                var htmlString = JSON.parse(data);
                
                $("#msm_subordinate_ref_display").append(htmlString);
                
                $("#msm_subordinate_ref_display .msm_info_dialogs").dialog({
                    autoOpen: false,
                    height: "auto",
                    modal: false,
                    width: 605
                });
                                
                $("#msm_subordinate_ref_display").find(".msm_subordinate_hotwords").each(function(i, element) {
                    var idInfo = this.id.split("-");
                    var newid = '';
                                                    
                    for(var i=1; i < idInfo.length-1; i++)
                    {
                        newid += idInfo[i]+"-";
                    }
                                                        
                    newid += idInfo[idInfo.length-1];
                                                                           
                    previewInfo(this.id, "dialog-"+newid);
                                                        
                    previewInfo(this.id, "dialog-"+newid);
                   
                });
            }
        });
    }
}

function initInfoEditor(id)
{
    var titleid = "msm_subordinate_infoTitle-"+id;
    var contentid = "msm_subordinate_infoContent-"+id;
    
    YUI().use('editor_tinymce', function(Y) {
        M.editor_tinymce.init_editor(Y, titleid, {
            mode:"exact",
            elements: titleid,
            plugins:"matheditor,safari,table,style,layer,advhr,advlist,emotions,inlinepopups,searchreplace,paste,directionality,fullscreen,nonbreaking,contextmenu,insertdatetime,save,iespell,preview,print,noneditable,visualchars,xhtmlxtras,template,pagebreak,-dragmath,-moodlenolink,-spellchecker,-moodleimage,-moodlemedia",
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
            theme_advanced_buttons3:"bullist,numlist,outdent,indent,|,image,moodlemedia,matheditor,nonbreaking,charmap,table,|,code,spellchecker",
            moodle_init_plugins:"dragmath:loader.php/dragmath/-1/editor_plugin.js,moodlenolink:loader.php/moodlenolink/-1/editor_plugin.js,spellchecker:loader.php/spellchecker/-1/editor_plugin.js,moodleimage:loader.php/moodleimage/-1/editor_plugin.js,moodlemedia:loader.php/moodlemedia/-1/editor_plugin.js,matheditor:loader.php/matheditor/-1/editor_plugin.js",
            file_browser_callback:"M.editor_tinymce.filepicker",
            moodle_plugin_base: M.cfg.wwwroot+"/lib/editor/tinymce/plugins/"
        })
        
        M.editor_tinymce.init_filepicker(Y, id, tinymce_filepicker_options);
    });
    
    YUI().use('editor_tinymce', function(Y) {
        M.editor_tinymce.init_editor(Y, contentid, {
            mode:"exact",
            elements: contentid,
            plugins:"matheditor,safari,table,style,layer,advhr,advlist,emotions,inlinepopups,subordinate,searchreplace,paste,directionality,fullscreen,nonbreaking,contextmenu,insertdatetime,save,iespell,preview,print,noneditable,visualchars,xhtmlxtras,template,pagebreak,-dragmath,-moodlenolink,-spellchecker,-moodleimage,-moodlemedia",
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
            theme_advanced_buttons3:"bullist,numlist,outdent,indent,|,subordinate,|,image,moodlemedia,matheditor,nonbreaking,charmap,table,|,code,spellchecker",
            moodle_init_plugins:"dragmath:loader.php/dragmath/-1/editor_plugin.js,moodlenolink:loader.php/moodlenolink/-1/editor_plugin.js,spellchecker:loader.php/spellchecker/-1/editor_plugin.js,moodleimage:loader.php/moodleimage/-1/editor_plugin.js,moodlemedia:loader.php/moodlemedia/-1/editor_plugin.js,matheditor:loader.php/matheditor/-1/editor_plugin.js,subordinate:loader.php/subordinate/-1/editor_plugin.js",
            file_browser_callback:"M.editor_tinymce.filepicker",
            moodle_plugin_base: M.cfg.wwwroot+"/lib/editor/tinymce/plugins/"
        })
        
        M.editor_tinymce.init_filepicker(Y, contentid, tinymce_filepicker_options);
    });
}

function makeInfoForm(ed, id, refFlag)
{
    // making a fieldset element for the info form (all selection will be using it
    // so make it available to all switch cases)
    var fieldset = document.createElement("fieldset");
    if(!refFlag)
    {
        fieldset.setAttribute("style", "border:1px solid black; padding: 2%; margin-top: 1%;");

        var infoLegend = document.createElement("legend");
        var legendText = document.createTextNode("Subordinate Information Form");
        infoLegend.appendChild(legendText);
    }
        
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
   
    if(!refFlag)
    {
        fieldset.appendChild(infoLegend);
    }
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
    var selectedAnchorIdInfo = null;
    
    var indexId = '';
    
    // responsible for loading already existing subordinate values after view.php is triggered
    $(document).find(".msm_subordinate_results").each(function() {
        $(this).find(".msm_subordinate_hotword_matchs").each(function() {
            if(editor.selection.getNode().id == $(this).text())
            {
                selectedAnchorIdInfo = this.id.split("-");
                
                for(var i=1; i < selectedAnchorIdInfo.length-1; i++)
                {
                    indexId += selectedAnchorIdInfo[i] + "-";
                }
                indexId += selectedAnchorIdInfo[selectedAnchorIdInfo.length-1];
            }
        });
    });
    
    if(indexId == '')
    {
        selectedAnchorIdInfo = editor.selection.getNode().id.split("-");
            
        for(var i=1; i < selectedAnchorIdInfo.length-1; i++)
        {
            indexId += selectedAnchorIdInfo[i] + "-";
        }
        indexId += selectedAnchorIdInfo[selectedAnchorIdInfo.length-1];
    }
    
    var prevSelectValue = null;
    var prevUrlValue = null;
    var prevInfoTitleValue = null;
    var prevInfoContentValue = null;
    var prevRefId = null;
   
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
            // to process the math elements to load it properly
            $(this).find(".matheditor").each(function() {
                var newcontent = '';
                $(this).find("script").each(function() {
                    newcontent = $(this).html();
                });
          
                $(this).empty();
                $(this).append(newcontent);
            });
            prevInfoContentValue = $(this).html();
        }
        else if(this.id == 'msm_subordinate_ref-'+indexId)
        {
            prevRefId = $(this).text();
        }
    });
            
    var select = document.getElementById("msm_subordinate_select-"+id);
        
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
    
    if((prevRefId != '')&&(prevRefId != 'undefined')&&(prevRefId !== null))
    {
        var container = $("#msm_subordinate_content_form_container-"+id);
        
        $('#msm_subordinate_content_form_container-'+id+" textarea").each(function() {
            if(tinymce.getInstanceById($(this).attr("id")) != null)
            {
                tinymce.execCommand('mceFocus', false, $(this).attr("id"));
                tinymce.execCommand('mceRemoveControl', false, $(this).attr("id"));
            }
        });
        
        $(container).empty(); // has info title/content textarea already appended
        
        var accordionContainer = document.createElement("div");
        accordionContainer.id = "msm_subordinate_accordion-"+id;
        $(container).append(accordionContainer)
        makeRefForm(editor, id, prevRefId);

        var msmIdInfo = window.location.search.split("=");
        var msmId = msmIdInfo[1];
        $("#msm_search_submit").click(function(e) {
            submitAjax(prevSelectValue, msmId, id, "subordinate");
        });
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
            tinymce.EditorManager.execCommand('mceFocus', false, $(this).attr("id"));
            tinymce.EditorManager.execCommand('mceRemoveControl', false, $(this).attr("id"));
        }
    });
    
    $('#msm_subordinate_container-'+id).empty();
    $('#msm_subordinate_container-'+id).dialog("close");
}

/**
 * tinyMCE object ed --> the id of the editor where the popup was triggered from
 * string id --> ending of HTML ID of the subordinate components to make them unique
 * string subId
 */
function submitSubForm(ed, id, subId)
{
    var selectedText = ed.selection.getContent({
        format: 'text'
    });
            
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
        newSubordinateDiv = createSubordinateDiv(id, id+"-"+_subIndex, '');
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
        
        newSubordinateDiv = replaceSubordinateDiv(id, textId, subId);
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
        
        if(subId != '')
        {
            var subparent = findParentDiv(subId);
            $(subparent).find(".msm_subordinate_result_containers").eq(0).append(newSubordinateDiv);

        }
        else
        {
            $("#msm_subordinate_result_container-"+id).append(newSubordinateDiv);
        }
    
        
        var urltext = '';
        if($("#msm_subordinate_select-"+id).val() == 'External Link')
        {
            urltext = $("#msm_subordinate_url-"+id).val();
        }
        
        var newContent = '';
        if(selectedNode != "A")
        {
            if((urltext != '') &&(urltext != null) &&(typeof urltext !== "undefined"))
            {
                newContent = "<a href='"+$.trim(urltext)+"' target='_blank' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+subIndex+"'>"+$.trim(selectedText)+"</a> ";
            }
            else
            {
                newContent = "<a href='#' class='msm_subordinate_hotwords' id='msm_subordinate_hotword-"+subIndex+"'>"+$.trim(selectedText)+"</a> ";
            }
           
            ed.selection.setContent(newContent);
        }
        closeSubFormDialog(id);
    }
   
}

function replaceSubordinateDiv(index, hotId, subId)
{
    var subparent = null;
    
    // top subordinate with nested subordinates do not have subId defined
    // but can use its id to get the parent(def/theorem...etc) Div id
    if(subId == '')
    {
        subparent = findParentDiv(index);
    }
    else
    {
        subparent = findParentDiv(subId);
    }
    // after the subordinate is saved the hotId ending is previous values before the HTML IDs for the subordinate divs were replaced
    // with the database ID values.  So if that's the case then this function will not be finding the old
    // subordinate values to replace.
    var foundDiv = false;
    // need grab the parent to get the id of the result container
    // (this generic code allows the plugin to have nested subordinates)
    $(subparent).find(".msm_subordinate_result_containers").eq(0).children("div").each(function() {
        if(this.id == "msm_subordinate_result-"+hotId)
        {
            foundDiv = true;
            $(this).empty().remove();
        }
    });
    
    // possibility of result container HTML ID ending is pre-database ID
    // before save into db, incrementing numbers were added to keep the div unique
    // after save into db, it contains the database ID
    if(!foundDiv)
    {
        var newId = '';
        $(subparent).find(".msm_subordinate_result_containers").eq(0).children("div").each(function() {           
            $(this).find(".msm_subordinate_hotword_matchs").each(function() {
                var oldmatch = $(this).text();   
                var oldmatchInfo = oldmatch.split("-");                    
                var oldId = oldmatchInfo[1];
                for(var i=2; i < oldmatchInfo.length; i++)
                {
                    oldId += "-"+oldmatchInfo[i];
                }    
                
                if(oldId == hotId)
                {
                    var newIdInfo = this.id.split("-");
                    
                    newId = newIdInfo[1];
                    for(var i=2; i < newIdInfo.length; i++)
                    {
                        newId += "-"+newIdInfo[i];
                    }
                }
            });
            
            if(this.id == "msm_subordinate_result-"+newId)
            {
                $(this).empty().remove();
            }
            
        });
    }
   
    var subordinateResultContainer = createSubordinateDiv(index, hotId, "replace");
    
    return subordinateResultContainer;
}

function createSubordinateDiv(index, oldidString, flag)
{
    var idString = '';
    var errorArray = [];
    
    // no need to check for duplicate id if replacing already existing one...
    if(flag == '')
    {
        var oldidStringInfo = oldidString.split("-");
    
        idString = checkForExistence(oldidString) + "-" + oldidStringInfo[oldidStringInfo.length-1];
    }
    else if(flag == "replace")
    {
        idString = oldidString;
    }
        
    var resultContainer = document.createElement("div");
    resultContainer.id = "msm_subordinate_result-"+idString;
    resultContainer.className = "msm_subordinate_results";
    
    $("#msm_subordinate-"+index+" textarea").each(function(){
        this.value = tinymce.get(this.id).getContent({
            format: "html"
        });
       
        // if no match is found, indexOf returns -1
        var isInfoTitle = this.id.indexOf("infoTitle");
       
        if((this.value == '') && (isInfoTitle == -1))
        {
            errorArray.push(this.id+"_ifr");
        }
    });
    
    var selectedBox = $("#msm_search_result_table input").filter(":checked");
    // no selection made in search result --> meaning only infotitle/info contents are filled.
    // so switch select value to information
    if(errorArray.length == 0)
    {
        var resultSelectDiv = document.createElement("div");
        resultSelectDiv.id = "msm_subordinate_select-"+idString;
        
        var selectedValue= $("#msm_subordinate_select-"+index).val();
        
        if((selectedBox.length == 0) && ((selectedValue == "Internal Reference") || (selectedValue == "External Reference")))
        {
            selectedValue == "information";
        }
        
        var resultSelectText = document.createTextNode(selectedValue);
            
        resultSelectDiv.appendChild(resultSelectText);
        
        var resultUrlDiv = null;
        
        if($("#msm_subordinate_select-"+index).val() == 'External Link')
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
       
        $("#msm_subordinate_infoContent-"+index).find(".matheditor").each(function() {
            var newcontent = '';
            $(this).find("script").each(function() {
                newcontent = $(this).html();
            });
          
            $(this).empty();
            $(this).append("\("+newcontent+"\)");
        });
        $(resultContentDiv).append($("#msm_subordinate_infoContent-"+index).val());
        
        // for internal/external reference values to be stored
        
        var refValueDiv='';
        
        if(selectedBox.length > 0)
        {
            refValueDiv = document.createElement("div");
            refValueDiv.id = "msm_subordinate_ref-"+idString;
        
            var selectedRow = $(selectedBox).closest("tr");
            var selectedCells = $(selectedRow).find(".msm_search_result_table_cells");
            var selectedCheckbox = $(selectedCells[0]).find("input");
                    
            var selectedId = $(selectedCheckbox[0]).attr("id").split("-");
            
            var refValueText = document.createTextNode(selectedId[1]);
            $(refValueDiv).append(refValueText);
        }
        
        // inserting all parts of the subordinate result values into the container div
        resultContainer.appendChild(resultSelectDiv);
        if(resultUrlDiv != null)
        {
            resultContainer.appendChild(resultUrlDiv);
        }
        resultContainer.appendChild(resultTitleDiv);
        resultContainer.appendChild(resultContentDiv);
        
        if(selectedBox.length > 0)
        {
            resultContainer.appendChild(refValueDiv);
        }
        
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

function checkForExistence(oldtestId)
{
    var newTestId = '';
    
    var testIdInfo = oldtestId.split("-");
    var testId = testIdInfo[0];
         
    for(var i = 1; i <= testIdInfo.length-2; i++)
    {
        testId += "-"+testIdInfo[i] ;
    }
    
    newTestId = testId;
        
    $("#msm_child_appending_area").find(".msm_subordinate_results").each(function() {
        var existingIdInfo = this.id.split("-");
        var existingId = '';
         
        for(var i = 1; i < existingIdInfo.length-1; i++)
        {
            existingId += existingIdInfo[i] + "-";
        }
        existingId += existingIdInfo[existingIdInfo.length-1];
             
        if(oldtestId == existingId)
        {
            var lastChar = testId.charAt(testId.length-1);
            var newlastchar = parseInt(lastChar)+1;
            newTestId = testId.substring(0, testId.length-1) + newlastchar;
            checkForExistence(newTestId);
        }
    });
    
    return newTestId;
}

function createDialog(ed, idNumber, subId)
{
    // to fix the dialog window size to 80% of window size
    var wWidth = $(window).width();
    var wHeight = $(window).height();
                
    var dWidth = wWidth*0.6;
    var dHeight = wHeight*0.8;
                
    $('#msm_subordinate_container-'+idNumber).dialog({       
        modal:true,
        autoOpen: false,
        height: dHeight,
        width: dWidth,
        closeOnEscape: false,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close").hide(); // disabling the close button
            $("#msm_subordinate_highlighted-"+idNumber).val(ed.selection.getContent({
                format : 'text'
            }));
            $("#msm_subordinate_accordion-"+idNumber).accordion({
                heightStyle: "content",
                beforeActivate: function(e, ui) {
                    if(ui.newPanel[0].id.match(/msm_info_accordion/))
                    {
                        $(".msm_subordinate_textareas").each(function() {
                            if(typeof tinymce.getInstanceById(this.id) === "undefined")
                            {
                                tinymce.execCommand("mceAddControl", true, this.id);
                            }                    
                        });
                    }
                }
            });
            initInfoEditor(idNumber);
        },
        buttons: {
            "Save": function() {
                submitSubForm(ed, idNumber, subId);
            },
            "Cancel": function() {
                closeSubFormDialog(idNumber);
            }
        }
    });
    //    $('#msm_subordinate_container-'+idNumber).css('display', 'block');
    $('#msm_subordinate_container-'+idNumber).dialog('open').css('display', 'block');
}

function findParentDiv(idEnding)
{   
    var parent = null;
    var matchInfo = null;
    var typeId = null;
    
    var defPattern = /^\S*(defcontent\d+\S*)$/;
    var defrefPattern = /^\S*(defrefcontent\d+\S*)$/;
    var statementTheoremPattern = /^\S*(statementtheoremcontent\d+\S*)$/;
    var statementTheoremRefPattern = /^\S*(theoremrefcontent\d+\S*)$/;
    var partTheoremPattern = /^\S*(parttheoremcontent\d+\S*)$/;
    var partTheoremRefPattern = /^\S*(theoremrefpart\d+\S*)$/;
    var commentPattern = /^\S*(commentcontent\d+\S*)$/;
    var commentrefPattern = /^\S*(commentrefcontent\d+\S*)$/;
    var bodyPattern = /^\S*(bodycontent\d+\S*)$/;
    var introPattern = /^\S*(introcontent\d+\S*)$/;
    var introChildPattern = /^\S*(introchild\d+\S*)$/;
    var extraInfoPattern = /^\S*(extracontent\d+\S*)$/;
    var associatePattern = /^\S*(infocontent\d+\S*)$/;
    
    var defmatch = idEnding.match(defPattern);
    var defrefmatch = idEnding.match(defrefPattern);
    var statementmatch = idEnding.match(statementTheoremPattern);
    var statementrefmatch = idEnding.match(statementTheoremRefPattern);
    var partmatch = idEnding.match(partTheoremPattern);
    var partrefmatch = idEnding.match(partTheoremRefPattern);
    var commentmatch = idEnding.match(commentPattern);
    var commentrefmatch = idEnding.match(commentrefPattern);
    var bodymatch = idEnding.match(bodyPattern);
    var intromatch = idEnding.match(introPattern);
    var introchildmatch = idEnding.match(introChildPattern);
    var extracontentmatch = idEnding.match(extraInfoPattern);
    var associatematch = idEnding.match(associatePattern);
    
    // parent needs to be whatever div contains the object in
    // msm_subordinate_result_containers class (usually the
    // copied_msm_structural_elements class)
    
    if(defmatch)
    {
        matchInfo = defmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        parent = document.getElementById("copied_msm_def-"+typeId);
    }
    if(defrefmatch)
    {
        matchInfo = defrefmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        typeId += "-"+matchInfo[1]+"-"+matchInfo[2];
        
        parent = document.getElementById("copied_msm_defref-"+typeId);
    }
    else if(commentmatch)
    {
        matchInfo = commentmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        parent = document.getElementById("copied_msm_comment-"+typeId);
    }
    else if(commentrefmatch)
    {
        matchInfo = commentrefmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*-?)(\d+)/, "$2");
        typeId += "-"+matchInfo[1]+"-"+matchInfo[2];
        
        parent = document.getElementById("copied_msm_commentref-"+typeId);
    }
    else if(bodymatch)
    {
        matchInfo = bodymatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        parent = document.getElementById("copied_msm_body-"+typeId);
    }
    else if(intromatch)
    {
        matchInfo = intromatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        parent = document.getElementById("copied_msm_intro-"+typeId);
    }
    else if(introchildmatch)
    {
        matchInfo = introchildmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        parent = document.getElementById("msm_intro_child_div-"+typeId);
    }
    else if(extracontentmatch)
    {
        matchInfo = extracontentmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        parent = document.getElementById("copied_msm_extra_info-"+typeId);
    }
    else if(associatematch)
    {
        matchInfo = associatematch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        typeId += "-"+matchInfo[1];
        
        parent = document.getElementById("msm_associate_childs-"+typeId);
    }
    else if (statementmatch)
    {
        matchInfo = statementmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        
        $(".copied_msm_structural_element").each(function() {
            var currentIdInfo = this.id.split("-");
            $(this).find(".msm_subordinate_result_containers").each(function() {
                var resultIdInfo = this.id.split("-");
                
                var resultIdEnding = resultIdInfo[1].replace(/(statementtheoremcontent)(\d+)/, "$2");
                
                if(typeId == resultIdInfo[2])
                {
                    if(currentIdInfo[1] == resultIdEnding)
                    {
                        typeId = resultIdEnding;
                    }
                }
            });
        });
        
        parent = document.getElementById("copied_msm_theorem-"+typeId);
    }
    else if(statementrefmatch)
    {
        matchInfo = statementrefmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        typeId += "-"+matchInfo[1]+"-"+matchInfo[2];
        parent = document.getElementById("copied_msm_theoremref-"+typeId);
    }
    else if(partmatch)
    {
        matchInfo = partmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        typeId += "-"+matchInfo[1];
        parent = document.getElementById("msm_theorem_statement_container-"+typeId);
    }
    else if(partrefmatch)
    {
        matchInfo = partrefmatch[0].split("-");
        typeId = matchInfo[0].replace(/([A-Za-z]*?)(\d+)/, "$2");
        typeId += "-"+matchInfo[1]+"-"+matchInfo[2]+"-"+matchInfo[3];
        
        parent = document.getElementById("msm_theoremref_statement_container-"+typeId);
    }
    
    return parent;
}

function isExistingIndex(oldid)
{
    var newId = '';
    var existingDiv = document.getElementById("msm_subordinate_container-"+oldid);
    var existinghotword = document.getElementById("msm_subordinate_hotword-"+oldid);
   
    if((existingDiv)||(existinghotword))
    {
        var oldidInfo = oldid.split("-");
        
        var idInt = parseInt(oldidInfo[oldidInfo.length-1])+1;
           
        newId = oldidInfo[0]+"-"+idInt;
           
        newId = isExistingIndex(newId);
    }
    else
    {
        newId = oldid;
    }
    
    return newId;
}

// replaces temporary HTML id given before view.php with database id after view.php script is triggered
function replaceIdEnding(ed, edIdInfo)
{
    var pattern = /([A-Za-z]*?)(\d+)((?:-\d+)*)/;
    var tempString = '';
    // nested subordinates in statement theorem needs to match the statement theorem id not theorem id
    var statementTheoremmatch = /^\S*(statementtheoremcontent\d+\S*)$/;
    var statementTheoremRefmatch = /^\S*(theoremrefcontent\d+\S*)$/;
    var partTheoremmatch = /^\S*(parttheoremcontent\d+\S*)$/;
    var partTheoremRefmatch = /^\S*(theoremrefpart\d+\S*)$/;
    var associatematch = /^\S*(infocontent\d+\S*)$/;
    var refmatch = /^\S*((defrefcontent|commentrefcontent)\d+\S*)/;
    var idReplacement = '';
    if(ed.editorId.match(statementTheoremmatch))
    {
        var subordinatematch = /^\S*(subordinateinfoContent)+(statementtheoremcontent\d+\S*)$/;
                
        if(ed.editorId.match(subordinatematch))
        {
            idReplacement = edIdInfo[1].replace(pattern, "$2");
        }
        else
        {
            for(var i = 1; i < edIdInfo.length-1; i++)
            {
                tempString += edIdInfo[i] + "-";
            }
            tempString += edIdInfo[edIdInfo.length-1];
                    
            var tempidReplacement = tempString.replace(pattern, "$3");
                    
            var tempStringInfo = tempidReplacement.split("-");
                    
            idReplacement = tempStringInfo[1];
        }
    }
    else if(ed.editorId.match(partTheoremmatch))
    {
        var partpattern = /([A-Za-z]*?)(\d+-\d+-\d+)((?:-\d+)*)/;
        for(var i = 1; i < edIdInfo.length-1; i++)
        {
            tempString += edIdInfo[i] + "-";
        }
        tempString += edIdInfo[edIdInfo.length-1];
                    
        idReplacement = tempString.replace(partpattern, "$2");
    }
    else if(ed.editorId.match(associatematch))
    {
        var assopattern = /([A-Za-z]*?)(\d+-\d+)((?:-\d+)*)/;
        for(var i = 1; i < edIdInfo.length-1; i++)
        {
            tempString += edIdInfo[i] + "-";
        }
        tempString += edIdInfo[edIdInfo.length-1];
                    
        idReplacement = tempString.replace(assopattern, "$2");
    }
    else if(ed.editorId.match(refmatch))
    {
        var refpattern = /([A-Za-z]*?)(\d+-\d+-\d+)((?:-\d+)*)/;
        for(var i = 1; i < edIdInfo.length-1; i++)
        {
            tempString += edIdInfo[i] + "-";
        }
        tempString += edIdInfo[edIdInfo.length-1];
                    
        idReplacement = tempString.replace(refpattern, "$2");
    }
    else if(ed.editorId.match(statementTheoremRefmatch))
    {
        var theoremcontentrefpattern = /([A-Za-z]*?)(\d+-\d+-\d+-\d+)((?:-\d+)*)/;
        for(var i = 1; i < edIdInfo.length-1; i++)
        {
            tempString += edIdInfo[i] + "-";
        }
        tempString += edIdInfo[edIdInfo.length-1];
                    
        idReplacement = tempString.replace(theoremcontentrefpattern, "$2");
    }
    else if(ed.editorId.match(partTheoremRefmatch))
    {
        var theorempartrefpattern = /([A-Za-z]*?)(\d+-\d+-\d+-\d+-\d+)((?:-\d+)*)/;
        for(var i = 1; i < edIdInfo.length-1; i++)
        {
            tempString += edIdInfo[i] + "-";
        }
        tempString += edIdInfo[edIdInfo.length-1];
                    
        idReplacement = tempString.replace(theorempartrefpattern, "$2");
    }
    else
    {
        idReplacement = edIdInfo[1].replace(pattern, "$2");
    }
            
    return idReplacement;
}