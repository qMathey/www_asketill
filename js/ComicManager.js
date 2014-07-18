/**
 * Class ComicManager permet de gérer les éléments.
 */

function ComicManager() {
}

// Constantes
ComicManager.TEMPLATE_URL = "templates/";
ComicManager.NARATIVE_URL = "narative/";

// Propriétés
ComicManager.$introWrapper = undefined;
ComicManager.$xml = undefined;
ComicManager.introCurrentSlide = 0;
ComicManager.introMaxSlide = 0;

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
	
}

/**
 * Charge l'introduction dessinée de l'aventure
 */
ComicManager.intro = function() {
	var $introContents = undefined;
	ComicManager.introMaxSlide = 0;
	ComicManager.introCurrentSlide = 0;
	
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
	
	// Quand le template est chargé, on l'insère dans l'enveloppe de l'intro
	ComicManager.$introWrapper.on("templateLoaded", function(event, template) {
		// insère le template chargé dans l'enveloppe
		ComicManager.$introWrapper.html(template);
		// charge les contenus du slider
		ComicManager.introLoadContents(ComicManager.$introWrapper);
	});
	
	// Quand les contenus sont chargés
	ComicManager.$introWrapper.on("contentsLoaded", function(event, content) {
		// on note les contenus de l'intro
		ComicManager.$xml = $(content);
		// on note le nombre de case contenu dans l'intro
		ComicManager.introMaxSlide =ComicManager.$xml.find("case").length;
		// On affiche la première case (ComicManager.introCurrentSlide = 0)
		ComicManager.introDisplayCase(ComicManager.introCurrentSlide );
		
		// Ajoute les évènements click sur les slides
		EventListenersManager.addIntroEventListeners();
	});
	
	// Quand l'intro est finie, on la masque au profit de la carte 3D
	ComicManager.$introWrapper.on("introFinished", function(event) {
			// Actualise l'affichage de WebGL
			WebglSceneManager.render();
			console.log("fini de charger!");
			$("#html_wrapper").fadeOut(function() {
				// Affiche la scène ThreeJS
				WebglSceneManager.showWebglScene();
			});
	});
	
}
/**
 * Charge le template de l'intro
 */
ComicManager.introLoadTemplate = function( ) {
	// charge le template de l'introduction
	$.get(ComicManager.TEMPLATE_URL + "introduction.html", function(reponse) {
		ComicManager.$introWrapper.trigger("templateLoaded", [ reponse ] );
	}); // get
}

/**
 * Charge les contenus de l'intro
 */
ComicManager.introLoadContents = function() {
	// charge les contenus de l'intro
	$.get(ComicManager.NARATIVE_URL + "introduction.xml", function(reponse) {
		ComicManager.$introWrapper.trigger("contentsLoaded", [ reponse ] );
	}); // get
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
	
	// place les éléments à afficher dans le template
	
	// faot disparaître les contenus précédents
	ComicManager.$introWrapper.find("#introImages").fadeOut(function(){
		// insert les nouveaux contenus
		$(this).html('<img src="'+backgroundImage+'" class="pictBG" />');
		
		// vide les contenus déjà présents
		ComicManager.$introWrapper.find("#introText").html("");
		
		// inserts les dialogues
		$arrayDialog.each(function() {
			var author = $(this).find("author").text();
			var text = $(this).find("text").text();
			
			var $dialog = $("<div>");
				$dialog.addClass("introDialog")
				       .append("<br /><strong>"+author+"</strong>")
					   .append("<p>"+text+"</p>");
			// ajoute dans le template le dialog
			ComicManager.$introWrapper.find("#introText").append($dialog);
			
		});
		
		
		$(this).fadeIn();
	});
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

