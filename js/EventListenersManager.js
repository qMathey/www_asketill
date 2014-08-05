/**
 * Class EventListenersManagers permet d'écouter tous les événements sur la page
 */


function EventListenersManager() {
}

// Static methods

// Propriete
EventListenersManager.eventRegistered = [];

/**
 * Initialise tous les écouteurs
 */
EventListenersManager.init = function () {
	// Menu
	$("#menu_mark").on("click", function() {
		// affiche ou masque le menu si besoins
		Menu.toggle();
	});
	
	// quand on redimensionne la fenêtre
	$(window).on("resize", function() {
		// replace le marqueur du menu
		Menu.disposeMark();
		// met à jour la scène ThreeJS
		WebglSceneManager.disposeScene();
                // met à jour le template
                TemplateManager.disposeTemplate();
		
	});
        
        // Quand on clique sur le bouton retour pour afficher la map
        $(document).on("click", ".btn_retour_map", function() {
		
			if( WebglSceneManager.canUserPlayWebgl ) {
		
            // affiche la carte
            $("#html_wrapper").fadeOut(function() {
                    // Affiche la scène ThreeJS
                    WebglSceneManager.showWebglScene();
                    $("#html_content").html("");
                    
                    // supprime l'info d'endroit précédent
                    TemplateManager.previousLocation = undefined;
            });
			} else { // l'utilisateur ne peut pas afficher la carte 3D, alors on lui affiche la carte 2D
				TemplateManager.LoadTemplateHMTL("templates/zones/z0-carteAsketill.html");
			}// else
        });
        
        // Quand on clique sur le bouton retour pour afficher un template
        $(document).on("click", ".btn_retour_template", function() {
            // charge le template précédent et cache le bouton de retour
            TemplateManager.LoadTemplateHMTL($(this).attr("data-previousLocation"));
            
        });
        
        // Quand on clique sur le bouton nouvelle partie
        $(document).on("click", ".btn_facebook", function() {
            // redirection sur la page facebook d'asketill
            location = "https://www.facebook.com/asketill";
        });
        
        // Quand on clique sur le bouton nouvelle partie
        $(document).on("click", ".btn_newGame", function() {
            //recharge la page
            location.reload();
        });
	
        // Quand une image de fond d'un template est chargée, on dispose le template
        EventListenersManager.registerEvent("load", ".pictBG", function() {
            TemplateManager.disposeTemplate();
        });
        
	//Désactive tous les liens par défaut dans #html_content
	EventListenersManager.removeLinkEvent();
        
        // evite les problèmes de redimmensionnement au click, on redispose le template
         EventListenersManager.registerEvent("click", "body", function() {
            TemplateManager.disposeTemplate();
        });
        
}
/**
 * Ajoute un écouteur sur le lien "Commencer l'aventure"
 * et charge l'introduction
 */
EventListenersManager.addHomepageEventListeners = function () {
	// BD Quand on clique sur "Démarrer l'aventure"
	$(document).on("click", "#startAdventure", function() {
            console.log("click homepage!")
            
            
            // arrête l'animation de neige
            if(snowStorm != undefined) {
                snowStorm.stop();
            }
           
            // Est-ce que l'utilisateur a joué ?
            var userknowledgeFromStorage = StorageManager.getItem("userKnowledge");
            if(userknowledgeFromStorage == null){
                
                // fadeOut, commence l'intro
                $(this).fadeOut(function() {
                        
			// Lance l'introduction
			ComicManager.intro();
                        
			// Préchage la scène WebGL de façon asynchrone
                        setTimeout( function() {
                            WebglSceneManager.init();
                        }, 300);
                       
		});
			// Masque la scène ThreeJS
			WebglSceneManager.hideWebglScene();
                
            }
            else {
                
                ComicManager.userKnowledge = userknowledgeFromStorage;
                // appelle directement le template repriseJeu
                TemplateManager.LoadTemplateHMTL("templates/repriseJeu.html");                
                
            } // else
		
		
	});
}

/**
 * Désactive tous les liens par défaut dans #html_content
 */
