/**
 * Class EventListenersManagers permet d'écouter tous les événements sur la page
 */


function EventListenersManager() {
}

// Static methods

/**
 * Initialise tous les écouteurs
 */
EventListenersManager.init = function () {
	// Menu
	$("#menu_mark").on("click", function() {
		// affiche ou masque le menu si besoins
		Menu.toggle();
	});
	
	// quand on redimensionne la fenêtre
	$(window).on("resize", function() {
		// replace le marqueur du menu
		Menu.disposeMark();
	});
}