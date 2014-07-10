/**
 * Class WebglSceneManager permet de g�rer la sc�ne 3D avec WebGL et ThreeJS
 */

function WebglSceneMaker() {
}

// Propri�t�s
WebglSceneMaker.jsonLoader = undefined;

// Mat�riaux
WebglSceneMaker.globalMaterial = undefined; // mat�riel g�n�ral
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
// sph�re cliquable
WebglSceneMaker.mat_sphere = undefined; 

// Geom�tries redondantes

// Textures redondantes


// Static methods
/**
 * Construit la sc�ne de l'�le
 */
WebglSceneMaker.buildScene = function() {

	// peut cr�er la sc�ne si elle es
	if( WebglSceneManager.scene != undefined ) {
	
		WebglSceneMaker.jsonLoader = new THREE.JSONLoader();
		
		// Charge les mat�riaux
		WebglSceneMaker.setMaterials();
		
		// Charge les g�om�trie
		
		// Cr�e les �l�ments

		// �le
		WebglSceneMaker.loadIsland();
	}
}
/**
 * Charge l'�le et lui applique sa texture
 */
WebglSceneMaker.loadIsland = function() {
	var mesh = undefined;
	// webgl/models/ile_troisiemeEssais.js
	WebglSceneMaker.jsonLoader.load( "webgl/models/ile_troisiemeEssais.js", function(geometry) {
		mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_island );
		mesh.scale.set(14,14,14);
		// pas de modification de la position (0,0,0);
		// ajoute la mesh � la sc�ne
		WebglSceneManager.scene.add(mesh);
		// met � jour le rendu
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
	// sph�re cliquable
	//WebglSceneMaker.mat_sphere = undefined; 
	*/
}

