<?php

use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\Core\Manifest\ModuleLoader;


$editorScrollModule = ModuleLoader::inst()->getManifest()->getModule('seppzzz/html-editor-scroll');

TinyMCEConfig::get('cms')->enablePlugins([
    'scrollposition' => $editorScrollModule->getResource('dist/javascript/mceplugin/editorscrollpos/scroll-pos-mce-plugin.js'),
]);

//No Button needed !!
//TinyMCEConfig::get('cms')->insertButtonsAfter('unlink', 'scrollposition');