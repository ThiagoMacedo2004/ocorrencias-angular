<?php

class Sql {

	const HOSTNAME = "localhost";
	const USERNAME = "root";

	const PASSWORD = "";
	const DBNAME = "ocorrencia";

	private $conn;
	

	
	public function __construct()
	{

		$this->conn = new \PDO(
			"mysql:dbname=".Sql::DBNAME.";host=".Sql::HOSTNAME, 
			Sql::USERNAME,
			Sql::PASSWORD
			
		);

		$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	}

	public function setParams($statement, $parameters = array())
	{
		foreach ($parameters as $key => $value) {		
			$this->bindParam($statement, $key, $value);
		}
	}

	public static function bindParam($statement, $key, $value)
	{
		$statement->bindParam($key, $value);	
	}

	public function query($rawQuery, $params = array()):array
	{
		$stmt = $this->conn->prepare($rawQuery);
		$this->setParams($stmt, $params);

		try {
			$stmt->execute();
			return array(
				"sucesso" => 'Ok'
			);
		} catch (\PDOException $e) {
			return array(
				"error" => "Erro:\n{$e->getMessage()}"
			);
		}
	}

	public function select($rawQuery, $params = array()):array
	{
		$stmt = $this->conn->prepare($rawQuery);
		$this->setParams($stmt, $params);

		try{
			$stmt->execute();
			return $stmt->fetchAll(\PDO::FETCH_ASSOC);
		} catch (\PDOException $e) {
			return array(
				"error" => "Erro:\n{$e->getMessage()}"
			);
		}
	}

}
