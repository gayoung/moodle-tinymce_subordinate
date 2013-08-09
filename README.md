Subordinate TinyMCE plugin
========================================================================================================================


This moodle tinyMCE plugin is needed to run the MSM module.
(link to the MSM module git repository:  https://github.com/OohooDevTeam/moodle-mod_msm)

The Subordinate plugin behaves similar to the link plugin for the TinyMCE editor in a way that it creates
anchor elements from the highlighted text.  However, it is different from the link element in that user can
add relevant content in a form of a popup window.  These popup windows are only triggered to show when the user
hovers over the anchor elements created from subordinate.  There are options to give URL for an external link and
also to reference materials created from MSM module.

========================================================================================================================

Installation:

1. Donwload the zip file from this repository.
2. Extract the files from the zip file then rename the folder to "subordinate" then rezip the file as "subordinate.zip".
3. To install this file in moodle, go to:
        Site Administration --> Plugins --> Install add-ons
4. Upload the "subordinate.zip" file as TinyMCE Plugin Type.
5. Navigate to:
        Site Administration --> Plugins --> Text Editors --> TinyMCE HTML Editor --> General Settings
6. Ensure that the Subordinate Plugin is enabled.
7. To add the subordinate button to the editor, add the "subordinate" keyword withint the Editor Toolbar field.
8. When creating content in MSM module, subordinate button should now appear in the tinyMCE.

** This plugin is developed to be used in the MSM module **

========================================================================================================================

Prerequisites:

- MSM module --> repository link: https://github.com/OohooDevTeam/moodle-mod_msm
- Matheditor TinyMCE plugin --> https://github.com/oohoo/moodle-tinymce_matheditor
