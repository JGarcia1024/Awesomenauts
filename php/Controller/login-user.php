<?php
	// require once links config.php file to login-user.php file
   require_once(__DIR__ . "/../model/config.php");	

// adds exp variables from config.php and game.js
   $array = array(
      'exp'=> '',
      'exp1'=> '',
      'exp2'=> '',
      'exp3'=> '',
      'exp4'=> '',
      );

   // username and password variable help you login with authenication
   $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
   $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

   //query selects salt password from a username in our users table.
   $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");
	
	//checks if information is stored in the query variable
   if($query->num_rows == 1) {
   	 $row = $query->fetch_array();

   	 //checks if the login was successful
   	 if($row["password"] === crypt($password, $row["salt"])) {
   	 	// tells website that the user has logged in
   	 	$_SESSION["authenticated"] = true;
         //adds array exp variables into the login successful function
         $array["exp"] = $row["exp"];
         //adds array exp variables into the login successful function
         $array["exp1"] = $row["exp1"];
         //adds array exp variables into the login successful function
         $array["exp2"] = $row["exp2"];
         //adds array exp variables into the login successful function
         $array["exp3"] = $row["exp3"];
         //adds array exp variables into the login successful function
         $array["exp4"] = $row["exp4"];
         $_SESSION["name"] = $username;

   	 	echo json_encode($array);
   	 }
   	 // else statement echos if the if statemt was incorrect
   	 else {
   	 	echo "Invalid username and password";
   	 }
   }
   // else statement echos if the if statment for $query is not working
   else {
   	echo "Invalid username and password";
   }