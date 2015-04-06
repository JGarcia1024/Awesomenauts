<?php
	require_once(__DIR__ . "/Database.php");
	// perseves information so that we dont have to create/generate that information, so that when we preserve it, it will be avaliable throughout our code
	//starts our session variable
	session_start();
	session_regenerate_id(true);
// variable stores the path for our blog project
$path = "/awesomenauts/php/";

/* the variable that has our local host stored in it*/
 $host = "localhost";
 /* the variable username is the name of our username for our php admin account*/
 $username = "root";
 // the variable password is our password for our php admin account
 $password = "root"; 
 // the variable database stores the name the name of our database
 $database = "awesomenauts_db";

// isset checks if $_SESSION has the same $connection stored in it; only creates database once
if(!isset($_SESSION["connection"])) {
 	// new database object that helps query on the database
	 $connection = new Database($host, $username, $password, $database);
	 //stores variable connection in the variable session
	 $_SESSION["connection"] = $connection;
}

?>