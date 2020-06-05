new ProductList(new Cart());

class Teaching {
    constructor(cart) {
        this.cart = cart;
        this.container = document.querySelector('.teach-container');
        this.productService = new TeachService();
        this.productService
          .getTeachs()
          .then(() => this.renderTeachs())
          .then(() => this.addEventListeners());
      }
      async renderTeachs() {
        let productListDomString = '';
        const teachs = await this.productService.getTeachs();
        teachs.forEach((teach) => {
            console.log(teach);
        //   let messageSaleOrNew = '';
        //   let priceSale = '';
        //   let saleClass = '';
        //   if (product.sale === true) {
        //     messageSaleOrNew += `<div class="banner-message sale">sale</div>`;
        //     priceSale += `<div class="price-sale">${product.priceSale} ₽</div>`
        //     saleClass  = "saleClass";
        //   } else {
        //     messageSaleOrNew += ``;
        //     priceSale += ``;
        //     saleClass  = '';
        //   }
        //   if (product.new === true) {
        //     messageSaleOrNew += `<div class="banner-message new">new</div>`;
        //   }
          productListDomString += `
                        <div class="col-lg-4 mb-4 mb-lg-0 table-content wow fadeInDown animated animated" data-wow-delay="0.2s" style="visibility: visible; -webkit-animation-delay: 0.2s; -moz-animation-delay: 0.2s; animation-delay: 0.2s;">
                             <div class="table-item ${teach.category}">
                                <h3>${teach.title}</h3>
                                <ul>
                                    <li>Full Body Massage</li>
                                    <li>Deep Tissue Massage</li>
                                    <li>Hot Stone Massage</li>
                                    <li>Body Polish (1 hr)</li>
                                </ul>
                                <button class="btn-main btn-accent buy-teach order" data-toggle="modal" data-target="#modal-teaching" data-id="${teach.id}">Замовити</button>
                            </div>
                        </div>
                    `;
        });
        this.container.innerHTML = productListDomString;
      }
    
      addEventListeners() {
        // document
        //   .querySelectorAll('.product img')
        //   .forEach(button =>
        //     button.addEventListener('click', event =>
        //       this.handleProductInfoClick(event)
        //     )
        //   );
        // document
        //   .querySelectorAll(
        //     '#productInfoModal a.buy, .card.product button.buy'
        //   )
        //   .forEach(button =>
        //     button.addEventListener('click', event => {
        //       this.handleProductBuyClick(event);
        //     }
        //     )
        //   );
        document
          .querySelectorAll('.buy-teach')
          .forEach(button =>
            button.addEventListener('click', event =>
              this.handleProductBuyClick(event)
            )
          );
      }
      async handleProductInfoClick(event) {
        const button = event.target; // Button that triggered the modal
        const id = button.dataset.id; // Extract info from data-* attributes
        const teach = await this.productService.getTeachsById(id);
    
        // let productImageString = '';
    
        // product.image.forEach((img, index) => {
    
        //   productImageString += `
        //   <div class="detail-screen-carousel-item">
        //   <div class="item-preview">
        //       <img class="card-img-top gallery-image" src="img/products/${img}" alt="${product.title}">
        //   </div>
        //     </div>
        //   `
        // });
    
        // this.modalImages.innerHTML = productImageString;
        // this.modal.querySelector('.modal-body .card-title').innerText = product.title;
        // this.modal.querySelector('.modal-body .card-text').innerText = product.description;
        // const btnBuy = this.modal.querySelector('a.buy');
        // btnBuy.innerText = `Оформить заказ`
        // btnBuy.dataset.id = id;
      }
      handleProductBuyClick(event) {
        const button = event.target;
        const id = button.dataset.id;
        this.cart.addProduct(id);
        this.cart.renderCart();
      }
    
    //   handleTabProduct(event) {
    //     const button = event.target.id;
    //     switch (button) {
    //       case 'btnOne':
    //         document.querySelectorAll('.prod').forEach(el => {
    //           el.style.display = "none";
    //         });
    //         document.querySelectorAll('.medicafarm').forEach(el => {
    //           el.style.display = "block";
    //         });
    //         break;
    //       case 'btnTwo':
    //         document.querySelectorAll('.prod').forEach(el => {
    //           el.style.display = "none";
    //         });
    //         document.querySelectorAll('.effiderm').forEach(el => {
    //           el.style.display = "block";
    //         });
    //         break;
    //     }
    //   }
}

class TeachingCart {
        constructor() {
          this.cartContainer = document.querySelector('#modal-teaching');
          this.cart = {};
          this.addEventListeners();
          this.productService = new TeachService();
        }
        addEventListeners() {
          this.cartContainer
            .querySelector('.order')
            .addEventListener('click', ev => this.order(ev));
        }
        async renderCart() {
          let cartDomSting = ``;
          for (const id in this.cart) {
            const product = await this.productService.getTeachsById(id);
            cartDomSting += `
                      <div class="row" data-id="${id}">
                      <div class="col-5">
                      </div>
                      <div class="col-6">
                      <div class="mt-3">
                        <h5 id="titleProduct">${product.title}</h5>
                        <h4 class="text-center mt-3">Ціна: <span id="priceProductSumm">${product.price}</span> грн</h4>
                      </div>
                      </div>
                    </div>`;
            }
          this.cartContainer.querySelector(
            '.cart-product-list-container'
          ).innerHTML = cartDomSting;
        }
        addProduct(id) {
          this.cart = {};
          this.cart[id] = (this.cart[id] || 0);
        }
        cartLength() {
          return Object.keys(this.cart).length;
        }
        order(ev) {
          if (this.cartLength() === 0) {
            window.showAlert('Пожалуйста добавте товар для покупки', false);
            return;
          }
          const form = this.cartContainer.querySelector('.form-contacts');
          if (form.checkValidity()) {
            ev.preventDefault();
            fetch('order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  clientName: document.querySelector('#client-name').value,
                  clientEmail: document.querySelector('#client-phone').value,
                  titleProduct: document.querySelector('#titleProduct').innerHTML,
                  priceProduct: document.querySelector('#priceProductSumm').innerHTML,
                  cart: this.cart,
                })
              })
              .then(response => {
                if (response.status === 200) {
                  return response.text();
                } else {
                  throw new Error('Cannot send form');
                }
              })
              .then(responseText => {
                form.reset();
                this.cart = {};
                // this.saveCart();
                // this.updateBadge();
                //this.renderCart();
                window.showAlert('Thank you! ' + responseText);
                this.cartContainer.querySelector('.btn-close').click();
              })
              .catch(error => showAlert('Ошыбка: ' + error, false));
          } else {
            window.showAlert('Пожалуйста заполните правильно форму', false);
          }
        }
}



new Teaching(new TeachingCart());

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