EventListenersManager.removeLinkEvent = function () {
	
	// Désactive tous les liens par défaut dans #html_content
	$(document).on("click", "#html_content a", function(event) {
		event.preventDefault();
	});
}

/**
 * Ajoute un écouteur les slides de l'introduction
 * Affiche la slide suivante
 */
EventListenersManager.addIntroEventListeners = function () {
	// BD Quand on clique sur "Démarrer l'aventure"
	$(document).on("click", "#introImages img", function() {
		ComicManager.introDisplayNextCase();
	});
}

/**
 * Ajoute les événements associés aux conversations
 * @returns {undefined}
 */
EventListenersManager.addConversationEventListeners = function() {
    // ajoute des événements spécifiques aux réponses
    $(document).on("click", ".convesationTextWrapper .question", function(event){
        // clear queue
        $(".convesationTextWrapper .reponse").clearQueue();
        
        // ferme toutes les réponses
        $(".convesationTextWrapper .reponse").animate({
            height:"0px"
        });
        
        // ouvre la réponse souhaitée instannnément
        $(this).find(".reponse").css("height", "auto");
        // récupère la hauteur
        var reponseHeight = $(this).find(".reponse").height();
        // referme instanément la réponse
        $(this).find(".reponse").css("height", "0px");
        // anime l'ouverture
        $(this).find(".reponse").animate({
            height:(reponseHeight+10)+"px"
        });
        
        // enleve la classe strong si elle était présente
        $(this).find(".titre").removeClass("strong");
        
        // Ajoute la question dans la base de connaissance de l'utilisateur
        ComicManager.userKnow($(this).data("id"));
        
        // on vérifie si il y a de nouvelles questions
        var arrayQuestions = ComicManager.synchronousGetConversationFromXML( ComicManager.currentConversationOpen );
        var arrayNewQuestions = [];
        for( var i = 0; i < arrayQuestions.length; i++) {
            // si il y a une nouvelle questoins, alors on l'ajoute au début de la conversation
            if(arrayQuestions[i].isNew == true){
                arrayNewQuestions.push(arrayQuestions[i]);
            }
        }
        
        // si il y a de nouvelles réponses
        if(arrayNewQuestions.length > 0) {
            // insère donc uniquement les nouvelles questions
            ComicManager.insertConversationFromData(arrayNewQuestions, true);
        
        } // if
        
    });
}

/**
 * 
 * @param {type} elementTargeted
 * @param {type} action
 * @returns {undefined}
 */
EventListenersManager.registerEvent = function (eventType, elementTargeted, action){
    
    // Vérifie si l'event n'est pas déjà enregistré
    if( ! EventListenersManager.isEventIsAlreadyRegistered(eventType, elementTargeted) ){
        
        // Prépare l'événement à enregistré
        var eventRegistered = {
            "eventType" : eventType,
            "elementTargeted" : elementTargeted
        }
        
        // applique l'événement
        $(document).on(eventType, elementTargeted, action);
        
        // enregistre que l'événement a été appliqué
        EventListenersManager.eventRegistered.push(eventRegistered);
        
    } // if
    
    
}


/**
 * Vérifie si l'événement n'est pas déjà enregistré
 * @param {string} eventType le type d'évenment, ex "click"
 * @param {string} ElementTargeted l'élément visé, ex "#target"
 * @return {boolean} indique si l'événement est déjà enregistré
 */
EventListenersManager.isEventIsAlreadyRegistered = function (eventType, elementTargeted){
    // par défaut un événement n'est pas déjà enregistré
    var isAlreadyRegistered = false;
    
    // parcourt tous les événements enregistrés
    for(var i = 0; i < EventListenersManager.eventRegistered.length; i++){
        // si un événement pointe sur le même élément (ex "#target")
        if(EventListenersManager.eventRegistered[i].elementTargeted === elementTargeted) {
            // et qu'il est du même type (ex "click")
            if(EventListenersManager.eventRegistered[i].eventType === eventType) {
                // alors, on marque l'événement comme déjà enregistré
                isAlreadyRegistered = true;
            }// if
        }// if
    }// for
    // retourne l'information
    return isAlreadyRegistered;
}