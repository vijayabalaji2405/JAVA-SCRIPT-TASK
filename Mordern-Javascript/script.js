// console.log('import');
// import { addToCart } from './shoppingCart.js';
// import * as Shopping from './shoppingCart.js';
// import defaults from './shoppingCart.js';
// addToCart('bread', 5);

// import shoppingCart from './shoppingCart.js';

// console.log(Shopping);
// console.log(Shopping.cart);

// const datas = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data1 = await datas.json();
// console.log(data1);

// console.log('hellllo');

// const getLost = async function () {
//   const datas = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data1 = await datas.json();
//   console.log(data1);

//   return { title: data1.at(-1).title, body: data1.at(-1).body };
// };
// const get = await getLost();
// console.log(get);

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

console.log(ShoppingCart2);
ShoppingCart2.addToCart('apple', 2);
console.log(ShoppingCart2.shippingCost);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const state1 = Object.assign({}, state);

state1.user.loggedIn = false;

const clones = cloneDeep(state);
console.log(clones);

console.log(clones);
console.log(state);
console.log(state1);

if (module.hot) {
  module.hot.accept();
}
