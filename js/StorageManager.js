/**
 * Class StorageManager permet de stocker des données locales au nivagitateur
 * Via localstorage de HTML5
 */

function StorageManager() {
}


// Méthodes statiques 

/**
 * Détermine si l'utiliateur possède la fonction HTML5 localstorage
 * @returns {String|Boolean|window}
 */
StorageManager.supports_html5_storage = function () {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

/**
 * Permet de sauver l'information dans localstorage
 * @param {type} $key la clé de l'élément à sauver
 * @param {type} $value la valeur de l'lélment à sauver
 * @returns {undefined}
 */
StorageManager.saveItem = function ( $key, $value ){
    
    if(StorageManager.supports_html5_storage()) {
        
        // sauvegarde les informations
        localStorage.setItem($key, JSON.stringify($value));
    }
    else {
        console.log("Local storage non disponible");
    }
    
} 

/**
 * Récupère un item dans localstorage
 * @param {String} $key la clé de l'item
 * @returns {object} objet recherché
 */
StorageManager.getItem = function ( $key ){
    
    var item = undefined;
    
    if(StorageManager.supports_html5_storage()) {
        
        // recupère l'information
        item = JSON.parse(localStorage.getItem($key));
    }
    else {
        console.log("Local storage non disponible");
    }
    
    return item;
    
} 

/**
 * Supprime toutes les informations contenues dans localstorage
 * @returns {undefined}
 */
StorageManager.clear = function () {
    localStorage.clear();
}