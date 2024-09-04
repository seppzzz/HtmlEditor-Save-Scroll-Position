

// Tinymce 4 plugin for Silverstripe 4 //
// SCROLL TO OLD POSITION AFTER SAVING  //




(function() {
	tinymce.create('tinymce.plugins.scrollposition', {
		init:function(ed,url){
			
			var uniqueIdentifier = ed.getElement().getAttribute('data-unique-identifier');
			var uniqueKey = 'tinymceScrollPosition_' + uniqueIdentifier;
			
			//console.log('uniqueKey: ' + uniqueKey);

			ed.on('init', function() {
				
				var uniqueIdentifier = ed.getElement().getAttribute('data-unique-identifier');
				var uniqueKey = 'tinymceScrollPosition_' + uniqueIdentifier;

				// Use uniqueKey to store and retrieve scroll positions
				var savedScrollPosition = sessionStorage.getItem(uniqueKey);
				if (savedScrollPosition !== null) {
					var iframeWindow = ed.getWin();
					iframeWindow.scrollTo(0, parseInt(savedScrollPosition, 10));
				}
			});

			// Save scroll position when content changes, or the editor loses focus
			function saveScrollPosition(){
				var iframeWindow = ed.getWin();
				var scrollPosition = iframeWindow.scrollY;
				sessionStorage.setItem(uniqueKey,scrollPosition);
				//console.log('Saved scroll position: '+scrollPosition+' with key: '+uniqueKey);
			}

			ed.on('NodeChange',saveScrollPosition);
			ed.on('blur',saveScrollPosition);
			ed.on('PostProcess',saveScrollPosition);
			ed.on('BeforeUnload',saveScrollPosition);
			
			ed.addButton('scrollposition', {
				'title': 'Scroll Top',
				'classes': 'scroll-top-class',
				'onclick': function (e) {
					// Scroll to the top with a smooth animation
					var iframeWindow = ed.getWin();
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

		},

		getInfo:function(){
			return{
				longname: 'Scroll Position Plugin',
                author: '[seppzzz] Till Christoph Moser',
                authorurl: 'https://www.till.graphics/',
                version: "1.0"
			};
		}
	});

	tinymce.PluginManager.add('scrollposition',tinymce.plugins.scrollposition);
})();


