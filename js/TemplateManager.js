/**
 * Class TemplateManager permet de gérer les templates du jeu
 */

function TemplateManager() {
}

// Constantes


// Propriétés

// Static methods

/**
 * Définit le curseur en mode pointer (link)
 * @returns {undefined}
 */
TemplateManager.setCursorPointer = function() {
    $("#webgl_wrapper").css("cursor", "pointer");
}
/**
 * Remet de le curseur par défaut
 * @returns {undefined}
 */
TemplateManager.setCursorDefault = function() {
    $("#webgl_wrapper").css("cursor", "default");
}

/**
 * Appelle le template de la forge
 */
TemplateManager.LoadTemplateForge = function() {
   
    TemplateManager.LoadTemplateHMTL("templates/zones/z6_forge.html");
}

/**
 * Charge un template HTML spécifié
 * @param URL du template
 * @returns {undefined}
 */
TemplateManager.LoadTemplateHMTL = function ( templateURL) {
    
    // chargement ajax du template
    $.get(templateURL, function(reponse) {
        // on sucess
        
        // Masque la scène ThreeJS
        WebglSceneManager.hideWebglScene();
        
        // fadeOut l'actuelle template
        $("#html_content").fadeOut(function(){
            // insert le template
            $("#html_content").html(reponse);
            $("#html_content").fadeIn();
        });        
    });
}
