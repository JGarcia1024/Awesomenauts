<?php
	require_once(__DIR__ . "/../Model/Config.php");
		//funtion determines if user is logged in
	function authenticateUser() {
		if(!isset($_SESSION["authenticated"])) {
				return false;
		}
		else {
			if($_SESSION["authenticated"] != true) {
				return false;
			}
			else {
				return true;
			}
		}
	}

