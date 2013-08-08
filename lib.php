<?php

/**
 * *************************************************************************
 * *                              Subordinate                             **
 * *************************************************************************
 * @package     tinymce                                                   **
 * @subpackage  subordinate                                               **
 * @name        Subordinate                                               **
 * @copyright   oohoo.biz                                                 **
 * @link        http://oohoo.biz                                          **
 * @author      Ga Young Kim                                              **
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later  **
 * *************************************************************************
 * ************************************************************************ */
defined('MOODLE_INTERNAL') || die();

class tinymce_subordinate extends editor_tinymce_plugin
{

    /** @var array list of buttons defined by this plugin */
    protected $buttons = array('subordinate');

    /**
     * Adjusts TinyMCE init parameters for this plugin. Required override.
     *
     * @param array $params TinyMCE init parameters array
     * @param context $context Context where editor is being shown
     * @param array $options Options for this editor
     */
    protected function update_init_params(array &$params, context $context, array $options = null)
    {

        $this->add_js_plugin($params);
    }

}