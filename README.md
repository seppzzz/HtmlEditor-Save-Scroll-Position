# SilverStripe HTMLEditor Scroll Plugin

This Silverstripe TinyMCE plugin records the last scrolled or edited position within the HTML editor field, ensuring that when editing long content, you are automatically returned to your previous position. This prevents the need to manually search and scroll back after saving. Without this plugin, the editor typically resets to the top of the content after each save. Additionally, the plugin adds a "Scroll-To-Top" button to the TinyMCE toolbar for quick navigation to the top of the content.
 
 
## Requirements

SilverStripe 5 (tested with 5.2)
PHP 8.2 or higher

For Silverstripe 4.x use the main-branch.


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
