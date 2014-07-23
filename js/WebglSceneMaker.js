/**
 * Class WebglSceneManager permet de g�rer la sc�ne 3D avec WebGL et ThreeJS
 */

function WebglSceneMaker() {
}

// Propri�t�s
WebglSceneMaker.jsonLoader = undefined;

// divers
WebglSceneMaker.defaultEmissiveColor = new THREE.Color("rgb(214,214,214)");

// Mat�riaux
WebglSceneMaker.globalMaterial = undefined; // mat�riel g�n�ral
// maison
WebglSceneMaker.mat_maisonSimple = undefined;
WebglSceneMaker.mat_harbor = undefined;
WebglSceneMaker.mat_barde = undefined;
WebglSceneMaker.mat_taverne = undefined;
WebglSceneMaker.mat_farm = undefined;
WebglSceneMaker.mat_forge = undefined;
WebglSceneMaker.mat_chiefHouse = undefined;
// divers
WebglSceneMaker.mat_puit = undefined;
WebglSceneMaker.mat_cloture = undefined;
WebglSceneMaker.mat_chaudron = undefined;
// nature
WebglSceneMaker.mat_island = undefined;
WebglSceneMaker.mat_water = undefined;
WebglSceneMaker.mat_water_opaque = undefined;
WebglSceneMaker.mat_deadTree = undefined;
WebglSceneMaker.mat_sapin = undefined;
// sphère cliquable
WebglSceneMaker.mat_sphere = undefined; 

// Zones 3D

// Textures redondantes


// Static methods
/**
 * Construit la sc�ne de l'�le
 */
WebglSceneMaker.buildScene = function() {

	// Si la sc�ne est d�finie, nous pouvons la constuire.
	if( WebglSceneManager.scene != undefined ) {
	
		// Instancie un "chargeur" de g�om�trie au format JSON
		WebglSceneMaker.jsonLoader = new THREE.JSONLoader();
		
		// Charge les mat�riaux (avec texture)
		WebglSceneMaker.setMaterials();
		
		// Charge les g�om�tries, cr�es les objets 3D (mesh), applique les mat�riaux (inclus texture) et les dispose dans la sc�ne

		// �le
		WebglSceneMaker.loadIsland();
		
		// Plan d'eau
		WebglSceneMaker.loadWater();
		
		// Habitations diverses (house1, port, forge, taverne, ferme, maison chef, puit)
		WebglSceneMaker.loadHouses();
		
		// Arbres
		WebglSceneMaker.loadDeadTrees();
		WebglSceneMaker.loadSapins();
		
		// divers
		WebglSceneMaker.loadChaudron();
                
                // Skybox
                WebglSceneMaker.addSkyBox();
		
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
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
		// met � jour le rendu
		WebglSceneManager.render();
	});// load
}
/**
 * Charge l'eau et lui applique son mat�riel
 */
WebglSceneMaker.loadWater = function() {
	
	// cr�e un plan d'eau
	var meshPlanEauTrasnparent = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), WebglSceneMaker.mat_water);
	//mesh.scale.set(5,5,5);
	meshPlanEauTrasnparent.position.y = 1.14;
	meshPlanEauTrasnparent.rotation.x = -1.57;
        
        // plan d'eau opaque
        
        var meshPlanEauOpaque = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), WebglSceneMaker.mat_water_opaque);
	meshPlanEauOpaque.position.y = 0;
	meshPlanEauOpaque.rotation.x = -1.57;
	
	// ajoute la mesh à la scène
	WebglSceneManager.scene.add(meshPlanEauTrasnparent);
	//WebglSceneManager.scene.add(meshPlanEauOpaque);
	
}
/**
 * Charge les abitations diverses (house1, port, forge, taverne, ferme, maison chef)
 */
