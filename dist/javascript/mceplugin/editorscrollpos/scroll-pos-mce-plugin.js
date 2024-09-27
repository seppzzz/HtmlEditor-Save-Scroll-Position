

// Tinymce 5 plugin for Silverstripe 5 //
// SCROLL TO OLD POSITION AFTER SAVING  //


// To add a simple arrow icon:
//editor.ui.registry.addIcon('arrowUp', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"/></svg>');
/*

<svg style="width: 1em" id="iconDemo-arrow-up" viewBox="0 0 1024 1024">
<title>arrow-up</title>
<path ng-repeat="path in glyph.paths" class="path0" mi-d="M512 32l-480 480h288v512h384v-512h288z" opacity="0.3" d="M512 32l-480 480h288v512h384v-512h288z" stroke="inherit"></path>
</svg>


editor.ui.registry.addButton('scrollposition', {
  text: 'Add Video' ,
  icon: 'arrowUp',
  onAction: () => {
    // do stuff here...
  }
});
*/



(function() {
	// Create the plugin
	tinymce.PluginManager.add('scrollposition', function(editor, url) {
		var uniqueIdentifier = editor.getElement().getAttribute('data-unique-identifier');
		var uniqueKey = 'tinymceScrollPosition_' + uniqueIdentifier;

		// Use uniqueKey to store and retrieve scroll positions
		editor.on('init', function() {
			var savedScrollPosition = sessionStorage.getItem(uniqueKey);
			if (savedScrollPosition !== null) {
				var iframeWindow = editor.getWin();
				iframeWindow.scrollTo(0, parseInt(savedScrollPosition, 10));
			}
		});

		// Save scroll position when content changes, or the editor loses focus
		function saveScrollPosition() {
			var iframeWindow = editor.getWin();
			var scrollPosition = iframeWindow.scrollY;
			sessionStorage.setItem(uniqueKey, scrollPosition);
			//console.log('Saved scroll position: ' + scrollPosition + ' with key: ' + uniqueKey);
		}

		editor.on('NodeChange', saveScrollPosition);
		editor.on('blur', saveScrollPosition);
		editor.on('PostProcess', saveScrollPosition);
		editor.on('BeforeUnload', saveScrollPosition);
		
		editor.ui.registry.addIcon('arrowUp', '<svg style="width: 1em" id="iconDemo-arrow-up" viewBox="0 0 1024 1024"><title>arrow-up</title><path ng-repeat="path in glyph.paths" class="path0" mi-d="M512 32l-480 480h288v512h384v-512h288z" opacity="0.8" d="M512 32l-480 480h288v512h384v-512h288z" stroke="inherit"></path></svg>');

		// Add a button to scroll to the top
		editor.ui.registry.addButton('scrollposition', {
			icon: 'arrowUp', // Use an icon, you can customize this // icon: ' fa fa-camera-retro', // notice a space before the 'fa'
			tooltip: 'Scroll Top',
			onAction: function () {
				// Scroll to the top with a smooth animation
				var iframeWindow = editor.getWin();
				var startPosition = iframeWindow.scrollY;
				var duration = 600; // Duration in ms (e.g., 600ms)
				var startTime = null;

				function scrollStep(timestamp) {
					if (!startTime) startTime = timestamp;
					var progress = timestamp - startTime;
					var percentage = Math.min(progress / duration, 1);
					iframeWindow.scrollTo(0, startPosition * (1 - percentage));

					if (progress < duration) {
						window.requestAnimationFrame(scrollStep);
					}
				}

				window.requestAnimationFrame(scrollStep);
			}
		});

		// Return metadata about the plugin
		return {
			getMetadata: function() {
				return {
					name: 'Scroll Position Plugin',
					url: 'https://www.till.graphics/'
				};
			}
		};
	});
})();




