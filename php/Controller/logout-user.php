<?php
	// links logout-user to config.php
	require_once(_DIR__ . "/../model/config.php");

	//gets rid of our authenticated login
	unset($_SESSION["authenticated"]);
    // makes sure that the login remains on the server
	session_destroy();
	// tells the exact location we want the file to be sent to
	header("Location: " . $path . "index.php");
?>