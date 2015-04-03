<?php
	//Directory of File. return of an include
	require_once(__DIR__ . "/../model/Config.php");
	require_once(__DIR__ . "/../Controller/login-verify.php");

if(!authenticateUser()) {
	header("Location: " . $path . "Index.php");
	die();
}

//stores a query
			//creates ech post to have an id, a title, text, and a key
	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
			// creates ids for posts
		 . "id int(11) NOT NULL AUTO_INCREMENT,"
		 . "title varchar(255) NOT NULL,"
			// creates post colum
		 . "post text NOT NULL,"
		 . "DateTime datetime NOT NULL,"
		 	//sets key to id
		 . "PRIMARY KEY (id))");
		//if true
	if($query) {
		echo "<p>Seccessfully created table: posts</p>";
	}
	//if false
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}

	
$query = $_SESSION["connection"]->query("CREATE TABLE users ("
	. "id int(11) NOT NULL AUTO_INCREMENT,"
	. "username varchar(30) NOT NULL,"
	. "email varchar(50) NOT NULL," 
	. "password char(128) NOT NULL,"
	. "salt char(128) NOT NULL,"
	. "PRIMARY KEY (id))");

//checks to see if query is false
if($query) {
	echo "<p> Successfully created table: users</p>";
}
else{
	echo "<p>" . $_SESSION["connection"]->error . "</p>";
}