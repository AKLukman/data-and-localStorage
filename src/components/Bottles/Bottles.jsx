import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
  addToLs,
  getStoredCart,
  removeCartFromLS,
} from "../../utils/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("../../../public/bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  //   load local storage data
  useEffect(() => {
    if (bottles.length) {
      const storedCart = getStoredCart();
      const svaedCart = [];
      for (const id of storedCart) {
        const bottle = bottles.find((bottle) => bottle.id === id);
        svaedCart.push(bottle);
      }
      setCart(svaedCart);
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLs(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    // Remove from cart
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);

    // Remove  from local storage
    removeCartFromLS(id);
  };
  return (
    <div>
      <h1>Memorable bottles</h1>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
