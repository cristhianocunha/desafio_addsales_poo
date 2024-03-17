<?php

namespace app\classes;
require_once 'app/classes/banco.php';
use app\classes\Banco;
use DateTime;

class LeadBase
{

    public function __construct(
        public string $nome,
        public string $email,
        public string $telefone,
        public string $data_nascimento,
        public string $regiao,
        public string $unidade,
        public int $score
    ) {
    }


    public function sendDb($cliente, $segmento)
    {
        $banco = new Banco("db", "root", "example", $cliente);
        $banco->connect();
        $banco->sendBanco($segmento, [
            'nome' => $this->nome,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'data_nascimento' => $this->data_nascimento,
            'regiao' => $this->regiao,
            'unidade' => $this->unidade,
            'score' => $this->score
        ]);
    }

    public function regionScore(): int
    {
        $regionScore = match ($this->regiao) {
            "Sul" => 4,
            "Sudeste" => 1,
            "Centro-Oeste" => 3,
            "Nordeste" => 2,
            "Norte" => 5
        };

        if ($this->unidade == 'São Paulo') {
            $regionScore--;
        }
        $score = $this->score - ($regionScore);
        return $this->score = $score;
    }

    public function caculeAge(): int
    {
        $ToDay = new DateTime();
        $age = $ToDay->diff(new DateTime($this->data_nascimento));
        return $age->y;
    }

    public function ageScore($idade)
    {
        if ($idade > 100 || $idade < 18) {
            $this->score = $this->score - 5;
        } elseif ($idade > 40 && $idade < 99) {
            $this->score = $this->score - 3;
        }

        return $this->score;
    }
}
