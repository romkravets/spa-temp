class SecviceList {
  constructor(cart) {
      this.cart = cart;
      this.containerSecvicesHolistic = document.querySelector('.secvices-holistic');
      this.conteinerServicesTerraude = document.querySelector('.secvices-terraude');
      this.containerServicePrograms = document.querySelector('.service-programs');
      this.productService = new Services();
      this.productService
        .getService()
        .then(() => this.renderServices())
        .then(() => this.addEventListeners());
    }
    async renderServices() {
      let productListDomString = '';
      let wowDeily = 0;
      const secvices = await this.productService.getService();
        secvices.forEach((service) => {
            productListDomString += `
            <div class="col-12 col-md-6 col-lg-4 mb-4 wow fadeInDown ${service.category}" data-wow-delay="${service.wowDeily}s">
              <div class="service-item">
                  <div class="booking-card" style="background-image: url(${service.image});">
                    <button class="btn buy-service" id="sreviceSend" data-toggle="modal" data-target="#modal-services" data-id="${service.id}">${service.title}</button>
                    </div>
                </div>
            </div>
            `
        });
      this.containerSecvicesHolistic.innerHTML = productListDomString;
      this.conteinerServicesTerraude.innerHTML = productListDomString;
      this.containerServicePrograms.innerHTML = productListDomString;
    }

    addEventListeners() {
      document
        .querySelectorAll('.buy-service')
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

class TeachingList {
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
                        <div class="col-lg-4 mb-5 mb-lg-0 table-content">
                             <div class="table-item ${teach.category}">
                                <h3>${teach.title}</h3>
                                <ul>
                                    <li>Full Body Massage</li>
                                    <li>Deep Tissue Massage</li>
                                    <li>Hot Stone Massage</li>
                                    <li>Body Polish (1 hr)</li>
                                </ul>
                                <button class="btn-main buy-teach order" data-toggle="modal" data-target="#modal-teaching" data-id="${teach.id}">Записатись</button>
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

class ProductList {
  constructor(cart) {
    this.cart = cart;
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
      productListDomString += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 prod ${product.category}">
                  <div class="card product">
                    <img class="card-img-top card-info-cursor" src="img/products/${product.image[0]}"
                        alt="${product.title}">
                      <div class="card-body d-flex flex-column align-items-start justify-content-between title-wrap">
                        <div class="d-flex w-100 align-items-baseline">
                        <div class="card-price flex-fill d-flex flex-wrap">
                          <h5>${product.price} грн</h5>
                        </div>
                          <button class="btn-main btn-accent btn-product buy" data-toggle="modal" data-target="#modal-products"  data-id="${product.id}" alt="Laboratoties INELDEA. Професійні засоби по догляду за тілом та обличчям MEDICAFARM, EFFIDERM, Франція" title="Замовити">Замовити</button>
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
      .querySelectorAll(
        '#productInfoModal a.buy, .card.product button.buy'
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