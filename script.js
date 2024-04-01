

function validarTel() {
  $(document).ready(function () {
    var $campoTelefone = $('#telefone');
    $campoTelefone.on('input', function (event) {
      var numeroLimpo = $(this).val().replace(/\D/g, '');
      const numeroFormatado = numeroLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      $(this).val(numeroFormatado);
    });
  })
};

function verificarDDD() {

  return new Promise(function (resolve, reject) {
    $.getJSON("validates/ddd_br.json", function (data) {

      function verificarCodigosArea(numero) {
        var ddd = numero.slice(0, 2);
        if (!data.ddd.includes(ddd)) {
          console.log("esta dificil")
          resolve(false);
        } else {
          resolve(true);
        }
      }
      verificarCodigosArea($("#telefone").val().replace(/[()\D]/g, ''));
    });
  });
}
function validarNome() {
  $(document).ready(function () {
    var $campoNome = $('#nome');
    $campoNome.on('input', function (event) {
      var nomeLimpo = $(this).val().replace(/\D/g, '');
      const nomeRegex = /^[a-zA-Z]+$/.test(nomeLimpo);
      if (nomeRegex) {
        console.log("A sequência contém apenas letras.");
    } else {
        console.log("A sequência contém números.");

    }
    });
  })
};

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
      var mensagemElemento = document.getElementById('mensagem');
      mensagemElemento.innerText = "Obrigado pelo cadastro!";
    },
    error: function (error) {
      var mensagemElemento = document.getElementById('mensagem');
      mensagemElemento.innerText = "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.";
    }
  });

}

$('#submit').click(function () {
  submitForm();
});

$(function () {
  $('.next-step').click(function (event) {
    event.preventDefault();

    var currentStep = $(this).parents('.form-step');
    var requiredFields = currentStep.find('[required]');
    var fieldsCompleted = true;
    var fieldName = []

    requiredFields.each(function () {
      if ($(this).val() === '') {
        var namefield = $(this).attr('name');
        fieldName.push(" " + namefield + " ")
      }

    });
    requiredFields.each(function () {
      if ($(this).val() === '') {
        fieldsCompleted = false;
      }
    });
    if (!fieldsCompleted) {
      var mensagemElemento = document.getElementById('mensagem');
      mensagemElemento.innerText = 'Por favor, preencha todos os campos obrigatórios.' + fieldName;
    } else if (!verificarDDD().then(function (resultado) {
      if (resultado) {
        currentStep.hide().next().show();
      } else {
        var mensagemElemento = document.getElementById('mensagem');
        mensagemElemento.innerText = 'Telefone inválido';
      }
    })) {

    } else {

    }
  });
});
var numeroLimpo = validarTel()
validarNome()