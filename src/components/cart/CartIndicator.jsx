import React from "react";
import { useStore } from "../../store";

const CartIndicator = () => {
  const cart = useStore((state) => state.items);

  const amount = cart.length;

  let isCartEmpty = amount === 0;

  if (isCartEmpty) {
    return null;
  }

  if (amount > 9) {
    return (
      <div className="absolute z-50 top-0 -right-2 bg-red-500 text-[10px] h-4 w-5 rounded-full text-white flex items-center justify-center">
        9+
      </div>
    );
  }

  return (
    <div className="absolute z-50 top-0 -right-1 bg-red-500 text-[10px] h-4 w-4 rounded-full text-white flex items-center justify-center">
      {amount}
    </div>
  );
};

export default CartIndicator;
