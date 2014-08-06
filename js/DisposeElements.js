/**
 * Class DisposeElements permet de disposer les éléments HMTL
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
	
	// Dispose la sc�ne threeJS
	WebglSceneManager.disposeScene();
        
	// dispose le template
	TemplateManager.disposeTemplate();
	
	setTimeout(function() {  TemplateManager.disposeTemplate(); }, 500 );
	
}

