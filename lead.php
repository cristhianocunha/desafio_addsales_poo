<?php

include_once "app\classes\Lead.php";

use app\classes\Lead;

$lead = new Lead(
  $_POST["nome"],
  $_POST["email"],
  $_POST["telefone"],
  $_POST["data_nascimento"],
  $_POST["regiao"],
  $_POST["unidade"],
  $_POST["score"],
);
$lead->regionScore();
$lead->ageScore($lead->caculeAge());
var_dump($lead->score);
$lead->sendDb("add_sales", "leads");
