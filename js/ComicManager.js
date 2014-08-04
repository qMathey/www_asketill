/**
 * Class ComicManager permet de gérer les éléments.
 */

function ComicManager() {
}

// Constantes
ComicManager.TEMPLATE_URL = "templates/";
ComicManager.NARATIVE_URL = "narative/";

// Propriétés
ComicManager.$htmlContent = undefined;
ComicManager.$introWrapper = undefined;
ComicManager.$xml = undefined;
ComicManager.introCurrentSlide = 0;
ComicManager.introMaxSlide = 0;
ComicManager.userKnowledge = [];
ComicManager.currentConversationOpen = '';

// Static methods
/**
 * Charge l'accueil de la bande dessinée
 */
ComicManager.start = function() {
	// charge la homepage
	$.get(ComicManager.TEMPLATE_URL + "homepage.html", function(reponse) {
		$("#html_content").html(reponse);
	}); // get
        
	
	// Ajoute les écouteurs spécifique à la homepage
	EventListenersManager.addHomepageEventListeners();
	
	// met le HTML en avant
	$("#html_wrapper").css("z-index", 30);
	$("#webgl_wrapper").css("z-index", 20);
        
        // appelle une fois le resize de la page (force le replacement des éléments)
        $(window).trigger("resize");
}

/**
 * Charge l'introduction dessinée de l'aventure
 */
ComicManager.intro = function() {
	var $introContents = undefined;
	ComicManager.introMaxSlide = 0;
	ComicManager.introCurrentSlide = 0;
        
        // Définit le #html_content
        ComicManager.$htmlContent = $("#html_content");
	
	// crée une enveloppe html pour l'intro
	ComicManager.$introWrapper = $("<div>");
		ComicManager.$introWrapper.attr("id", "introWrapper");
	
	// affiche l'enveloppe (stylisée avec un fond noir)
	// masque le contenu actuelle
	$("#html_content").fadeOut(function(){
		// remplace le contenu avec les nouveaux contenus
		$("#html_content").html(ComicManager.$introWrapper);
		// affiche le nouveau contenu
		$("#html_content").fadeIn();
	});
	
	// load le template dans introWrapper
	ComicManager.introLoadTemplate(ComicManager.$introWrapper );
	
	// Quand le template de l'intro est chargé, on l'insère dans l'enveloppe de l'intro
	ComicManager.$introWrapper.on("templateIntroLoaded", function(event, template) {
		// insère le template chargé dans l'enveloppe
		ComicManager.$introWrapper.html(template);
		// charge les contenus du slider
		ComicManager.introLoadContents(ComicManager.$introWrapper);
	});
	
	// Quand les contenus de l'intro sont chargés
	ComicManager.$introWrapper.on("contentIntroLoaded", function(event, content) {
		// on note les contenus de l'intro
		ComicManager.$xml = $(content);
		// on note le nombre de case contenu dans l'intro
		ComicManager.introMaxSlide =ComicManager.$xml.find("case").length;
		// On affiche la première case (ComicManager.introCurrentSlide = 0)
		ComicManager.introDisplayCase(ComicManager.introCurrentSlide );
                
                // precharge les autres images de l'intro
                ComicManager.preloadIntroImages();
		
		// Ajoute les évènements click sur les slides
		EventListenersManager.addIntroEventListeners();
	});
	
	// Quand l'intro est finie, on la masque au profit de la carte 3D
	ComicManager.$introWrapper.on("introFinished", function(event) {
	
		// rend muet tous les sons
		AudioManager.muteAllSounds();

		// Actualise l'affichage de WebGL
		$("#html_wrapper").fadeOut(function() {
				// Affiche la scène ThreeJS
				WebglSceneManager.showWebglScene();
		});
	});
        
        // Quand on charge un template quelconque 
	ComicManager.$introWrapper.on("templateLoaded", function(event, template) {
		// insère le template chargé dans l'enveloppe
		ComicManager.$introWrapper.html(template);
		// charge les contenus du slider
		ComicManager.introLoadContents(ComicManager.$introWrapper);
	});
	
}
/**
 * Charge le template de l'intro
 */
ComicManager.introLoadTemplate = function( ) {
	// charge le template de l'introduction
	$.get(ComicManager.TEMPLATE_URL + "introduction.html", function(reponse) {
		ComicManager.$introWrapper.trigger("templateIntroLoaded", [ reponse ] );
	}); // get
}

/**
 * Charge les contenus de l'intro
 */
ComicManager.introLoadContents = function() {
	// charge les contenus de l'intro
	$.get(ComicManager.NARATIVE_URL + "introduction.xml", function(reponse) {
		ComicManager.$introWrapper.trigger("contentIntroLoaded", [ reponse ] );
	}); // get
}

/**
 * Precharge les images de l'introduction en les insérant dans une balise masquée
 * @returns {undefined}
 */
ComicManager.preloadIntroImages = function () {
    $(ComicManager.$xml.find("case")).each(function() {
        $("#html_wrapper").append('<img src="'+$(this).find("background").text()+'" style="display:none" />');
    });
}

