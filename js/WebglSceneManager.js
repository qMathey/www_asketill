/**
 * Class WebglSceneManager permet de gérer la scène 3D avec WebGL et ThreeJS
 */

function WebglSceneManager() {
}

// Constantes
WebglSceneManager.VIEW_ANGLE = 45; 
WebglSceneManager.NEAR = 0.1; // vue 
WebglSceneManager.FAR = 10000;



// Propriétés
WebglSceneManager.canvasWidth = 0;
WebglSceneManager.canvasHeight = 0;
WebglSceneManager.aspectRatio = 0;
WebglSceneManager.scene = undefined; // la scene ThreeJS
WebglSceneManager.renderer = undefined; // le renderer ThreeJS
WebglSceneManager.camera = undefined; // la caméra ThreeJS
WebglSceneManager.controls = undefined; // les contrôles ThreeJS
WebglSceneManager.statistiques = undefined; // les statistiques ThreeJS (extension stats.min.js)

// Static methods
/**
 * Initialise la scène 3D de ThreeJS (WebGL)
 */
WebglSceneManager.init = function() {
	// on dispose la scène (au cas où ça ne serait pas fait)
	WebglSceneManager.disposeScene();
	// Instancie un renderer
	WebglSceneManager.renderer = new THREE.WebGLRenderer(); 
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
	
	// Ajoute le module de statistiques
	WebglSceneManager.addStatistics();
	
	// Appelle le constructeur de scène
	WebglSceneMaker.buildScene();
	
	// ajoute une sphère de test
	//WebglSceneManager.addTestSphere();
	
	// ajoute une lumière (point lumineux)
	WebglSceneManager.addPointLight();
	
	// Dessine la scène
	WebglSceneManager.render();
	
	// 1er appel de mise à jour
	WebglSceneManager.updateScene();
	
}

WebglSceneManager.updateScene = function() {
	// appel quasi-récursif selon un setInterval pour chaque frame 
	requestAnimFrame( WebglSceneManager.updateScene );
	
	if( WebglSceneManager.controls != undefined) {
		//WebglSceneManager.controls.update();
	}
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
 * Initialise les controls Trackball pour la camera
 */
WebglSceneManager.initTrackballControls = function () {
	// Instancie les contrôles
	WebglSceneManager.controls = new THREE.TrackballControls( WebglSceneManager.camera, WebglSceneManager.renderer.domElement );
	// Paramètre les controles
	WebglSceneManager.controls.rotateSpeed = 1.0;
	WebglSceneManager.controls.zoomSpeed = 1.2;
	WebglSceneManager.controls.panSpeed = 0.8;

	WebglSceneManager.controls.noZoom = false;
	WebglSceneManager.controls.noPan = true;
	WebglSceneManager.controls.noRoll = true;
	WebglSceneManager.controls.noRotate  = false;

	WebglSceneManager.controls.staticMoving = false;
	WebglSceneManager.controls.dynamicDampingFactor = 0.3;

	WebglSceneManager.controls.keys = [ 65, 83, 68 ];
	// ajoute un e
	WebglSceneManager.controls.addEventListener( 'change', WebglSceneManager.render ); // appel à la méthode WebglSceneManager.render()
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
	// create a point light
	var pointLight =
	new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 98.60;
	pointLight.position.z = 3.95;
	
	// met l'intensité à 
	pointLight.intensity = 0.22;

	// add to the scene
	WebglSceneManager.scene.add(pointLight);
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