WebglSceneMaker.loadHouses = function () {
	
	// Maisons viking
	WebglSceneMaker.loadVikingHouse1();
	
	// Port viking
	WebglSceneMaker.loadVikingHarbor();
	
	// Forge viking
	WebglSceneMaker.loadVikingForge();
	
	// Taverne viking
	WebglSceneMaker.loadVikingTaverne();
	
	// Ferme viking
	WebglSceneMaker.loadVikingFarm();
	WebglSceneMaker.loadVikingFarmClotures();
	
	// Puit
	WebglSceneMaker.loadPuit();
	
	// Maison du chef viking
	WebglSceneMaker.loadVikingChiefHouse();
}
/**
 * Charge l'�le et lui applique sa texture
 */
WebglSceneMaker.loadVikingHouse1 = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/vikingHouse1.js", function(geometry) {
		// donn�es geo data
		var dataPos = {
			1 : {
				"position" :  new THREE.Vector3( -8.97, 7.0,23.55 ),
				"rotation" :  new THREE.Vector3( 3.14, 0.44, 3.14 ),
                                "zone" : "forge"
			},
			2 : {
				"position" :  new THREE.Vector3( -18.07, 7.00, 53.37 ),
				"rotation" :  new THREE.Vector3( 3.14, -0.24, 3.14 ),
                                "zone" : "forge"
			},
			3 : {
				"position" :  new THREE.Vector3( 21.98, 7.0, 28.20 ),
				"rotation" :  new THREE.Vector3( 0.00, 0.58, 0.00 )
			},
			4 : {
				"position" :  new THREE.Vector3( -75.72, 7.0, -39.14 ),
				"rotation" :  new THREE.Vector3( 3.14, 0.82, 3.14 )
			}
		};
	
		// Ajoute les maisons
		for( var key in dataPos){
			// meshHouse1_1
			var meshHouse1 = new THREE.Mesh( geometry, WebglSceneMaker.mat_maisonSimple.clone() );
				meshHouse1.scale.set(4,4,4);
				meshHouse1.position = dataPos[key]["position"];
				meshHouse1.rotation.set(dataPos[key]["rotation"].x, dataPos[key]["rotation"].y, dataPos[key]["rotation"].z) ;
                        // si une zone est spécifiée, alors on l'applique     
                        if(dataPos[key]["zone"] != undefined){
                            meshHouse1.zone = dataPos[key]["zone"]
                        }
			// ajoute la mesh à la scène
			WebglSceneManager.scene.add(meshHouse1);
		}
		
		// met � jour le rendu
		WebglSceneManager.render();
	});// load
}

/**
 * Charge le port viking et lui applique sa texture
 */
WebglSceneMaker.loadVikingHarbor = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/vikingPort.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_harbor );
			mesh.scale.set(4,4,4);
			mesh.position.set(5.26, 6.84, 94.85);
			mesh.rotation.set(0, 1.50, 0) ;
			
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
			
		// met � jour le rendu
		WebglSceneManager.render();
	});// load
}
/**
 * Charge la forge viking et lui applique sa texture
 */
WebglSceneMaker.loadVikingForge = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/vikingForge.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_forge );
			mesh.scale.set(4,4,4);
			mesh.position.set(-16.22, 7.50, 37.44);
			mesh.rotation.set(3.14, 0.38, 3.14) ;
                        // ajoute l'attribut zone
                        mesh.zone = "forge";
			
		// ajoute la forge à la zone Forge (trois maisons)
                WebglSceneManager.scene.add(mesh);
                
	});// load
}
/**
 * Charge la taverne viking et lui applique sa texture
 */
WebglSceneMaker.loadVikingTaverne = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/vikingTaverne.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_taverne );
			mesh.scale.set(4,4,4);
			mesh.position.set(-0.23, 6.88, 21.08);
			mesh.rotation.set(3.14, -1.48, 3.14) ;
			
		//// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
	});// load
}
/**
 * Charge la ferme viking et lui applique sa texture
 */
WebglSceneMaker.loadVikingFarm = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/vikingFerme.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_farm );
			mesh.scale.set(4,4,4);
			mesh.position.set(39.47, 6.93, 35.66);
			mesh.rotation.set(0, -1.46, 0) ;
			
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
	});// load
}

