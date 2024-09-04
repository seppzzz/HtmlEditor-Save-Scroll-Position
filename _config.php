<?php

use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\Core\Manifest\ModuleLoader;


$editorScrollModule = ModuleLoader::inst()->getManifest()->getModule('seppzzz/html-editor-scroll');

TinyMCEConfig::get('cms')->enablePlugins([
    'scrollposition' => $editorScrollModule->getResource('dist/javascript/mceplugin/editorscrollpos/scroll-pos-mce-plugin.js'),
]);

//No Button needed !!
//TinyMCEConfig::get('cms')->insertButtonsAfter('unlink', 'scrollposition');

// Get the current buttons configuration
$currentButtons = TinyMCEConfig::get('cms')->getButtons();

// Add the 'scrollposition' button to the last position
$currentButtons[] = 'scrollposition';

// Set the new buttons configuration
//TinyMCEConfig::get('cms')->setButtons($currentButtons);

// Add the 'scrollposition' button to the last position of the toolbar
TinyMCEConfig::get('cms')->addButtonsToLine(2, 'scrollposition');