<?php
	// require once links config.php to login-verify.php
	require_once(__DIR__ . "/../model/config.php");
	
	// the file login-verify.php can use function to detemine if the user is logged in or not
	function authenticateUser() {
		// if stement checks if session variable authenicated is not set
		if(!isset($_SESSION["authenticated"])) {
			return false;
        }
        // else statement checks if the session variable has been set
        else {
        	if($_SESSION["authenticated"] != true){
        		return false;
        	}
        else {
        	return true;
        }
             }
	}