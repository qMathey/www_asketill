/**
 * Class AudioManager permet de gérer l'ambiance sonore
 */

function AudioManager() {
}

// Constantes
// Propriétés
AudioManager.context = undefined;
AudioManager.buffer = undefined;
AudioManager.source = undefined;

// Static methods
/**
 * Initialise le manager de son
 */
AudioManager.init = function() {
    
    var canInitAudioContext = false;
    
    
    // essaie d'initialiser 
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        AudioManager.context = new AudioContext();
        
        canInitAudioContext = true;
        
    }
    catch(e) {
        console.log("WARNING : Web Audio API is not supported in this browser");
    }
    
    // si nous avons pu initialiser le context audio
    if(canInitAudioContext) {
    }

}

/**
 * Initialise et lance la musique
 */
AudioManager.start = function() {
    AudioManager.init();  
    
    AudioManager.loadAndPlaySound("./sounds/crows_group.mp3");
    
}

/**
 * Charge en mémoire une musique
 * @param url l'url du son à charger
 */
AudioManager.loadAndPlaySound = function(url) {
    
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    AudioManager.context.decodeAudioData(request.response, function(buffer) {
        AudioManager.buffer = buffer;
        // joue le son
        AudioManager.playSound(AudioManager.buffer);
        
    }, function() {
        // on error...
    });
    }
    request.send();
	
}
/**
 * Permet de jouer un son
 * @param buffer la son en mémoire
 */
AudioManager.playSound = function ( buffer ) {
    // creates a sound source
    AudioManager.source = AudioManager.context.createBufferSource(); 
    // tell the source which sound to play
    AudioManager.source.buffer = buffer;          
    // connect the source to the context's destination (the speakers)
    AudioManager.source.connect(AudioManager.context.destination);      
    // play the sound
    AudioManager.source.start(0);  
}