# SilverStripe HTMLEditor Scroll Plugin

 Provides a Silverstripe TinyMCE plugin that records the last scrolled or edited position in the HTML editor field. This is especially useful for editing long content, preventing the need to search and scroll to your previous position after saving.
 
 
## Requirements

SilverStripe 4 or 5 (tested with 4.13)
PHP 7.2 or higher


## Installation

You can install the module via Composer:

```sh

composer require seppzzz/html-editor-scroll

```

Alternatively, you can download the `.zip file` from GitHub, extract it, rename the extracted folder to `html-editor-scroll`, 
and copy it to your `vendor/seppzzz/` directory.

After installation, run the following commands to rebuild your SilverStripe project and expose the necessary assets:


```sh

# Rebuild the database and regenerate the manifest
vendor/bin/sake dev/build

# Expose the module's public assets
vendor/bin/vendor-expose

```



## Documentation


By default, every `HTMLEditorField` uses the default TinyMCEConfig `cms`. To enable this plugin for a custom TinyMCEConfig, add the following code to your SilverStripe configuration:



```sh

use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;
use SilverStripe\Core\Manifest\ModuleLoader;

// Load the module where the scroll plugin is located
$editorScrollModule = ModuleLoader::inst()->getManifest()->getModule('seppzzz/html-editor-scroll');

// Enable the scrollposition plugin in the custom TinyMCE configuration
TinyMCEConfig::get('mycustomconfig')->enablePlugins([
    'scrollposition' => $editorScrollModule->getResource('dist/javascript/mceplugin/editorscrollpos/scroll-pos-mce-plugin.js'),
]);

```
