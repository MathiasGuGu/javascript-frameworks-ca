import { Heart, Link, MinusSquare, PlusSquare, Trash2 } from "lucide-react";
import React from "react";
import { useStore } from "../../store";
import { NavLink } from "react-router-dom";
import { calculateDiscountPercent } from "../../lib/utils";

const CartItem = ({ item }) => {
  const { title, price, discountedPrice, id } = item.data;
  const amount = item.amount;

  const increaseAmount = useStore((state) => state.increaseAmount);
  const decreaseAmount = useStore((state) => state.decreaseAmount);
  const removeItem = useStore((state) => state.removeItem);

  const discountPercent = calculateDiscountPercent(price, discountedPrice);

  return (
    <div className=" w-full h-auto flex items-center justify-between border-b py-2">
      <div className="flex gap-2 md:gap-4 h-full w-auto py-2">
        <img
          src={item.data.image.url}
          className="object-cover h-28 aspect-square"
        ></img>
        <div className="flex flex-col py-2">
          <NavLink
            to={`/item/${item.data.id}`}
            className="text-xl font-light hover:text-blue-500"
          >
            {title}
          </NavLink>
          <div className="flex gap-2 items-center flex-wrap">
            <p className="text-sm md:text-md font-light">{price} kr</p>
            {discountedPrice < price && (
              <>
                <p className="text-red-600 text-md  font-base">
                  {discountedPrice} kr
                </p>
                <p className=" px-2 bg-red-500 text-red-50 rounded text-sm ">
                  {discountPercent}%
                </p>
              </>
            )}
          </div>
          <div className="flex gap-4 items-center mt-6">
            <button onClick={() => decreaseAmount(id)}>
              <MinusSquare size={20} strokeWidth={1.5} />
            </button>
            <p>{amount}</p>
            <button onClick={() => increaseAmount(id)}>
              <PlusSquare size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-3">
        <div className="flex flex-col items-center justify-center gap-4">
          <button>
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button className=" w-auto h-auto p-2 rounded-full hover:bg-zinc-100">
            <Trash2
              size={20}
              strokeWidth={1.5}
              onClick={() => removeItem(id)}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
