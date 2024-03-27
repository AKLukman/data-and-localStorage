const getStoredCart = () => {
  const storedCartString = localStorage.getItem("cart");
  if (storedCartString) {
    return JSON.parse(storedCartString);
  }
  return [];
};

const savedCartToLocalStorage = (cart) => {
  const cartStringiFied = JSON.stringify(cart);
  localStorage.setItem("cart", cartStringiFied);
};

const addToLs = (id) => {
  const cart = getStoredCart();
  cart.push(id);
  //   save to locala storage
  savedCartToLocalStorage(cart);
};

const removeCartFromLS = (id) => {
  const cart = getStoredCart();

  // Removing every id
  const remaining = cart.filter((idx) => idx !== id);
  savedCartToLocalStorage(remaining);
};
export { addToLs, getStoredCart, removeCartFromLS };
