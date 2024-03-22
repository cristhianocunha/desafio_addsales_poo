<?php
require_once 'app/classes/Leadbase.php';
use app\classes\LeadBase;

$lead = new LeadBase(
  $_POST["nome"],
  $_POST["email"],
  $_POST["telefone"],
  $_POST["data_nascimento"],
  $_POST["regiao"],
  $_POST["unidade"],
  $_POST["score"],
);
$lead->regionScore()->ageScore()->sendDb("add_sales", "leads");