/**
 * Charge les clotures entourant la ferme viking
 */
WebglSceneMaker.loadVikingFarmClotures = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/barriere.js", function(geometry) {
		// donn�es geo data
		var dataPos = {
			1 : {
				"position" :  new THREE.Vector3( 34.85, 6.83, 39.46 ),
				"rotation" :  new THREE.Vector3(0, -0.52, 0 )
			},
			2 : {
				"position" :  new THREE.Vector3( 32.40, 6.83, 49.28 ),
				"rotation" :  new THREE.Vector3( 0, -0.08, 0)
			},
			3 : {
				"position" :  new THREE.Vector3( 34.51, 6.83, 54.00 ),
				"rotation" :  new THREE.Vector3( 0, 0.68, 0)
			},
			4 : {
				"position" :  new THREE.Vector3(39.42, 6.83, 56.96 ),
				"rotation" :  new THREE.Vector3( 0.00, 1.20, 0.00 )
			},
			5 : {
				"position" :  new THREE.Vector3( 44.80, 6.83, 58.34 ),
				"rotation" :  new THREE.Vector3( 0, 1.40, 0 )
			},
			6 : {
				"position" :  new THREE.Vector3( 50.42, 6.83, 58.05 ),
				"rotation" :  new THREE.Vector3( 3.14, 1.40, 3.14 )
			},
			7 : {
				"position" :  new THREE.Vector3( 55.65, 6.83, 55.79 ),
				"rotation" :  new THREE.Vector3( 3.14, 1.0, 3.14 )
			},
			8 : {
				"position" :  new THREE.Vector3( 59.31, 6.83, 51.72 ),
				"rotation" :  new THREE.Vector3( 3.14, 0.62, 3.14 )
			},
			9 : {
				"position" :  new THREE.Vector3( 61.48, 6.83, 46.77),
				"rotation" :  new THREE.Vector3( 3.14, 0.28, 3.14 )
			},
			10 : {
				"position" :  new THREE.Vector3( 62.26, 6.83, 41.35 ),
				"rotation" :  new THREE.Vector3( 3.14, 0.08, 3.14 )
			},
			11 : {
				"position" :  new THREE.Vector3( 61.56, 6.83, 35.90 ),
				"rotation" :  new THREE.Vector3( 3.14, -0.24, 3.14 )
			},
			12 : {
				"position" :  new THREE.Vector3(59.90, 6.83, 30.50 ),
				"rotation" :  new THREE.Vector3( 3.14, -0.28, 3.14 )
			},
			13 : {
				"position" :  new THREE.Vector3(56.00, 6.83, 26.75 ),
				"rotation" :  new THREE.Vector3( 3.14, -1.10, 3.14 )
			}
		};
	
		// Ajoute les maisons
		for( var key in dataPos){
			// meshHouse1_1
			var meshHouse1 = new THREE.Mesh( geometry, WebglSceneMaker.mat_cloture );
				meshHouse1.scale.set(4,4,4);
				meshHouse1.position = dataPos[key]["position"];
				meshHouse1.rotation.set(dataPos[key]["rotation"].x, dataPos[key]["rotation"].y, dataPos[key]["rotation"].z) ;
			// ajoute la mesh à la scène
			WebglSceneManager.scene.add(meshHouse1);
		}
	});// load
}

/**
 * Charge le puit du village et lui applique sa texture
 */
WebglSceneMaker.loadPuit = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/puit.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_puit );
			mesh.scale.set(2, 2, 2);
			mesh.position.set(5.62, 7.09, 37.74);
			mesh.rotation.set(0, -1.38, 0) ;
			
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
	});// load
}


/**
 * Charge la maison du chef viking et lui applique sa texture
 */
