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
		// met à jour la scène ThreeJS
		WebglSceneManager.disposeScene();
		
	});
	
	//Désactive tous les liens par défaut dans #html_content
	EventListenersManager.removeLinkEvent();
}
/**
 * Ajoute un écouteur sur le lien "Commencer l'aventure"
 * et charge l'introduction
 */
EventListenersManager.addHomepageEventListeners = function () {
	// BD Quand on clique sur "Démarrer l'aventure"
	$(document).on("click", "#startAdventure", function() {
		
		$(this).fadeOut();
		// Lance l'introduction
		ComicManager.intro();
		// Préchage la scène WebGL
		WebglSceneManager.init();
		// Masque la scène ThreeJS
		WebglSceneManager.hideWebglScene();
	});
}

/**
 * Désactive tous les liens par défaut dans #html_content
 */
EventListenersManager.removeLinkEvent = function () {
	
	// Désactive tous les liens par défaut dans #html_content
	$(document).on("click", "#html_content a", function(event) {
		event.preventDefault();
	});
}

/**
 * Ajoute un écouteur les slides de l'introduction
 * Affiche la slide suivante
 */
EventListenersManager.addIntroEventListeners = function () {
	// BD Quand on clique sur "Démarrer l'aventure"
	$(document).on("click", "#introImages img", function() {
		ComicManager.introDisplayNextCase();
	});
}

	