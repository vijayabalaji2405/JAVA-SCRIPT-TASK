console.log('export');
const x = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product}:${quantity} added`);
};
console.log(cart);

export default 20;
