$(document).ready(function () {
   $(".product-carousel").slick({
     slidesToShow: 5,
     autoplay: false,
     dots: false,
     cssEase: "ease",
     autoplaySpeed: 3000,
   //   appendArrows: ".slider-arrows",
   //   nextArrow: '<i class="fa fa-arrow-right slider-arrow"></i>',
   //   prevArrow: '<i class="fa fa-arrow-left slider-arrow"></i>',
     responsive: [{
         breakpoint: 1024,
         settings: {
           slidesToShow: 4,
         },
       },
       {
         breakpoint: 992,
         settings: {
           slidesToShow: 3,
         },
       },
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 1,
         },
       },
     ],
   });
});