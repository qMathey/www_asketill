/**
 * Class WebglSceneManager permet de gérer la scène 3D avec WebGL et ThreeJS
 */

function WebglSceneManager() {
}

// Constantes
WebglSceneManager.VIEW_ANGLE = 45; 
WebglSceneManager.NEAR = 0.1; // vue 
WebglSceneManager.FAR = 10000;
WebglSceneManager.VITESSE_DEFILEMENT_WATER = 0.0009;


// Propriétés
WebglSceneManager.canvasWidth = 0; // largeur du canvas (calculé automatique)
WebglSceneManager.canvasHeight = 0; // hauteur du canvas
WebglSceneManager.aspectRatio = 0; // Ratio de la camera 
WebglSceneManager.scene = undefined; // la scene ThreeJS
WebglSceneManager.renderer = undefined; // le renderer ThreeJS
WebglSceneManager.camera = undefined; // la caméra ThreeJS
WebglSceneManager.controls = undefined; // les contrôles ThreeJS
WebglSceneManager.statistiques = undefined; // les statistiques ThreeJS (extension stats.min.js)
WebglSceneManager.projector = undefined; // controles picking : Projecteur ThreeJS
WebglSceneManager.mouseVector = undefined; // controle picking: Vecteur de position pour la souris
WebglSceneManager.raycaster = undefined; // Controle picking : ray caster (droite infinie)
WebglSceneManager.objectPicked = undefined; // controle picking : Objets survolés
WebglSceneManager.actionOnClick = function() {}; // controle picking : action à faire lors du clickj
WebglSceneManager.clock = undefined; // horolge de ThreeJS (indispensable pour les animations)
WebglSceneManager.canUserPlayWebgl = true; // indique si l'utilisateur arrive à lancer WebGL

// Zone de jeu
WebglSceneManager.zoneForge = undefined;

// Static methods
/**
 * Initialise la scène 3D de ThreeJS (WebGL)
 */
WebglSceneManager.init = function() {
        try {
           
	// on dispose la scène (au cas où ça ne serait pas fait)
	WebglSceneManager.disposeScene();
        
	// Instancie un renderer
	WebglSceneManager.renderer = new THREE.WebGLRenderer({ antialiasing: true }); 
	// paramètre le renderer
	WebglSceneManager.renderer.setSize(WebglSceneManager.canvasWidth, WebglSceneManager.canvasHeight);
	WebglSceneManager.renderer.setClearColor( 0xffffff, 1 ); // background #fff
	// attache le renderer à l'élément DOM
	$("#webgl_wrapper").append(WebglSceneManager.renderer.domElement);
	 
	// Instancie la scène
	WebglSceneManager.scene = new THREE.Scene();
	
	// Instancie la caméra
	WebglSceneManager.camera = new THREE.PerspectiveCamera(
	    WebglSceneManager.VIEW_ANGLE,
	    WebglSceneManager.aspectRatio,
	    WebglSceneManager.NEAR,
	    WebglSceneManager.FAR  );
	// ajoute la caméra à la scène
	WebglSceneManager.scene.add( WebglSceneManager.camera );
	// recule la camera
	WebglSceneManager.camera.position.z = 300;
	WebglSceneManager.camera.position.y = 100;
		
	// Initialise les controles trackball
	//WebglSceneManager.initTrackballControls();
	WebglSceneManager.initOrbitControls();
        
        // Initialise les controles de picking (survol des objets)
        WebglSceneManager.addPickingControls();
	
	// Appelle le constructeur de scène
	WebglSceneMaker.buildScene();
	
	// Ajoute le module de statistiques
	//WebglSceneManager.addStatistics();
	
	// ajoute une sphère de test
	//WebglSceneManager.addTestSphere();
	
	// ajoute une lumière (point lumineux)
	WebglSceneManager.addPointLight();
        
        // initialise l'horloge 
        WebglSceneManager.clock = new THREE.Clock();
	
	// 1er appel de mise à jour
	WebglSceneManager.updateScene();
           
        }
        catch(exception){
            WebglSceneManager.canUserPlayWebgl = false;
            alert("Il semblerait que vous ne puissez pas exécuter WebGL. Nous vous conseillons d'utiliser le navigateur Chrome pour profiter pleinement de cette expérience!")
        }
	
}

/**
 * Met à jour la scène
 */
WebglSceneManager.updateScene = function() {
	// appel quasi-récursif selon un setInterval pour chaque frame 
	requestAnimFrame( WebglSceneManager.updateScene );
        
        var delta = WebglSceneManager.clock.getDelta();
	
	if( WebglSceneManager.controls != undefined) {
		//WebglSceneManager.controls.update();
	}
        
	WebglSceneManager.render();
        
        // anime l'eau
        WebglSceneManager.animateWater(delta);
}

/**
 * Effectue un rendu
 */
