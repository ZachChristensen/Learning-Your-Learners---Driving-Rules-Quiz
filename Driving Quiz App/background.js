/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    {
      innerBounds: {
	  width: 500, 
	  height: 700,
	  maxWidth: 500,
	  maxHeight:700,
	  minWidth: 500,
	  minHeight:700
	  },
	  frame:{
		type:"chrome",
		color:"#115D96"
	  },
	  resizable:false
    }
  );
});