WebglSceneMaker.loadVikingChiefHouse = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/vikingChefHouse.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_chiefHouse );
			mesh.scale.set(4,4,4);
			mesh.position.set(24.25, 33.50, -78.17);
			mesh.rotation.set(0, -0.76, 0) ;
			
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
	});// load
}

/**
 * Charge les arbres morts (6)
 */
WebglSceneMaker.loadDeadTrees = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/tree1.js", function(geometry) {
		// donn�es geo data
		var dataPos = {
			1 : {
				"position" :  new THREE.Vector3(38.07, 6.84, 14.76),
				"rotation" :  new THREE.Vector3(3.14, -1.36 , 3.14)
			},
			2 : {
				"position" :  new THREE.Vector3(-13.43, 33.09, -64.82 ),
				"rotation" :  new THREE.Vector3(0, -0.66, 0)
			},
			3 : {
				"position" :  new THREE.Vector3(-27.34, 33.09, -69.48),
				"rotation" :  new THREE.Vector3(3.14, 0.58, 3,14)
			},
			4 : {
				"position" :  new THREE.Vector3(-36.72, 31.36, -74.83),
				"rotation" :  new THREE.Vector3(0, -0.36, 0)
			},
			5 : {
				"position" :  new THREE.Vector3(-37.67, 33.22, -86.25),
				"rotation" :  new THREE.Vector3(3.14, 1.16, 3.14)
			},
			6 : {
				"position" :  new THREE.Vector3(-25.08, 32.85, -96.83),
				"rotation" :  new THREE.Vector3(0, 0.62, 0)
			}
		};
	
		// Ajoute les maisons
		for( var key in dataPos){
			// meshHouse1_1
			var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_deadTree );
				mesh.scale.set(4,4,4);
				mesh.position = dataPos[key]["position"];
				mesh.rotation.set(dataPos[key]["rotation"].x, dataPos[key]["rotation"].y, dataPos[key]["rotation"].z) ;
			//// ajoute la mesh à la scène
			WebglSceneManager.scene.add(mesh);
		}
	});// load
}

/**
 * Charge le chaudron (plac� sur le plateau sup�rieur) et lui applique sa texture
 */
WebglSceneMaker.loadChaudron = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/chaudron.js", function(geometry) {
		// Objet 3D
		var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_chaudron );
			mesh.scale.set(4,4,4);
			mesh.position.set(-19.43, 33.65, -79.02);
			
		// ajoute la mesh à la scène
		WebglSceneManager.scene.add(mesh);
	});// load
} 

/**
 * Charge tous les sapins
 */