WebglSceneManager.render = function () {
	// le renderer fait un rendu de la scène avec notre camera
	WebglSceneManager.renderer.render(WebglSceneManager.scene, WebglSceneManager.camera);
	
	// si le module de statistiques est activé
	if(WebglSceneManager.statistiques != null){
		WebglSceneManager.statistiques.update();
	}
}

/**
 * Met le canvas WebGL en avant
 */
WebglSceneManager.showWebglScene = function () {
	// met le canvas en avant
	$("#html_wrapper").css("z-index", 20);
	$("#webgl_wrapper").css("z-index", 30);
}

/**
 * Cache le canvas WebGL
 */
WebglSceneManager.hideWebglScene = function () {
	// met le canvas en avant
	$("#html_wrapper").css("z-index", 30);
	$("#webgl_wrapper").css("z-index", 20);
}

/**
 * Dispose le canvas WebGL et le renderer ThreeJS
 */
WebglSceneManager.disposeScene = function () {
	// Récupère la largeur et la hauteur du canvas
	WebglSceneManager.canvasWidth = $("#webgl_wrapper").width();
	WebglSceneManager.canvasHeight = $("#webgl_wrapper").height();
	WebglSceneManager.aspectRatio = WebglSceneManager.canvasWidth / WebglSceneManager.canvasHeight;
	
	// si la caméra est définie ainsi que le renderer ThreeJS
	if(WebglSceneManager.camera != undefined && WebglSceneManager.renderer != undefined) {
		// met à jour l'aspect
		WebglSceneManager.camera.aspect = WebglSceneManager.aspectRatio;
		// met à jour la projection
		WebglSceneManager.camera.updateProjectionMatrix();
		// met à jour la taille du renderer
		WebglSceneManager.renderer.setSize(WebglSceneManager.canvasWidth, WebglSceneManager.canvasHeight);
		// effectue un nouveau rendu
		WebglSceneManager.render();
	} // if
	
	// si les controles sont définis
	if(WebglSceneManager.controls != undefined) {
		//WebglSceneManager.controls.handleResize();
	}
	
	// si le module de statistiques est définit
	if(WebglSceneManager.statistiques != undefined) {
		// met à jour les statistiques
		WebglSceneManager.statistiques.update();
	}
}
/**
 * Initialise les controls Orbit pour la camera
 */
WebglSceneManager.initOrbitControls = function () {
	
	WebglSceneManager.controls = new THREE.OrbitControls( WebglSceneManager.camera);
	//WebglSceneManager.controls.addEventListener( 'change', WebglSceneManager.render ); // appel à la méthode WebglSceneManager.render()
	WebglSceneManager.controls.addEventListener( 'change', WebglSceneManager.render );
	
		// Range is 0 to Math.PI radians.
	WebglSceneManager.controls.minPolarAngle = 0.5; // radians
	WebglSceneManager.controls.maxPolarAngle = Math.PI/2.1; // radians
	
	WebglSceneManager.controls.minDistance = 150;
	WebglSceneManager.controls.maxDistance = 400;
        
        // restrictions des controles
	WebglSceneManager.controls.noPan = true;
}

/**
 * Ajoute le module de statistiques (extension stats.min.js)
 */
WebglSceneManager.addStatistics = function () {
	WebglSceneManager.statistiques = new Stats();
	WebglSceneManager.statistiques.domElement.style.position = 'absolute';
	WebglSceneManager.statistiques.domElement.style.top = '0px';
	WebglSceneManager.statistiques.domElement.style.zIndex = 100;
	$("#webgl_wrapper").append( WebglSceneManager.statistiques.domElement );
}

/**
 * Ajoute une sphère de test
 */
WebglSceneManager.addTestSphere = function () {
	// create the sphere's material
	var sphereMaterial = new THREE.MeshLambertMaterial(
	{
	    color: 0xCC0000
	});

	// set up the sphere vars
	var radius = 50, segments = 16, rings = 16;

	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var sphere = new THREE.Mesh(
	   new THREE.SphereGeometry(radius, segments, rings),
	   sphereMaterial);

	// add the sphere to the scene
	WebglSceneManager.scene.add(sphere);
}

/**
 * Ajoute un point lumineux
 */
WebglSceneManager.addPointLight = function () {
	// Add light
        var directionalLight = new THREE.DirectionalLight(0xffff55, 0.4);
        directionalLight.position.set(-900, 200, 200);

	// add to the scene
	WebglSceneManager.scene.add(directionalLight);
}

/**
 * Ajoute les contrôles permettants de "prendre" des objets dans la vue 3D
 * en l'occurence, permet de cliquer sur des batiments. 
 */
