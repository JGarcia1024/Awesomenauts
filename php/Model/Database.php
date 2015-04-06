		<?php
		// A class is a collection of variables and functions working with these variables. Making a database as an object
		// we create classes to store our variables public or private 
		class Database {
		// member/ instance variables
		// private variables can only be accessed from Database.php
		private $connection;	
		private $host;
		private $username;
		private $password;
		private $database;
		// made a public variable because we want access to it in other folders
		public $error;

		// The constructor is called on an object after it has been created, and it is a good place to put initialisation code.
		// the variables inside of the braces are global variables
		public function __construct($host, $username, $password, $database){
			// accesses global variables by using the key word this then the arrow which will give us access to the global variables.
			$this->host = $host;
			$this->username = $username;
			$this->password = $password;
			$this->database = $database;

			//connects our host, username, and password to mysqli
			$this->connection = new mysqli($host, $username, $password);

		  // this if/else statement is used if there is a conncetion error 
			if($this->connection->connect_error) {
			die("<p>Error: " . $connection->connect_error . "</p>");
		}
		// this line of code shows that there is a connection with the database
		$exists = $this->connection->select_db($database);

		//creates the variable database for my admin
		   if(!$exists){
		   $query = $connection->query("CREATE DATABASE $database");

		   // successfully creates database
		   if($query){
		       echo "<p>Successfully created database: " . $database . "</p>";
		   }
		}
		
		}
		// public function is used to open classes through an open connection
		public function openConnection() {
			// this variable establishes connection to the database class and the constuct function
			$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
			// this if/else statement is used if there is a conncetion error 
		    if($this->connection->connect_error) {
		       die("<p>Error: " . $this->connection->connect_error . "</p>");
		   }
		}
		// function closes the connection
		// isset function checks if there is info present in the variable.
		// isset checks if there is a connection.
		// function is a block of statements that can be used repeatly in a program; will execute if called
		public function closeConnection() {
			if(isset($this->connection)) {
				$this->connection->close();
			}
		}
		// after you call the object you will be able to specifically call on the function above. Wont have to constantly repeat it. 
		public function query($string) {
			// calls on the openConnection function at line 23, executes all the line of code below it
			$this->openConnection();

			// querys the connection you have above
			//executes query in database
			$query = $this->connection->query($string);
			// if statement for error
			if(!$query) {
				$this->error = $this->connection->error;
			}
	
			//closes connection
			$this->closeConnection();
			// returns the query variable if it is true or false
			return $query;

		}
		}

		?>