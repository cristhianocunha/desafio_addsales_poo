

function validarTel() {
  $(document).ready(function () {
    var $campoTelefone = $('#telefone');
    $campoTelefone.on('input', function (event) {
      var numeroLimpo = $(this).val().replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos      
      if (numeroLimpo.slice(2, 3) === '3') { // Verifica se o número de telefone tem 11 dígitos (incluindo DDD)
        const numeroFormatado = numeroLimpo.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        $(this).val(numeroFormatado);
      } else if (numeroLimpo.slice(2, 3) === '9') { // Verifica se o número de telefone tem 10 dígitos
        const numeroFormatado = numeroLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        $(this).val(numeroFormatado);
      } // Você pode adicionar mais condições conforme necessário para outros padrões de formatação


    });
  })
};

function verificarDDD() {

  return new Promise(function (resolve, reject) {
    $.getJSON("validates/ddd_br.json", function (data) {

      function verificarCodigosArea(numero) {
        var ddd = numero.slice(0, 2);
        if (!data.ddd.includes(ddd)) {
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
    $("#nome").on("input", function () {
      var regexp = /[^a-zA-Z]/g;
      if (this.value.match(regexp)) {
        $(this).val(this.value.replace(regexp, ' '));
      }
    })
  })
};
function validarEmail() {
  $(document).click(function () {
  $('#email').on("input", function () {
   
    function valide(email) {
      var re = /\S+@\S+\.\S+/;
     return re.test(email)
    }
    console.log('aq')
    var email = $('#email')
    if (valide(email)) {
      console.log('email')
    } else {
      console.log('erro')
    };
  })
})
}


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
validarEmail()