WebglSceneMaker.loadSapins = function() {
	// charge le mod�le JSON
	WebglSceneMaker.jsonLoader.load( "webgl/models/sapin.js", function(geometry) {
		// donn�es geo data
		var dataPos = {
			1 : {
				"position" :  new THREE.Vector3(-88.30, 7.55, -17.50),
				"rotation" :  new THREE.Vector3(0,0,0)
			},
			2 : {
				"position" :  new THREE.Vector3(-78.74, 7.55, -10.76),
				"rotation" :  new THREE.Vector3(0, -1.5, 0)
			},
			3 : {
				"position" :  new THREE.Vector3(-71.95, 7.55, -3.27),
				"rotation" :  new THREE.Vector3(3.14,-1.08,3.14)
			},
			4 : {
				"position" :  new THREE.Vector3(-61.43, 7.55, -2.64),
				"rotation" :  new THREE.Vector3(0, 0.44, 0)
			},
			5 : {
				"position" :  new THREE.Vector3(-48.59, 7.55, -5.40),
				"rotation" :  new THREE.Vector3(0, 0.42, 0)
			},
			6 : {
				"position" :  new THREE.Vector3(-40.40, 7.55, -23.77),
				"rotation" :  new THREE.Vector3(0, 0.02, 0)
			},
			7 : {
				"position" :  new THREE.Vector3(-40.40, 7.55, -34.68),
				"rotation" :  new THREE.Vector3(0, -0.98, 0)
			},
			8 : {
				"position" :  new THREE.Vector3(-34.19, 7.55, -46.56),
				"rotation" :  new THREE.Vector3(0, -0.98, 0)
			},
			9: {
				"position" :  new THREE.Vector3(-51.19, 7.55, -56.32),
				"rotation" :  new THREE.Vector3(3.14, 0.12, 3.14)
			},
			10 : {
				"position" :  new THREE.Vector3(-45.06, 7.55, -48.88),
				"rotation" :  new THREE.Vector3(0, -1.34, 0)
			},
			11 : {
				"position" :  new THREE.Vector3(-49.46, 7.55, -39.37),
				"rotation" :  new THREE.Vector3(0, -1.30, 0)
			},
			12 : {
				"position" :  new THREE.Vector3(-49.46, 7.55, -28.82),
				"rotation" :  new THREE.Vector3(3.14, 0.34, 3.14)
			},
			13 : {
				"position" :  new THREE.Vector3(-60.45, 7.55, -33.78),
				"rotation" :  new THREE.Vector3(3.14, -1.14, 3.14)
			},
			14 : {
				"position" :  new THREE.Vector3(-60.47, 7.55, -46.75),
				"rotation" :  new THREE.Vector3(3.14, 0.04, 3.14)
			},
			15 : {
				"position" :  new THREE.Vector3(-73.13, 7.55, -46.75),
				"rotation" :  new THREE.Vector3(3.14, -1.46, 3.14)
			},
			16 : {
				"position" :  new THREE.Vector3(-80.92, 7.55, -23.39),
				"rotation" :  new THREE.Vector3(0, 0.28, 0)
			},
			17 : {
				"position" :  new THREE.Vector3(-85.56, 7.55, -31.08),
				"rotation" :  new THREE.Vector3(0, 1.44, 0)
			},
			18 : {
				"position" :  new THREE.Vector3(-71.54, 7.55, -21.47),
				"rotation" :  new THREE.Vector3(0, 1.44, 0)
			},
			19 : {
				"position" :  new THREE.Vector3(-71.54, 7.55, -13.87),
				"rotation" :  new THREE.Vector3(0, 0.16, 0)
			},
			20 : {
				"position" :  new THREE.Vector3(-62.45, 7.05, -12.69),
				"rotation" :  new THREE.Vector3(0, 0.16, 0)
			},
			21 : {
				"position" :  new THREE.Vector3(-55.74, 7.05, -12.69),
				"rotation" :  new THREE.Vector3(0, 1.24, 0)
			},
			22 : {
				"position" :  new THREE.Vector3(-63.21, 7.05, -40.72),
				"rotation" :  new THREE.Vector3(0, 1.04, 0)
			},
			23 : {
				"position" :  new THREE.Vector3(-48.77, 7.05, -42.56),
				"rotation" :  new THREE.Vector3(0, 1.02, 0)
			},
			24 : {
				"position" :  new THREE.Vector3(-7.76, 7.55, -36.52),
				"rotation" :  new THREE.Vector3(0, 0.02, 0)
			},
			25 : {
				"position" :  new THREE.Vector3(-10.87, 7.55, -29.05),
				"rotation" :  new THREE.Vector3(0, 0.72, 0)
			},
			26 : {
				"position" :  new THREE.Vector3(-1.41, 7.55, -29.05),
				"rotation" :  new THREE.Vector3(0, -0.02, 0)
			},
			27 : {
				"position" :  new THREE.Vector3(5.43, 7.55, -23.43),
				"rotation" :  new THREE.Vector3(0, -0.82, 0)
			},
			28 : {
				"position" :  new THREE.Vector3(-10.87, 7.55, -29.05),
				"rotation" :  new THREE.Vector3(0, 0.72, 0)
			},
			29 : {
				"position" :  new THREE.Vector3(-1.49, 7.55, -19.40),
				"rotation" :  new THREE.Vector3(0, -1.28, 0),
                                "scale" : new THREE.Vector3(4.62, 4.62, 4.62)
			},
			30 : {
				"position" :  new THREE.Vector3(9.42, 7.55, -12.81),
				"rotation" :  new THREE.Vector3(0, -1.76, 0)
			},
			31 : {
				"position" :  new THREE.Vector3(20.45, 7.55, -7.99),
				"rotation" :  new THREE.Vector3(0, 0.42, 0)
			},
			32 : {
				"position" :  new THREE.Vector3(20.45, 7.55, 0.23),
				"rotation" :  new THREE.Vector3(0, 0.02, 0)
			},
			33 : {
				"position" :  new THREE.Vector3(22.81, 7.55, 8.06),
				"rotation" :  new THREE.Vector3(0, 0.32, 0),
                                "scale" : new THREE.Vector3(3.28, 3.28, 3.28)
			},
			34 : {
				"position" :  new THREE.Vector3(-24.21, 7.55, 10.87),
				"rotation" :  new THREE.Vector3(3.14, -1.78, 3.14)
			},
			35 : {
				"position" :  new THREE.Vector3(-17.04, 7.55, 19.07),
				"rotation" :  new THREE.Vector3(0, -2.6, 0)
			},
			36 : {
				"position" :  new THREE.Vector3(-25.37, 7.55, 20.41),
				"rotation" :  new THREE.Vector3(0, -1.68, 0),
                                "scale" : new THREE.Vector3(5.04, 5.04, 5.04)
			},
			37 : {
				"position" :  new THREE.Vector3(-32.05, 7.55, 15.98),
				"rotation" :  new THREE.Vector3(3.14, -0.78, 3.14)
			},
			38 : {
				"position" :  new THREE.Vector3(-30.57, 7.55, 27.10),
				"rotation" :  new THREE.Vector3(0, -1.14, 0)
			},
			39 : {
				"position" :  new THREE.Vector3(-26.63, 7.55, 44.24),
				"rotation" :  new THREE.Vector3(0, -1.14, 0)
			},
			40 : {
				"position" :  new THREE.Vector3(12.06, 7.55, 49.32),
				"rotation" :  new THREE.Vector3(0, -1.14, 0)
			},
			41 : {
				"position" :  new THREE.Vector3(12.06, 7.55, 62.36),
				"rotation" :  new THREE.Vector3(0, -0.64, 0),
                                "scale" : new THREE.Vector3(5.14, 5.14, 5.14)
			},
			42 : {
				"position" :  new THREE.Vector3(12.38, 7.55, 72.60),
				"rotation" :  new THREE.Vector3(0, 0.34, 0)
			},
			43 : {
				"position" :  new THREE.Vector3(15.36, 7.55, 79.82),
				"rotation" :  new THREE.Vector3(0, 0.6, 0),
                                "scale" : new THREE.Vector3(3.28, 3.28, 3.28)
			},
			44 : {
				"position" :  new THREE.Vector3(43.06, 34.27, -82.77),
				"rotation" :  new THREE.Vector3(0, -0.82, 0)
			},
			45 : {
				"position" :  new THREE.Vector3(47.13, 34.27, -97.85),
				"rotation" :  new THREE.Vector3(0,-1.6, 0)
			},
			46 : {
				"position" :  new THREE.Vector3(35.03, 34.27, -100.12),
				"rotation" :  new THREE.Vector3(3.14, -2.28, 3.14)
			}
		};
	
		// Ajoute les maisons
		for( var key in dataPos){
			// meshHouse1_1
			var mesh = new THREE.Mesh( geometry, WebglSceneMaker.mat_sapin );
				mesh.scale.set(4,4,4);
				mesh.position = dataPos[key]["position"];
				mesh.rotation.set(dataPos[key]["rotation"].x, dataPos[key]["rotation"].y, dataPos[key]["rotation"].z) ;
			
                        // si le redimmensionnement est spécifié, alors on l'applique
                        if(dataPos[key]["scale"] != undefined){
                            mesh.scale.set(dataPos[key]["scale"].x,dataPos[key]["scale"].y, dataPos[key]["scale"].z) ;
                        }
                        // ajoute la mesh à la scène
			WebglSceneManager.scene.add(mesh);
		}
	});// load
}

