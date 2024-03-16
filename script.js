const citiesByregiao = {
  Sul: ["Porto Alegre", "Curitiba"],
  Sudeste: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"],
  "Centro-Oeste": ["Brasília"],
  Nordeste: ["Salvador", "Recife"],
  Norte: ["Não possui disponibilidade"]
};

function updateCities() {
  const selectedregiao = document.getElementById("regiao").value;
  $('#unidade').empty();
  citiesByregiao[selectedregiao].forEach(function (item) {
    $('#unidade').append('<option>' + item + '</option>');
  });

}

function submitForm() {
  var nome = $("#nome").val();
  var data_nascimento = $("#data_nascimento").val();
  var email = $("#email").val();
  var telefone = $("#telefone").val();
  var regiao = $("#regiao").val();
  var unidade = $("#unidade").val();

  let score = 10;

  const formData = {
    nome: nome,
    email: email,
    telefone: telefone,
    data_nascimento: data_nascimento,
    regiao: regiao,
    unidade: unidade,
    score: score
  };

  $.ajax({
    url: "lead.php",
    type: "POST",
    data: formData,
    cache: false,
    success: function (response) {
      alert("¡Formulario enviado con éxito!");

    },
    error: function (error) {

      alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
    }
  });

}


$('#submit').click(function () {
  submitForm();
});

$(function () {
  $('.next-step').click(function (event) {
    event.preventDefault();
    $(this).parents('.form-step').hide().next().show();
  });
});