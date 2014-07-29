<?php
// Requires
require_once("config.php");
require_once("class/DatabaseManager.php");
require_once("class/ServicePartie.php");

$action = false;

if(isset($_GET['action'])){
    $action = $_GET['action'];
    
    switch($action) {
        case 'insertPartie' :
            
            $lastInsertedId = ServicePartie::insertPartie($_GET["suspect"], $_GET["raison"], $_GET["canPlayWebgl"]);
            echo $lastInsertedId;
            break;
        case 'updateRaison' :
            $id = ServicePartie::updateRaisonPartie($_GET["idPartie"], $_GET["raison"]);
            echo $id;
            break;
        case 'getNbParties' :
            $nbParties = ServicePartie::getCountParties();
            echo $nbParties;
            break;
        case 'getNbVoteBySuspect':
            
            $arraySuspect = ServicePartie::getNbVoteBySuspect();
            
            echo "<suspects>";
            foreach($arraySuspect as $suspect) {
                echo "<suspect nbVotes=\"".$suspect->nbVotes."\">";
                    echo $suspect->suspect;
                echo "</suspect>";
            }
            echo "</suspects>";
            
            break;
    }// switch
    
    
} else {
    echo "0";
}

?>