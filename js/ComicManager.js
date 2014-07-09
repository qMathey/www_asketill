/**
 * Class ComicManager permet de gérer les éléments.
 */

function ComicManager() {
}

// Static methods

/**
 * Charge l'accueil de la bande dessinée
 */
ComicManager.start = function() {
	// charge la homepage
	
	$.get("templates/homepage.html", function(reponse) {
		$("#html_wrapper").html(reponse);
	});
	
	// met le HTML en avant
	$("#html_wrapper").css("z-index", 30);
	$("#webgl_wrapper").css("z-index", 20);
	
}