/**
 * Affiche un contenu de l'intro selon son index
 * @param index de la case à afficher
 */
ComicManager.introDisplayCase = function ( index ) {
	// note l'index appelé
	ComicManager.introCurrentSlide = index;
	
	// récupère la case du dialogue recherchée
	var $requireCase = $(ComicManager.$xml.find("case").get( index ));
	
	// récupère  les éléments à afficher
	var backgroundImage = $requireCase.find("background").text();
	var $arrayDialog = $requireCase.find("dialog");
	
	
	// fait disparaître les contenus précédents
	ComicManager.$introWrapper.find("#introImages").fadeOut(function(){
                
		var delayIntro = 0;
	
		if (index == 0) {
			var delayIntro = 3000;
		}
		
		// place les éléments à afficher dans le template
		var $bgImage = $('<img src="'+backgroundImage+'" class="pictBG" style="display:none"/>').load(function() {
		   $(this).delay(delayIntro).fadeIn(); 
		});
	
		// insert les nouveaux contenus
		$(this).html($bgImage);
		
		// vide les contenus déjà présents
		ComicManager.$introWrapper.find("#introText").html("");
		
		// inserts les dialogues
		$arrayDialog.each(function() {
			var author = $(this).find("author").text();
			var text = $(this).find("text").text();
			
			var $dialog = $("<div>");
				$dialog.addClass("introDialog")
                                       .addClass("arrondi")
				       .append("<br /><strong>"+author+"</strong>")
                                       .append("<p>"+text+"</p>")
                                       .delay(10000).fadeOut(5000);
			// ajoute dans le template le dialog
			ComicManager.$introWrapper.find("#introText").append($dialog);
			
		});
		
		ComicManager.addIntroSounds($requireCase);
		
        // affiche
		$(this).delay(delayIntro).fadeIn();
	});
}

/**
 * Ajoute les sons de l'introduction 
 * @param xml contenant les balises audio avec les urls des sons
 */
ComicManager.addIntroSounds = function ( $xml ) {

	// rend muet tous les sons
	AudioManager.muteAllSounds();
		
        // s'execute après 400 ms
	setTimeout(function() {
		// si la balise audio est spécifiée, alors on ajoute les sons à la page
		if($xml.find("audios").length > 0){
			// pour chaque élément audio spécifié, on ajoute une balise audio
			$xml.find("audios").find("audio").each(function() {
				
				var $audio = $("<audio>");
					//$audio.attr("autoplay", "autoplay");
				var $source = $("<source>");
					$source.attr("src", $(this).text())
						   .attr("type", "audio/mpeg");
				   // insère la source dans la balise audio
				   $audio.append($source);
				   
				   // insère l'audio dans la page
				   $("#introAudio").append($audio);
				
			});
			
			// joue les sons insérés
			$("#introAudio").find("audio").each(function(){
				$(this)[0].play();
			});
		}// if
	}, 400);
}
/**
 * Affiche la case suivante de l'intro
 */
ComicManager.introDisplayNextCase = function () {
    // incremente intro current slide
    ComicManager.introCurrentSlide ++;
    // si la slide courante est plus petite 
    if(ComicManager.introCurrentSlide < ComicManager.introMaxSlide) {
            // on affiche la slide suivante
            ComicManager.introDisplayCase(ComicManager.introCurrentSlide);
    } else {
            // si on tente de dépasser le nombre max de slide, c'est que nous avons terminé l'intro
            ComicManager.$introWrapper.trigger("introFinished");
    } // else
}

/**
 * Charge le template 
 * @param templateName le nom du template
 */
ComicManager.loadTemplate = function ( templateName) {
    
    // charge les contenus de l'intro
    $.get(ComicManager.TEMPLATE_URL + templateName+ ".html", function(reponse) {
            ComicManager.$introWrapper.trigger("templateLoaded", [ reponse ] );
    }); // get
    
}

/**
 * Est-ce que l'utilisateur sait si il connait ce fait ?
 * @param String knowWhat le fait à connaitre 
 * @returns boolean vrai/faux
 */
ComicManager.doesUserKnow = function ( knowWhat ){
    
    var doesUserKnow = false; 
    
    // si l'élément figure dans les connaissance de l'utilisateur
    if(ComicManager.userKnowledge.indexOf(knowWhat) != -1)
    {  
       doesUserKnow = true; 
    }
    
    return doesUserKnow;
}

/**
 * Indique que l'utilisateur sait quelque chose
 * @param {type} $newItem
 * @returns {undefined}
 */
ComicManager.userKnow = function ( $newItem ) {
    // enregistre l'info    
    ComicManager.userKnowledge.push( $newItem );
    
    // save l'info dans le storage du navigateur
    StorageManager.saveItem('userKnowledge', ComicManager.userKnowledge);
}

/**
 * Charge les conversations et les affiches dans le div .wrapperConverdsation
 * @param String URL du fichier XML
 * @returns void
 */
