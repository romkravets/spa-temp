new SecviceList(new ServiceCart());
new TeachingList(new TeachingCart());
new ProductList(new Cart());

new WOW().init();


$(function () {
 $("[data-trigger]").on("click", function(){
      var trigger_id =  $(this).attr('data-trigger');
      $(trigger_id).toggleClass("show");
      $('body').toggleClass("offcanvas-active");
  });

  // close if press ESC button
  $(document).on('keydown', function(event) {
      if(event.keyCode === 27) {
         $(".navbar-collapse").removeClass("show");
         $("body").removeClass("overlay-active");
      }
  });

  // close button
  $(".btn-close").click(function(e){
      $(".navbar-collapse").removeClass("show");
      $("body").removeClass("offcanvas-active");
  });

  $("header .navbar-nav .nav-item").click(function (e) {
    $(".navbar-collapse").removeClass("show");
    $("body").removeClass("offcanvas-active");
  });
 //Moble menu
});


$('form input[type=text]').on('change invalid', function() {
    var textfield = $(this).get(0);
    textfield.setCustomValidity('');
    if (!textfield.validity.valid) {
    textfield.setCustomValidity('Заповніть будь ласка пусте поле');
    }
});

