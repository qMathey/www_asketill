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
 * Appelle le template de la maison du chef
 * @returns {undefined}
 */
TemplateManager.LoadTemplateZ1 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z1/z1-maisonchef.html");
}

/**
 * Appelle le template de la foret ancienne
 * @returns {undefined}
 */
TemplateManager.LoadTemplateZ2 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z2/z2-foretancienne.html");
}


/**
 * Appelle le template de la foret ancienne
 * @returns {undefined}
 */
TemplateManager.LoadTemplateZ3 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z3/z3-cabanne.html");
}

/**
 * Appelle le template de la foret ancienne
 * @returns {undefined}
 */
TemplateManager.LoadTemplateZ4 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z4/z4-placepuits.html");
}

/**
 * Appelle le template de la ferme
 * @returns {undefined}
 */
TemplateManager.LoadTemplateZ5 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z5/z5-ferme.html");
}

/**
 * Appelle le template de la forge
 */
TemplateManager.LoadTemplateZ6 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z6/z6_marche.html");
}

/**
 * Appelle le template du port
 */
TemplateManager.LoadTemplateZ7 = function() {
    TemplateManager.LoadTemplateHMTL("templates/zones/Z7/z7-port.html");
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
			
			
			// Spécificité pour Safari, il faut noter le margin top initiale sur toutes les clickZones
			$(".templateOverlay .clickZone").each(function() {
				var currentMarginTop = $(this).position().top / $(this).parent().height() * 100;
				$(this).attr("data-initialMarginTop", currentMarginTop);
			});
			
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
		
		// reset styles
		$(".templateOverlay").attr("style", "");
		$("#html_content .wrapper_pictBG").attr("style", "");
        
        $("#html_content .wrapper_pictBG").css("width", width+"px");
        $("#html_content .wrapper_pictBG").css("height", height+"px");
        
        // surcouche interaction du template
        $(".templateOverlay").css("width", $("#html_content .wrapper_pictBG img").width()+"px");
        $(".templateOverlay").css("height", $("#html_content .wrapper_pictBG img").height()+"px");
        $(".templateOverlay").css("margin-left", (width - $(".templateOverlay").width()) / 2 +"px");
        
        // en cas d'echec (height == 0), recommencer après 30ms (problème du à la pile d'exécution)
        if(height == 0 || width == 0 ||  $("#html_content .wrapper_pictBG img").width() == 0) {
            console.log("Template redisposé après echec");
            $(".templateOverlay").delay(30).queue(function() {
                TemplateManager.disposeTemplate();
            })
        }
		
		// Spécificité pour Safari, il faut le recalculer
		if ( navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ) {
				$(".templateOverlay .clickZone").each(function() {
					var width = $(this).parent().width();    // get the width of div.container
					var safariMarginTopPX = width * parseInt($(this).attr("data-initialMarginTop")) / 100; 
					$(this).css("margin-top", Math.abs(safariMarginTopPX)+"px");
				});
			} // if
			
    } catch (exception){
        //...
    }
    
    // template de conversation
    try {
        
        if( $(".convesationTextWrapper").length > 0 ){
            
            var conversationHeight = $(".convesationTextWrapper").height();
            
            var marginTop = $("#html_wrapper").height() /2 - conversationHeight / 2;
			
			// si pour une raison, marginTop < 0 alors, on fixe à 0
			if( marginTop < 0 ) {
				marginTop = 0;
			}
            
            // applique margin top
             $(".convesationTextWrapper").css("margin-top", marginTop+"px");
             
             // affiche la conversation
             $(".convesationTextWrapper").clearQueue().fadeIn();
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