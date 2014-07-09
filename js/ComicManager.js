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
	
}