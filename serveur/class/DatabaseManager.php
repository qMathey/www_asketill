<?php

/*
 * and open the template in the editor.
 */

/**
 * DatabaseManager permet de gérer une base de données
 *
 * @author Quentin
 */
class DatabaseManager {
      // Propriété
    private $pdoConnector;
    
    // information renseigné
    private $db_dns;
    private $db_user;
    private $db_password;
    
    /**
     * Constructeur de la classe DatabaseManager
     */
    public function __construct( $dbDNS, $dbUser, $dbPassword ) {
        
        // recupère les informations 
        $this->db_dns = $dbDNS;
        $this->db_user = $dbUser;
        $this->db_password = $dbPassword;
        
        // tentative de connection à la base de données
        try {
        
            $this->pdoConnector = new PDO($this->db_dns, $this->db_user, $this->db_password);
        }// truy
        catch(Exception $e) {
           die("Connextion échouée : ".$e);
        } // 
        
    } // __construct
    
    /**
     * Récupère un tableau d'objet selon la requête
     * @param String $query contient la requête SQL
     * @return Array contient les objets recherchés
     */
    public function getObjectsFromQuery( $query ) {
        
        $query = $this->pdoConnector->query( $query );
        $query->setFetchMode(PDO::FETCH_OBJ);
        
        $returnArray = [];
        
        // Nous traitons les résultats en boucle
        while( $row = $query->fetch() )
        {
            $returnArray[] = $row;
        }       
        
        //retourne les résultats
        return $retrunArray;
    }
    
    
    /**
     * Insert dans la DB la requête donnée en paramètre. Retourne l'id du der
     * @param type $query
     * @return int id dernier objet inséré
     */
    public function insert( $query ) {
        
        $query = $this->pdoConnector->prepare( $query );
        $query->execute();
        return $this->pdoConnector->lastInsertId();
    }
    
} // class
