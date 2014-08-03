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
        
        // Initialise le gestionnaire sonore
        AudioManager.start();
        
        // DEV MODE 
        //$('head').append('<style type="text/css">.clickZone {background-color:red;opacity:0.5}</style>');
});
