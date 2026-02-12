$(function () {
  jQuery.extend(jQuery.validator.messages, {
    required: "Este campo es obligatorio.",
    remote: "Por favor, rellena este campo.",
    email: "Por favor, escribe una dirección de correo válida",
    url: "Por favor, escribe una URL válida.",
    date: "Por favor, escribe una fecha válida.",
    dateISO: "Por favor, escribe una fecha (ISO) válida.",
    number: "Por favor, escribe un número entero válido.",
    digits: "Por favor, escribe sólo dígitos.",
    creditcard: "Por favor, escribe un número de tarjeta válido.",
    equalTo: "Por favor, escribe el mismo valor de nuevo.",
    accept: "Por favor, escribe un valor con una extensión aceptada.",
    maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
    range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
    max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
    min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
  });
  $("#frm-contacto").validate();
  $("#frm-contacto").on("submit", function () {
    var $frm = $(this);
    var $btnSubmit = $frm.find("button[type=submit]");
    if (grecaptcha.getResponse().length === 0) {
      alert("Por favor valida el reCAPTCHA");
      return false;
    }
    var comentario = $("#comentario").val();
    if (comentario.length < 10) {
      alert("Comentario es necesario.");
      return false;
    }
    $btnSubmit.button("loading");
    $.ajax({
        url: 'email.php',
        type: 'POST',
        dataType: 'json',
        data: $frm.serialize(),
      })
      .done(function (r) {
        console.log("success", r);
        if (!r.Success) {
          alert(r.Result);
        } else {
          alert("Muchas gracias, en breve estaremos en contacto con usted");
          $frm[0].reset();
          grecaptcha.reset();
        }
      })
      .fail(function (err) {
        console.log("error", err);
      })
      .always(function () {
        $btnSubmit.button("reset");
      });
    return false;
  });
  AOS.init();
  //$("#typed-1").typed({
  //strings: [
  //"LEVANTAMIENTO TOPOGRAFICO",
  //"LEVANTAMIENTO DE ELEMENTOS EXISTENTES CON ESCANER LASER",
  //"ESTUDIOS DE  MECANICA DE SUELOS",
  //"ESTUDIO HIDROLOGICO",
  //"ASESORIA Y CONSULTORIA EN SU OBRA",
  //"DISEÑO ESTRUCTURAL ASISTIDO POR COMPUTADORA",
  //"INGENIERIA BASICA RESICENCIAL, COMERCIAL E INDUSTRIAL",
  //"INGENIERIA DE DETALLE Y MAQUILA DE PLANOS UTILIZANDO EL TEKLA",
  //"NAVES INDUSTRIALES ",
  //"EDIFICIOS MULTINIVELES y COMERCIALES",
  //"TODO TIPO DE CIMENTACIONES",
  //"PLANOS ASBUILT",
  //"PLANOS ARQUITECTONICOS ",
  //"REPRESENTACION, PLANTA, ELEVACIONES, CORTES E ISOMETRIAS, PLANOS DE DETALLES ESTRUCTURALES, ARQUITECTONICOS, ELECTRICOS Y MECANICOS ",
  //"CUANTIFICACION DE MATERIAL",
  //"PROYECTO EJECUTIVO ",
  //"VOLUMETRIAS",
  //"PLANOS CIVILES CONSTRUCTIVOS",
  //"PLANIMETRIAS CONSTRUCTIVAS APOYADAS EN PROYECTOS EJECUTIVOS O PARA DESARROLLO DE PROYECTO EJECUTIVO",
  //"PLANOS DE DETALLES CONSTRUCTIVOS DE ING. CIVIL, ING. ELECTRICA, ING. MECANICA O ESTRUCTURAL"
  //],
  //showCursor: false,
  //contentType: 'html',
  //});
  $("#trigger-pushy").on("mouseenter click", function (e) {
    if (!$("body").hasClass("pushy-open-left")) {
      $("body").addClass("pushy-open-left");
    }
  });
  $("#menu a").on('click', function (e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {
      window.location.hash = hash;
    });
  });
  $("#Video-vide").vide("content/DESAIngenieriaHome.mp4", {
    loop: true,
    muted: true,
    position: "0% 0%",
    resizing: true
  });
  //Proyectos
  $('.bxslider').bxSlider({
    adaptiveHeight: true,
    mode: 'fade',
    onSlideAfter: function (li) {
      var ProyectoImage = $(li).find(".Proyecto-image");
      setBlurBG(ProyectoImage);
    }
  });
  setBlurBG($(".Proyecto-image")[0]);
  $("#loading").fadeOut(1000);
});

function setBlurBG(el) {
  var $this = $(el);
  var imageURL = $this.find("img").attr("src");
  $this.backgroundBlur({
    imageURL: imageURL,
    blurAmount: 5,
    imageClass: 'bg-blur',
    overlayClass: 'bg-blur-overlay',
    duration: 500,
    endOpacity: 0.6
  });
}
