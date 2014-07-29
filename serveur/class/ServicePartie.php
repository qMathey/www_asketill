<?php

/**
 * ServicePartie permet de gérer la persistance des parties
 *
 * @author Quentin
 */
class ServicePartie {
    
    /**
     * Retourne toutes les parties
     * @return array avec objets Partie
     */
    public static function getAllParties() {
       $dbManager = new DatabaseManager(DB_DNS, DB_USER, DB_PASSWORD);
       
       $parties = $dbManager->getObjectsFromQuery("SELECT * FROM partie");
       
       return $parties;
        
    }
    
    /**
     * Retourne le nombre de parties
     * @return int nbPartie
     */
    public static function getCountParties() {
       $dbManager = new DatabaseManager(DB_DNS, DB_USER, DB_PASSWORD);
       
       $parties = $dbManager->getObjectsFromQuery("SELECT count(*) AS countPartie FROM partie");
       
       $nbParties = $parties[0].countPartie;
       return $nbParties;
        
    } // getCountParties
    
    /**
     * Retourne le nombre de parties
     * @return dernier id inséré
     */
    public static function insertPartie($suspect, $raison, $canPlayWebgl) {
       $dbManager = new DatabaseManager(DB_DNS, DB_USER, DB_PASSWORD);
       
       $raison = addslashes($raison);
       
       $insertId = $dbManager->insert("INSERT INTO `partie` (`id`, `date`, `suspect`, `raison`, `canPlayWebgl`) VALUES (NULL, CURRENT_TIMESTAMP, '".$suspect."', '".$raison."', ".$canPlayWebgl.");");
       
       return $insertId;
        
    } // insertPartie
    
    
    /**
     * Modifie la raison d'une partie 
     * @return dernier id inséré
     */
    public static function updateRaisonPartie($id, $raison) {
        
       $raison = addslashes($raison);
        
       $dbManager = new DatabaseManager(DB_DNS, DB_USER, DB_PASSWORD);
       $dbManager->insert("UPDATE `www_asketill`.`partie` SET `raison` = '".$raison."' WHERE `partie`.`id` = ".$id." ;");
       
       return $id;
        
    } // insertPartie
    
    
    /**
     * Retourne le nombre de parties
     * @return type
     */
    public static function getNbVoteBySuspect() {
       $dbManager = new DatabaseManager(DB_DNS, DB_USER, DB_PASSWORD);
       
       $arrayNbVotesBySuspect = $dbManager->getObjectsFromQuery("SELECT suspect, count(*) as nbVotes FROM partie ORDER BY nbVotes DESC" );
       
       return $arrayNbVotesBySuspect;
        
    } // getNbVoteBySuspect
}

?>
