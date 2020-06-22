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


var $imagesSlider = $(".gallery-slider .gallery-slider__images>div"),
$thumbnailsSlider = $(".gallery-slider__thumbnails>div");


$imagesSlider.slick({
  speed:300,
  slidesToShow:1,
  slidesToScroll:1,
  cssEase:'linear',
  fade:true,
  draggable:false,
  asNavFor:".gallery-slider__thumbnails>div",
  prevArrow:'.gallery-slider__images .prev-arrow',
  nextArrow:'.gallery-slider__images .next-arrow'
});

$thumbnailsSlider.slick({
   speed:300,
  slidesToShow:5,
  slidesToScroll:1,
  cssEase:'linear',
  centerMode:true,
  draggable:false,
  focusOnSelect:true,
  asNavFor:".gallery-slider .gallery-slider__images>div",
  prevArrow:'.gallery-slider__thumbnails .prev-arrow',
  nextArrow:'.gallery-slider__thumbnails .next-arrow',
  responsive: [
      {
          breakpoint: 720,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 4
          }
      },
      {
          breakpoint: 576,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3
          }
      },
      {
          breakpoint: 350,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      }
  ]
});
