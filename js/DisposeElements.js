/**
 * Class DisposeElements permet de disposer les éléments HMTL
 */


function DisposeElements() {
}

// general vars
var menuHeight = 0;

// Static methods

/**
 * Initialise tous les écouteurs
 */
DisposeElements.init = function () {
	// place le marqueur du menu
	Menu.disposeMark();
	
	// ferme le menu par défaut
	Menu.$wrapper().css("height", Menu.closeHeight+"px");
	Menu.hide();
}