ComicManager.loadConversation = function ( URL ) {
    
    // on note la conversation courante ouverte
    ComicManager.currentConversationOpen = URL;
    
    var arrayQuestions = ComicManager.synchronousGetConversationFromXML( URL );
    
    // insère dans le template les questions
    ComicManager.insertConversationFromData ( arrayQuestions );
        
    // ajoute les événements associés aux conversations
    EventListenersManager.addConversationEventListeners();
}

/**
 * 
 * @param {type} URL l'url de la conversation
 * @returns {Array) arrayQuestions}
 */
ComicManager.synchronousGetConversationFromXML = function ( URL ) {
    
    var arrayQuestions = []; // variable de retour
    var arrayQuestionsAnciennes = [];
    var arrayQuestionsNouvelles = [];
    
    // chargement ajax du XML
    $.ajax({ url: URL, 
        async: false,
        dataType: 'xml',
        success: function(reponse) {
            
        var $xml = $(reponse).find("conversation");
        
        
        // pour chaque dialogue
        $(reponse).find("dialog").each(function(key, value) {
            
            var isValidQuestion = true;
            
            if($(this).attr("mustKnow") !== undefined){
                // si l'utilisateur ne connait pas ce qu'il devrait savoir
                if( ! ComicManager.doesUserKnow($(this).attr("mustKnow"))){
                    isValidQuestion = false; // alors la question n'est pas valide
                }// if
            }// if
            
            // vérifie si l'utilisateur peut connaître la question
            if(isValidQuestion){
                // objet question
                var question = {
                    "id" : $(this).attr("id"),
                    "question" : $(this).find("question").text(),
                    "reponse" : $(this).find("reponse").text(),
                    "isNew": false
                };
                // si la question n'est pas connue de l'utilisateur,
                // on la marque comme isNew = true (par défaut non)
                // et on l'insère dans le tableau des nouvelles questions
                if( ! ComicManager.doesUserKnow(question.id) ){
                    question.isNew = true;
                    arrayQuestionsNouvelles.push(question);
                }else { // sinon on met la question dans le tableau des anciennes questions
                    arrayQuestionsAnciennes.push(question);
                } // else
            }// if
        }); // dialog
        
        // vide les questions qui peuvent exister
        //$(".convesationTextWrapper").html("");
        
        // On assemble les questions dans un seul array
        for(var i = 0; i < arrayQuestionsNouvelles.length; i ++){
            arrayQuestions.push(arrayQuestionsNouvelles[i]);
        }
        
        for(var i = 0; i < arrayQuestionsAnciennes.length; i ++){
            arrayQuestions.push(arrayQuestionsAnciennes[i]);
        }
        
    }});
    
    return arrayQuestions;
}

/**
 * Ajoute la conversation par rapport aux questions reçues
 * @param {array} arrayQuestion
 * @returns {undefined}
 */
ComicManager.insertConversationFromData = function(  arrayQuestions, isNewQuestions  ){
    // si le paramètre isNewQuestions n'est pas renseigné, on le met à false par défaut
    if(isNewQuestions == undefined )
        isNewQuestions = false;
    // indique si la méthode a inséré de nouvelles question
    var hasInsertedNewQuestion = false;
    
    // ajoute les questions à la conversation
    for(var i = 0; i < arrayQuestions.length; i++){
        // la question
        var $question = $("<div>");
            $question.addClass("question")
                     .addClass("conversation")
                     .attr("data-id", arrayQuestions[i].id);

        // le titre de la question
        var $titre = $("<div>");
            $titre.addClass("titre")
            $titre.html(arrayQuestions[i].question);

        // si la question est nouvelle, on lui ajoute la classe strong
        if(arrayQuestions[i].isNew){
            $titre.addClass("strong");
        }

        // la réponse à la question
        var $reponse = $("<div>");
            $reponse.addClass("reponse");
            $reponse.html(arrayQuestions[i].reponse);

        // ajoute le titre et la reéponse à la question
        $question.append($titre)
                 .append($reponse);
         
        // si la question n'est pas déjà affichée
        if ( $('.convesationTextWrapper [data-id="'+arrayQuestions[i].id+'"]').length <=  0) {
            // Ajoute les éléments dans la page
            // Si la question est nouvelle, on l'insère au début (prepend) sinon après (append)
            if ( isNewQuestions == true ) {
                // ajoute au début la question et l'affiche après 
                $(".convesationTextWrapper").append($question.hide().delay(3000).fadeIn(2000));
            }// if
            else {
                // ajoute à la fin la question
                $(".convesationTextWrapper").append($question);
            }// else
            
            // indique l'insertion de nouvelles questions
            hasInsertedNewQuestion = true;
        }// if
    }// for
    // Si de nouvelles questions ont bien été ajoutées
    if( hasInsertedNewQuestion ) {
        // évite les problèmes d'affichage
        $(".convesationTextWrapper").append('<div class="clear"></div>');

        // cache la conversation
        $(".convesationTextWrapper").hide();

        // dispose le template
        TemplateManager.disposeTemplate();
    }// if
        
}