WebglSceneManager.addPickingControls = function() {
    // instancie le projecteur et le vecteur de positionnement de la souris
    WebglSceneManager.projector = new THREE.Projector();
    WebglSceneManager.mouseVector = new THREE.Vector3();
    
    // quand la souris bouge, on ajoute un événement
    $("#webgl_wrapper").on("mousemove", function( event ) {
        
        // Définit la position de la souris dans le plan 3D
        WebglSceneManager.mouseVector.x = 2 * (event.clientX / WebglSceneManager.canvasWidth) - 1;
        WebglSceneManager.mouseVector.y = 1 - 2 * ( event.clientY / WebglSceneManager.canvasHeight );

        // crée un rayon infini
        WebglSceneManager.raycaster = WebglSceneManager.projector.pickingRay( WebglSceneManager.mouseVector.clone(), WebglSceneManager.camera );
        // détecte les colisions entre le rayons infini 
        WebglSceneManager.objectPicked = WebglSceneManager.raycaster.intersectObjects( WebglSceneManager.scene.children );
        
        var isPickingZoneFound = false;
        
        
        // reset la couleur de tous les éléments de la scene
        WebglSceneManager.resetColorAllObjectFromScene();
        
        // on boucle sur chaque objet survolé
        for( var i = 0; i < WebglSceneManager.objectPicked.length; i++ ) {
                var intersection = WebglSceneManager.objectPicked[ i ],
                        obj = intersection.object;
                // tests au cas par cas de l'objet intercepté
                switch(obj.zone) {
                    case 'chiefHouse' :
                        // Applique une couleur rouge à la zone de la maison du chef
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ1;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                        break;
                        
                    case 'chaudron' :
                        // Applique une couleur rouge à la zone du chaudron
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ2;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                    break;
                    case 'cabanne' :
                        // Applique une couleur rouge à la zone de cabannde dans les bois
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ3;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                    break;
                    
                    case 'place_puit' :
                        // Applique une couleur rouge aux éléments de la place du puit
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ4;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                    break;
                    
                    case 'ferme' :
                        // Applique une couleur rouge à la zone de la ferme
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ5;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                    break;
                    
                    case 'forge' :
                        // Applique une couleur rouge à la zone de la forge
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ6;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                    break;
                        
                    case 'port' :
                        // Applique une couleur rouge à la zone du port
                        obj.material.color = new THREE.Color("rgb(255,0,0)");
                        WebglSceneManager.actionOnClick = TemplateManager.LoadTemplateZ7;
                        // met le curseur en mode pointer (lien)
                        TemplateManager.setCursorPointer();
                        isPickingZoneFound = true;
                    break;
                    
                    default :
                           // par défaut rien.
                           WebglSceneManager.actionOnClick = function(){};
                           // remet le curseur normal
                           TemplateManager.setCursorDefault();
                        break;
                } // switch

                // si on a trouvé un objet cliquable alors, on quitte la boucle
                if(isPickingZoneFound) {
                    break; // on ne s'inètresse qu'au premier object
                }
        } // for
    });
    
     $("#webgl_wrapper").on("click", function( event ) {
          WebglSceneManager.actionOnClick();
     });

}

/**
 * Reset la couleur de tous les objets de la scene
 * @returns {undefined}
 */
WebglSceneManager.resetColorAllObjectFromScene = function () {
    var children = WebglSceneManager.scene.children;
    for(var i = 0; i < children.length; i++){
        // si l'enfant possède une zone définie
        if(children[i].zone != undefined) {
            try {
                children[i].material.color = WebglSceneMaker.globalMaterial.color;
            }catch (exception){

            }
        }
    }
    /*
    // pour chaque zone on lui applique la couleur par défaut
    
    // village/forge+ habit
    WebglSceneManager.setColorForObjectNode(WebglSceneManager.scene, ;
    */
}


/**
 * Applique à aux objets du noeud une couleur
 * @param objectNode le noeud d'objet à transformer
 * @param Color la couleur à appliquer
 * @returns {undefined}
 */
WebglSceneManager.setColorForObjectNode = function (objectNode, color) {
    
    var objects3D = objectNode.children;
    
    // pour chaque objet 3D
    for(var i = 0; i < objects3D.lengthM; i++){
        var objet3D = objects3D[i];
        
        objet3D.color = color;
        console.log("done + ");
    }
    
}

/**
 * Anime l'eau en faisant "glisser" la texture sur 1 axe
 * @param {int} delta nombre de milisecondes écoulée entre chaque frame
 * @returns {undefined}
 */
WebglSceneManager.animateWater = function( delta ) {
    
    if(WebglSceneMaker.mat_water != undefined) {
        
        WebglSceneMaker.mat_water.map.offset.y += delta * WebglSceneManager.VITESSE_DEFILEMENT_WATER;
        
        if(WebglSceneMaker.mat_water.map.offset.y >= 0.8)
            WebglSceneMaker.mat_water.map.offset.y = 0;
    }
}

/**
 * shim layer with setTimeout fallback
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

