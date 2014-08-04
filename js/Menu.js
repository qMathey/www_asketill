/**
 * Class Menu permettant de gérer le menu
 */


function Menu() {
}

// Constantes
Menu.closeHeight = 54;
Menu.animSpeed = 400;

// Static methods

/**
 * Affiche le menu
 */
Menu.show = function () {
	// astuce pour récupérer la hauteur initiale du menu
	Menu.$wrapper().css("height", "auto");
	var menuHeight = Menu.$wrapper().height();
	Menu.$wrapper().css("height", Menu.closeHeight+"px");

	// anime l'ouverture du menu
	Menu.$wrapper().animate({
		height:menuHeight+"px"
	}, Menu.animSpeed);
	// ajoute l'info comme quoi le menu est visible
	Menu.$wrapper().data("isVisible", true);
}
/**
 * recupère l'objet jQuery contenant le menu
 * @return jQuery object contenant le div contenant le menu
 */
Menu.$wrapper = function () {
	return $("#menu_wrapper");
}
/**
 * recupère l'objet jQuery contenant le marqueur
 * @return jQuery object contenant le div contenant le menu
 */
Menu.$mark = function () {
	return $("#menu_mark");
}

/**
 * Masque le menu
 */
Menu.hide = function () {
	// anime la fermeture du menu
	Menu.$wrapper().animate({
		height: Menu.closeHeight+"px"
	}, Menu.animSpeed);
	// ajoute l'info comme quoi le menu est masqué
	Menu.$wrapper().data("isVisible", false);
}

/**
 * Affiche ou masque le menu lors de l'appel
 */
Menu.toggle = function () {
	// check if menu is visible
	if(Menu.$wrapper().data("isVisible") ){
		Menu.hide();
                
                // si les controles webGL sont définis, on les actives
                if(WebglSceneManager.controls != undefined) {
                    WebglSceneManager.controls.enabled = true;
                }
	} // if
	else {
		Menu.show();
                
                // si les controles webGL sont définis, on les desactive
                if(WebglSceneManager.controls != undefined) {
                    WebglSceneManager.controls.enabled = false;
                }
	} // else
}

/**
 * Place le marqueur du menu de façon centrée
 */
Menu.disposeMark = function () {
        
	// calcul la marge
	var marginLeft = Menu.$wrapper().width() / 2 - 25;
	// Place le marqueur du menu avec la marge calculée
	Menu.$mark().css("margin-left", marginLeft+"px");
        
}