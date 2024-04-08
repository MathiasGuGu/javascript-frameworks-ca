import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import CartItem from "../components/cart/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const cart = useStore((state) => state.items);

  const isCartEmpty = cart.length === 0;

  useEffect(() => {
    setTotal(() => {
      return cart.reduce((acc, item) => {
        return acc + item.data.price * item.amount;
      }, 0);
    });
  }, [cart, total]);

  return (
    <div className="w-full h-screen flex items-center justify-center py-24  ">
      <div className="w-full h-full  max-w-5xl flex flex-col gap-12 ">
        <section className="flex-1 flex flex-col  px-3  gap-2 ">
          {isCartEmpty ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-2xl font-light">Your cart is empty</p>
              <p className="text-sm text-zinc-500">
                Add some items to get started.
              </p>
            </div>
          ) : (
            cart.map((item) => {
              return <CartItem key={item.data.id} item={item} />;
            })
          )}
        </section>
        {!isCartEmpty && (
          <>
            <section className="flex-1 flex flex-col bg-zinc-100 px-12 py-6 gap-4">
              <div>
                {cart.map((item) => {
                  return (
                    <div className="flex justify-between" key={item.data.id}>
                      <p>{item.data.title}</p>
                      <p>
                        {item.data.price} x {item.amount}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Total</p>
                <p>{total} kr</p>
              </div>
            </section>
            <section className=" flex-1 flex flex-col ">
              <div className="w-full h-full py-2 flex items-center gap-8 justify-end">
                <Link to={"/"} className="text-sm">
                  Back to shopping
                </Link>
                <Link
                  to={"/checkout"}
                  className="bg-black text-white px-12 py-3"
                >
                  Checkout
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
