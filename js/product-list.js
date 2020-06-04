class ProductList {
  constructor(cart) {
    this.cart = cart;
    this.modal = document.querySelector('#productInfoModal');
    this.modalImages = document.querySelector('.works-slideshow');
    this.container = document.querySelector('.products-container-one');
    this.containerTwo = document.querySelector('.products-container-two');

    this.productService = new ProductsService();
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let productListDomString = '';
    const products = await this.productService.getProducts();
    products.forEach((product) => {
      let messageSaleOrNew = '';
      let priceSale = '';
      let saleClass = '';
      if (product.sale === true) {
        messageSaleOrNew += `<div class="banner-message sale">sale</div>`;
        priceSale += `<div class="price-sale">${product.priceSale} ₽</div>`
        saleClass  = "saleClass";
      } else {
        messageSaleOrNew += ``;
        priceSale += ``;
        saleClass  = '';
      }
      if (product.new === true) {
        messageSaleOrNew += `<div class="banner-message new">new</div>`;
      }

      productListDomString += `<div class="col-6 col-md-4 col-lg-3 mb-3 prod ${product.category}">
                  <div class="card product">
                    ${messageSaleOrNew}
                    <img class="card-img-top card-info-cursor" src="img/products/${product.image[0]}"
                        alt="${product.title}" data-toggle="modal"
                        data-target="#productInfoModal" data-id="${product.id}">
                      <div class="card-body d-flex flex-column align-items-start justify-content-between title-wrap">
                        <div class="d-flex w-100 align-items-baseline">
                        <div class="card-price flex-fill d-flex flex-wrap">
                          <h5 class="${saleClass}">${product.price} грн</h5> ${priceSale}
                        </div>
                          <button class="btn-main btn-accent buy" data-toggle="modal" data-target="#modal-cart"  data-id="${product.id}" alt="Laboratoties INELDEA. Професійні засоби по догляду за тілом та обличчям MEDICAFARM, EFFIDERM, Франція" title="Замовити">Замовити</button>
                        </div>
                        <div class="title-width">
                          <h4 class="card-title">${product.title}</h4>
                        </div>
                      </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = productListDomString;
    this.containerTwo.innerHTML = productListDomString;
  }

  addEventListeners() {
    document
      .querySelectorAll('.product img')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '#productInfoModal a.buy, .card.product img.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event => {
          this.handleProductBuyClick(event);
        }
        )
      );
    document
      .querySelectorAll('.btnTab')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleTabProduct(event)
        )
      );
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);

    let productImageString = '';

    product.image.forEach((img, index) => {

      productImageString += `
      <div class="detail-screen-carousel-item">
      <div class="item-preview">
          <img class="card-img-top gallery-image" src="img/products/${img}" alt="${product.title}">
      </div>
        </div>
      `
    });

    this.modalImages.innerHTML = productImageString;
    this.modal.querySelector('.modal-body .card-title').innerText = product.title;
    this.modal.querySelector('.modal-body .card-text').innerText = product.description;
    const btnBuy = this.modal.querySelector('a.buy');
    btnBuy.innerText = `Оформить заказ`
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    this.cart.renderCart();
  }

  handleTabProduct(event) {
    const button = event.target.id;
    switch (button) {
      case 'btnOne':
        document.querySelectorAll('.prod').forEach(el => {
          el.style.display = "none";
        });
        document.querySelectorAll('.medicafarm').forEach(el => {
          el.style.display = "block";
        });
        break;
      case 'btnTwo':
        document.querySelectorAll('.prod').forEach(el => {
          el.style.display = "none";
        });
        document.querySelectorAll('.effiderm').forEach(el => {
          el.style.display = "block";
        });
        break;
    }
  }
}