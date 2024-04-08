import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import CartIndicator from "./CartIndicator";

const CartButton = () => {
  return (
    <Link
      to="/cart"
      className="relative hover:bg-zinc-100 px-1 py-1 rounded-lg"
    >
      <ShoppingCart size={24} strokeWidth={1.5} />
      <CartIndicator />
    </Link>
  );
};

export default CartButton;
