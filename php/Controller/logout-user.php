<?php
	require_once(__DIR__ . "/../Model/Config.php");
		//deletes variable
	unset($_SESSION["authenticate"]);
		//cleans session of login
	session_destroy();
	header("Location: " . $path . "Index.php");
	die();