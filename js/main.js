/**
 * Point d'entrée de notre application JavaScript.
 * @author : Quentin Mathey
 */

$(document).ready(function() { // when document ready
	
	// initialise les écouteurs d'événements
	EventListenersManager.init();
	
	DisposeElements.init();
	
	// StartBD
	ComicManager.start();
});
