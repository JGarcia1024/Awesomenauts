<?php
// require once links config.php to create-user.php
	require_once(__DIR__ . "/../model/config.php");

	//inputs username to database
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	//inputs password to database
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	
// salt variable used to disquise our password and not reveal what it really is
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

// hashedpassword variable 
	$hashedPassword = crypt($password, $salt);

//querys the database
// query inserts into our table called users and inserts certian values
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt', "
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0");

	// sets up the username so that the user can enter their name
	$_SESSION["name"] = $username;

	// if statement checks if the query function was successful or not
	if ($query) {
		//need this for Ajax on index.php
		echo "true";
	}
	//else statement echos if the query wasnt successful
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}