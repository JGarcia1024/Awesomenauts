<?php
	require_once(__DIR__ . "/../model/config.php");

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	//creates a unique hash password
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

	$hashedPassword = crypt($password, $salt);

	//query database
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
			//sets certain information
		. "email = '$email', "
		. "username = '$username', "
		. "password = '$hashedPassword', "
		. "salt = '$salt', " 
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0,");

	$_SESSION["name"] = $username;

		//checks if query is successful
	if($query) {
		echo "true";
	}
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}