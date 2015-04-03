<?php
	//query user
	require_once(__DIR__ . "/../Model/Config.php");

	$array = array(
			'exp'=> '',
			'exp1'=> '',
			'exp2'=> '',
			'exp3'=> '',
			'exp4'=> '',

		);

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

		//builds new query
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");
		//checks to see if login password matches password in database
	if($query->num_rows == 1) {
		$row = $query->fetch_array();

		if($row["password"] === crypt($password, $row["salt"])) {
				//if user is authenticated, user has logged in
			$_SESSION["authenticated"] = true;
			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];
			echo json_encode($array);
		}
		else {
			echo "<p>Invalid username and password</p>";
		}
	}
	else {
		echo "<p>Invalid username and password</p>";
	}