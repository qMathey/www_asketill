/**
 * Class WebglSceneManager permet de gérer la scène 3D avec WebGL et ThreeJS
 */

function WebglSceneMaker() {
}

// Propriétés
WebglSceneMaker.jsonLoader = undefined;

// Matériaux
WebglSceneMaker.globalMaterial = undefined; // matériel général
// maison
WebglSceneMaker.mat_maisonSimple = undefined;
WebglSceneMaker.mat_harbor = undefined;
WebglSceneMaker.mat_barde = undefined;
WebglSceneMaker.mat_tavern = undefined;
WebglSceneMaker.mat_farmer = undefined;
WebglSceneMaker.mat_forge = undefined;
WebglSceneMaker.mat_chiefHouse = undefined;
// divers
WebglSceneMaker.mat_puit = undefined;
WebglSceneMaker.mat_cloture = undefined;
WebglSceneMaker.mat_chaudron = undefined;
// nature
WebglSceneMaker.mat_island = undefined;
WebglSceneMaker.mat_water = undefined;
WebglSceneMaker.mat_deadTree = undefined;
WebglSceneMaker.mat_sapin = undefined;
// sphère cliquable
WebglSceneMaker.mat_sphere = undefined; 

// Geométries redondantes

// Textures redondantes


// Static methods
/**
 * Construit la scène de l'île
 */
WebglSceneMaker.buildScene = function() {

	// peut créer la scène si elle es
	if( WebglSceneManager.scene != undefined ) {
	
		WebglSceneMaker.jsonLoader = new THREE.JSONLoader();
		
		// Charge les matériaux
		WebglSceneMaker.setMaterials();
		
		// Charge les géométrie
		
		// Crée les éléments

		// île
		WebglSceneMaker.loadIsland();
	}
}
/**
 * Charge l'île et lui applique sa texture
 */
WebglSceneMaker.loadIsland = function() {
	var mesh = undefined;
	// webgl/models/ile_troisiemeEssais.js
	WebglSceneMaker.jsonLoader.load( "webgl/models/ile_troisiemeEssais.js", function(geometry) {
		mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_island );
		mesh.scale.set(14,14,14);
		// pas de modification de la position (0,0,0);
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
		// met à jour le rendu
		WebglSceneManager.render();
	});// load
}
/**
 * Charge toutes les textures
 */
WebglSceneMaker.setMaterials = function() {
	WebglSceneMaker.globalMaterial = new THREE.MeshNormalMaterial();
	// maison
	WebglSceneMaker.mat_maisonSimple = new THREE.MeshLambertMaterial({ map : THREE.ImageUtils.loadTexture('webgl/textures/vikingHouse1.png') });
	/*
	WebglSceneMaker.mat_harbor = THREE.ImageUtils.loadTexture('webgl/textures/vikingPort.png');
	WebglSceneMaker.mat_tavern = THREE.ImageUtils.loadTexture('webgl/textures/Taverne.png');
	WebglSceneMaker.mat_farmer = THREE.ImageUtils.loadTexture('webgl/textures/vikingFerme.png');
	WebglSceneMaker.mat_forge = THREE.ImageUtils.loadTexture('webgl/textures/vikingForge.png');
	WebglSceneMaker.mat_chiefHouse = THREE.ImageUtils.loadTexture('webgl/textures/vikingChefHouse.png');
	// divers
	WebglSceneMaker.mat_puit = THREE.ImageUtils.loadTexture('webgl/textures/puit.png');
	//WebglSceneMaker.mat_cloture = THREE.ImageUtils.loadTexture('webgl/textures/vikingHouse1.png');
	WebglSceneMaker.mat_chaudron = THREE.ImageUtils.loadTexture('webgl/textures/chaudron.png');
	// nature
	*/
	WebglSceneMaker.mat_island = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('webgl/textures/ile_troisiemeEssais.png') });
	/*
	//WebglSceneMaker.mat_water = undefined;
	WebglSceneMaker.mat_deadTree = THREE.ImageUtils.loadTexture('webgl/textures/arbreMort.jpg');
	WebglSceneMaker.mat_sapin = THREE.ImageUtils.loadTexture('webgl/textures/sapin.png');
	// sphère cliquable
	//WebglSceneMaker.mat_sphere = undefined; 
	*/
}

