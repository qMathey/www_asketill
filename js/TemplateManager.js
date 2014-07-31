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
 * Appelle le template de la maison du chef
 * @returns {undefined}
 */
TemplateManager.LoadTemplateZ1 = function() {
    //TemplateManager.LoadTemplateHMTL("templates/accusation.html");
    TemplateManager.LoadTemplateHMTL("templates/zones/Z1/z1-maisonchef.html");
    
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
        
        // Masque la scène ThreeJS
        WebglSceneManager.hideWebglScene();
        
        // fadeOut l'actuelle template
        $("#html_content").fadeOut(function(){
            // insert le template
            $("#html_content").html(reponse);
            
            // insert le bouton retour sur la carte
            $("#html_content").prepend('<div class="btn_retour_map grow" title="retourner sur le carte"></div>');
            
            $("#html_content").show();
            // dispose le template quand les contenus HMTL sont affichés
            TemplateManager.disposeTemplate();
            $("#html_content").hide();
            
            // affiche les contenus
            $("#html_wrapper").fadeIn();
            $("#html_content").fadeIn(function() {
                // dispose le template quand les contenus HMTL sont affichés
                TemplateManager.disposeTemplate();
            }); // fadeIn
        }); // FadeOut       
    }); // Ajax Get
}

/**
 * Dispose le template
 * @returns {undefined}
 */
TemplateManager.disposeTemplate = function() {
    try {
        
        var width = $("#html_wrapper").width();
        var height = $("#html_wrapper").height();
        
        $("#html_content .wrapper_pictBG").css("width", width+"px");
        $("#html_content .wrapper_pictBG").css("height", height+"px");
        
        // surcouche interaction du template
        $(".templateOverlay").css("width", $("#html_content .wrapper_pictBG img").width()+"px");
        $(".templateOverlay").css("height", height+"px");
        $(".templateOverlay").css("margin-left", (width - $(".templateOverlay").width()) / 2 +"px");
        
        // en cas d'echec (height == 0), recommencer après 30ms (problème du à la pile d'exécution)
        if(height == 0 || width == 0 ||  $("#html_content .wrapper_pictBG img").width() == 0) {
            console.log("Template redisposé après echec");
            $(".templateOverlay").delay(30).queue(function() {
                TemplateManager.disposeTemplate();
            })
        }
        
    } catch (exception){
        //...
    }
    
    // template de conversation
    try {
        
        
        if( $(".convesationTextWrapper").length > 0 ){
            
            var conversationHeight = $(".convesationTextWrapper").height();
            
            var marginTop = $(window).height() /2 - conversationHeight / 2;
            
            // applique margin top
             $(".convesationTextWrapper").css("margin-top", marginTop+"px");
        }
        
    }catch (exception) {
        
        
    } // catch
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
/**
 * Ajoute un bouton retour
 * @param {String} templateURL l'url du template sur lequel pointer
 * @returns {undefined}
 */
TemplateManager.addButtonRetour = function( templateURL ){
    $("#html_content").prepend('<div class="btn_retour_template grow" title="retourner sur le template précédent" data-previousLocation="'+templateURL+'"></div>');
}