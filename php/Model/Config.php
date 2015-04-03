<?php
		
	require_once(__DIR__ . "/database.php");
		//preserves information to create only 1
	session_start();
	//creates new id
	session_regenerate_id(true);
		//access post.php
	$path = "/JoshuaGAwesomenauts/php/";

	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";
	//checks if variable is called session and exists
	if(!isset($_SESSION["connection"])) {
		//creates new object stored in connection
		$connection = new Database($host, $username, $password, $database);
		//create session variable
		$_SESSION["connection"] = $connection;
}