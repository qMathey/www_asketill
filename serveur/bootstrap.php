<?php
// Requires
require_once("config.php");
require_once("class/DatabaseManager.php");
require_once("class/ServicePartie.php");

$action = false;

// Si une action est bien spécifiée
if(isset($_GET['action'])){
    $action = $_GET['action'];
    
    switch($action) {
        // réalise une nouvelle partie
        case 'insertPartie' :
            
            $lastInsertedId = ServicePartie::insertPartie($_GET["suspect"], $_GET["raison"], $_GET["canPlayWebgl"]);
            echo $lastInsertedId;
            
            break;
        // met à jour la raison de l'accusation
        case 'updateRaison' :
            
            $id = ServicePartie::updateRaisonPartie($_GET["idPartie"], $_GET["raison"]);
            echo $id;
            
            break;
        
        // récupère le nombre de parties jouées
        case 'getNbParties' :
            
            $nbParties = ServicePartie::getCountParties();
            echo $nbParties;
            
            break;
        
        // récupère le nombre de votes par suspects
        case 'getNbVoteBySuspect':
            
            $arraySuspect = ServicePartie::getNbVoteBySuspect();
            
            echo "<suspects>";
            foreach($arraySuspect as $suspect) {
                echo "<suspect nbVotes=\"".$suspect->nbVotes."\">";
                    echo $suspect->suspect;
                echo "</suspect>";
            }// foreach
            echo "</suspects>";
            
            break;
            
        case 'getRaisonFromSuspect' :
            
            $arrayRaisons = ServicePartie::getRaisonForSuspects($_GET['suspectID'], 10);
            
            echo "<raisons>";
            foreach($arrayRaisons as $raison) {
                echo "<raison>";
                    echo $raison->raison;
                echo "</raison>";
            }// foreach
            echo "</raisons>";
            break;
        default :
            // par défaut, erreur
            echo "0";
            break;
    }// switch
    
    
} else { // sinon erreur
    echo "0";
}

?>