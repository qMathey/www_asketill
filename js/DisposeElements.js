/**
 * Class DisposeElements permet de disposer les �l�ments HMTL
 */


function DisposeElements() {
}

// general vars
var menuHeight = 0;

// Static methods

/**
 * Initialise tous les �couteurs
 */
DisposeElements.init = function () {
	// place le marqueur du menu
	Menu.disposeMark();
	
	// ferme le menu par d�faut
	Menu.$wrapper().css("height", Menu.closeHeight+"px");
	Menu.hide();
}