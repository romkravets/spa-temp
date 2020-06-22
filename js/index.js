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

$(".gallery").slick({
    slidesToShow: 1,
    //variableWidth: true,
    //centerMode: true,
    variableWidth: true,
    autoplay: true,
    cssEase: "ease",
    dots: false,
    prevArrow: '<span class="prev"><img class="img-fluid rotate-icon-left" src="img/icons/next.svg"></img></span>',
    nextArrow: '<span class="next"><img class="img-fluid" src="img/icons/next.svg"></img></span>',
    // responsive: [{
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 5,
    //       centerMode: true,
    //     },
    //   },
    //   {
    //     breakpoint: 992,
    //     settings: {
    //       slidesToShow: 4,
    //       centerMode: true,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 1,
    //       centerMode: true,
    //     },
    //   },
    // ],
  })
  .on('setPosition', function (event, slick) {
    slick.$slides.css('height', slick.$slideTrack.height() + 'px');
});

});


$('form input[type=text]').on('change invalid', function() {
    var textfield = $(this).get(0);
    textfield.setCustomValidity('');
    if (!textfield.validity.valid) {
    textfield.setCustomValidity('Заповніть будь ласка пусте поле');
    }
});


/*
		variables
	*/

    var $imagesSlider = $(".gallery-slider .gallery-slider__images>div"),
    $thumbnailsSlider = $(".gallery-slider__thumbnails>div");

/*
sliders
*/

// images options
$imagesSlider.slick({
  speed:300,
//   autoplay: true,
  slidesToShow:1,
  slidesToScroll:1,
  cssEase:'linear',
  fade:true,
  draggable:false,
  asNavFor:".gallery-slider__thumbnails>div",
  prevArrow:'.gallery-slider__images .prev-arrow',
  nextArrow:'.gallery-slider__images .next-arrow'
});

// thumbnails options
$thumbnailsSlider.slick({
   speed:300,
  slidesToShow:5,
//   autoplay: true,
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

/* 
captions
*/

// var $caption = $('.gallery-slider .caption');

// // get the initial caption text
// var captionText = $('.gallery-slider__images .slick-current img').attr('alt');
// updateCaption(captionText);

// // hide the caption before the image is changed
// $imagesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
//   $caption.addClass('hide');
// });

// // update the caption after the image is changed
// $imagesSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
//   captionText = $('.gallery-slider__images .slick-current img').attr('alt');
//   updateCaption(captionText);
// });

// function updateCaption(text) {
//   // if empty, add a no breaking space
//   if (text === '') {
//       text = '&nbsp;';
//   }
//   $caption.html(text);
//   $caption.removeClass('hide');
// }

