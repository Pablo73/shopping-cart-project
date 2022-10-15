// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const printLoading = (element) => {
  const getMeuCarrinho = document.querySelector('.cart__title');
  const h3 = document.createElement('h3');
  h3.className = 'loading';
  h3.innerHTML = element;
  getMeuCarrinho.appendChild(h3); 
};

const deletLoading = () => {
  const getLoading = document.querySelector('.loading');
getLoading.remove('h3');
};
  
 let total = 0;
const totalPrice = (sum, subtraction) => {
  const getSub = document.querySelector('.total-price');
  if (sum === 0) {
    total -= subtraction.price;
  }
  if (subtraction === 0) {
    total += sum.price; 
  }
  getSub.innerHTML = `Subtotal: ${Math.round(total * 100) / 100}`;
};

 const cartItemClickListener = (event) => {
  const captureItems = document.querySelector('.items');
  event.target.remove(captureItems);
if (localStorage.cartItems !== undefined) {
  const pop = JSON.parse(getSavedCartItems());
  localStorage.clear();
    pop.forEach((element, index) => {
      if (event.target.innerHTML.slice(4, 17) === element.id) {
      pop.splice(index, 1);
      totalPrice(0, element);
      }
    }); 
    localStorage.setItem('cartItems', JSON.stringify(pop));
  }
  pop.length = 0;
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

pop = [];
const saveCartItemsLocal = (element) => {
  pop.push(element);
  localStorage.setItem('cartItems', JSON.stringify(pop));
};

const productList = async () => {
  printLoading('carregando...');
  const captureItems = document.querySelector('.items');
  const value = await fetchProducts('computador');
  deletLoading();
  const { results } = value;
  results.forEach((element) => captureItems.appendChild(createProductItemElement(element)));
};

const linter = '.cart__items';

const productToCart = async (product) => {
  printLoading('carregando...');
  const value = await fetchItem(product);
  deletLoading();
  const captureCartItems = document.querySelector(linter);
  captureCartItems.appendChild(createCartItemElement(value));
  saveCartItemsLocal(value);
  totalPrice(value, 0);
};

const selectItem = () => { 
  const cart = document.querySelector('.items'); 
  cart.addEventListener('click', (event) => {
    productToCart(event.target.parentNode.firstChild.innerHTML);
    });
  };

const buttonEmptyCart = document.querySelector('.empty-cart'); 
const list = document.querySelector(linter);

buttonEmptyCart.addEventListener('click', () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.clear();
});

const datolocalStorage = () => {
  if (localStorage.cartItems !== undefined) {
    const pop = JSON.parse(getSavedCartItems());
    pop.forEach((element) => {
      const captureCartItems = document.querySelector(linter);
      captureCartItems.appendChild(createCartItemElement(element));
    });
  }
};

window.onload = () => {
  datolocalStorage();
  productList();
  selectItem();
 };
