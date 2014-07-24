/**
 * Class TemplateManager permet de gérer les templates du jeu
 */

function TemplateManager() {
}

// Constantes


// Propriétés
// note la location
TemplateManager.previousLocation = undefined;
TemplateManager.currentLocation = undefined;

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
TemplateManager.LoadTemplateZ6 = function() {
   
    TemplateManager.LoadTemplateHMTL("templates/zones/Z6/z6_marche.html");
}

/**
 * Appelle le template de la forge
 */
TemplateManager.LoadTemplateZ6I4 = function() {
   
    TemplateManager.LoadTemplateHMTL("templates/zones/z6_forge.html");
}



/**
 * Charge un template HTML spécifié
 * @param URL du template
 * @returns {undefined}
 */
TemplateManager.LoadTemplateHMTL = function ( templateURL ) {
    
    // chargement ajax du template
    $.get(templateURL, function(reponse) {
        // on sucess
        
        // note la location précédente
        TemplateManager.previousLocation = TemplateManager.currentLocation;
        
        // note la location
        TemplateManager.currentLocation = templateURL;
        
        // Masque la scène ThreeJS
        WebglSceneManager.hideWebglScene();
        
        // fadeOut l'actuelle template
        $("#html_content").fadeOut(function(){
            // insert le template
            $("#html_content").html(reponse);
            
            
            if(TemplateManager.previousLocation != undefined) {
                $("#html_content").prepend('<div class="btn_retour_template grow" title="retourner sur le carte"></div>');
            }
            // insert le bouton retour sur la carte
                $("#html_content").prepend('<div class="btn_retour_map grow" title="retourner sur le template précédent"></div>');
            
            
            $("#html_wrapper").fadeIn();
            $("#html_content").fadeIn(function() {
                // dispose le template quand les contenus HMTL sont affichés
                TemplateManager.disposeTemplate();
            });
            
            
        });        
    });
}

/**
 * Dispose le template
 * @returns {undefined}
 */
TemplateManager.disposeTemplate = function() {
    try {
        $(".templateOverlay").css("width", $("#html_content .narativeBackground img").width()+"px");
        $(".templateOverlay").css("height", $("#html_content .narativeBackground img").height()+"px");
        
    } catch (exception){
        //...
    }
}

/**
 * Affiche brièvement un indice 
 * @param identificant HTML de l'indice
 * @returns {undefined}
 */
TemplateManager.showIndice = function (indiceID) {       
    var $indice = $(indiceID);
    // clear la queue (stop les animation en queue)
   $indice.clearQueue();
    // affiche l'indice, attend 4 secondes puis disparaît
    $(indiceID).fadeIn(function(){
        $(this).addClass("active");
        $(this).delay(3000).queue(function() {
            $(this).stop().fadeOut();
        })
    })
}