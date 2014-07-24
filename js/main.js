/**
 * Point d'entrée de notre application JavaScript.
 * @author : Quentin Mathey
 */

$(document).ready(function() { // when document ready

	// Initialise les écouteurs d'événements
	EventListenersManager.init();
	
	// Dispose les éléments par défaut
	DisposeElements.init();
	
	// StartBD
        ComicManager.start();
	// Init WebGL
	//WebglSceneManager.init();
        
        // Initialise le gestionnaire sonore
        AudioManager.start();
});