/**
 * Charge toutes les textures
 */
WebglSceneMaker.setMaterials = function() {
	// Mat�riel de test
	WebglSceneMaker.globalMaterial = new THREE.MeshLambertMaterial({
            color: new THREE.Color ("rgb(255,255,255)")
        });
        
	
	// Viking House 1
	WebglSceneMaker.mat_maisonSimple = new THREE.MeshLambertMaterial({ 
	    map : THREE.ImageUtils.loadTexture('webgl/textures/vikingHouse1.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
	}); // MeshLambertMaterial
	
	// Mat�riel port viking
	WebglSceneMaker.mat_harbor = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/vikingPort.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
	
	// Mat�riel ferme viking
	WebglSceneMaker.mat_farm = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/vikingFerme.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
	// Mat�riel forge viking
	WebglSceneMaker.mat_forge = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/vikingForge.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
		
	// Mat�riel taverne viking
	WebglSceneMaker.mat_taverne = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/Taverne.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
		
	// Mat�riel maison du chef viking
	WebglSceneMaker.mat_chiefHouse = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/vikingChefHouse.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
	
	// Divers
	
	// Mat�riel du puit
	WebglSceneMaker.mat_puit = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/puit.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
		
	// Mat�riel du chaudron
	
	WebglSceneMaker.mat_chaudron = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/chaudron.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
	/*
	*/
	// Mat�riel des clotures entourant la ferme
	WebglSceneMaker.mat_cloture = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/barriere.jpg'),
		emissive : WebglSceneMaker.defaultEmissiveColor,
		side : THREE.DoubleSide
		});
		
	// Nature
	
	// Mat�riel de l'�le
	WebglSceneMaker.mat_island = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/ile_troisiemeEssais.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor
		});
	
	// Mat�riel de l'eau
	WebglSceneMaker.mat_water = new THREE.MeshPhongMaterial({
                map : THREE.ImageUtils.loadTexture('webgl/textures/water_texture.jpg'),
		color : new THREE.Color("rgb(58, 72, 165)"),
                emissive : new THREE.Color("rgb(255, 255, 255)"),
                shininess: 100,
		transparent : true,
		opacity : 0.68
                
	});
        WebglSceneMaker.mat_water_opaque = new THREE.MeshPhongMaterial({
		emissive : new THREE.Color("rgb(35,169,214)"),
		shininess : 80.00
	});
	
	// Mat�riel des arbres morts
	WebglSceneMaker.mat_deadTree = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/arbreMort.jpg'),
		emissive : WebglSceneMaker.defaultEmissiveColor
		});
	// Mat�riel des sapins
	WebglSceneMaker.mat_sapin = new THREE.MeshLambertMaterial({ 
		map: THREE.ImageUtils.loadTexture('webgl/textures/sapin.png'),
		emissive : WebglSceneMaker.defaultEmissiveColor
		});
	
}

WebglSceneMaker.addSkyBox = function() {
    var urls = [
        'webgl/textures/skybox/0004.jpg',
        'webgl/textures/skybox/0002.jpg',
        'webgl/textures/skybox/0005.jpg',
        'webgl/textures/skybox/0006.jpg',
        'webgl/textures/skybox/0001.jpg',
        'webgl/textures/skybox/0003.jpg'
    ];

    var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
    cubemap.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
    shader.uniforms['tCube'].value = cubemap; // apply textures to shader

    // create shader material
    var skyBoxMaterial = new THREE.ShaderMaterial( {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    // create skybox mesh
    var skybox = new THREE.Mesh(
    new THREE.BoxGeometry(4000, 4000, 4000),
        skyBoxMaterial
    );
    skybox.position.y = 0;

    WebglSceneManager.scene.add(skybox);
    
}