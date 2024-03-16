<?php

namespace app\classes;

use PDO;
use PDOException;

class Banco
{
    public $conn;
    public $response;

    public function __construct(

        public string $servername,
        public string $username,
        public string $password,
        public string $dbname,

    ) {
    }

    public function connect() 
    {
        try {
            $this->conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->response = [
                'status' => 'success',
                'message' => "Connected sucesso"
            ];
            header('Content-Type: application/json');
            echo json_encode($this->response);
        } catch (PDOException $e) {
            $this->response = [
                'status' => 'fail',
                'message' => "Connected fail" . $e->getMessage()
            ];
            header('Content-Type: application/json');
            echo json_encode($this->response);
        }
    }

    public function sendBanco($segmento, $data)
    {
        $sql = "INSERT INTO $segmento (nome, email, telefone, data_nascimento, regiao, unidade, score) 
        VALUES (:nome, :email, :telefone, :data_nascimento, :regiao, :unidade, :score)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':telefone', $data['telefone']);
        $stmt->bindParam(':data_nascimento', $data['data_nascimento']);
        $stmt->bindParam(':regiao', $data['regiao']);
        $stmt->bindParam(':unidade', $data['regiao']);
        $stmt->bindParam(':score', $data['score']);
        $stmt->execute();


        if ($stmt->rowCount()) {
            return true;
        } else {
            return false;
        }
    }
}
