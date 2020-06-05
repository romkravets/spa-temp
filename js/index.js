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
                                <button class="btn-main btn-accent buy-teach order" data-toggle="modal" data-target="#modal-teaching" data-id="${teach.id}">Записатись</button>
                            </div>
                        </div>
                    `;
        });
        this.container.innerHTML = productListDomString;
      }

      addEventListeners() {
        document
          .querySelectorAll('.buy-teach')
          .forEach(button =>
            button.addEventListener('click', event =>
              this.handleProductBuyClick(event)
            )
          );
      }
      handleProductBuyClick(event) {
        const button = event.target;
        const id = button.dataset.id;
        this.cart.addProduct(id);
        this.cart.renderCart();
      }
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
            const plan = await this.productService.getTeachsById(id);
            cartDomSting += `
                      <div class="row" data-id="${id}">
                        <div class="col-5">
                          <img class="img-fluid" src="${plan.image}" alt="${plan.title}">
                        </div>
                      <div class="col-6 text-center">
                          <div class="mt-3">
                              <h3 id="titlePlan">${plan.title}</h3>
                              <h4 class="text-center mt-3">Вартість: <span id="price">${plan.price}</span> грн</h4>
                          </div>
                        </div>
                      <div class="col-12 mt-3">
                        <p>${plan.description}</p>
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
            window.showAlert('Будь ласка додайте товар', false);
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
                  clientРhone: document.querySelector('#client-phone').value,
                  plan: document.querySelector('#titlePlan').innerHTML,
                  price: document.querySelector('#price').innerHTML,
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
                window.showAlert('Дякую! ' + responseText);
                this.cartContainer.querySelector('.btn-close').click();
              })
              .catch(error => showAlert('Ошыбка: ' + error, false));
          } else {
            window.showAlert('Буль ласка зоповніть коректно форму', false);
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


