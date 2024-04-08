import { Heart, MinusCircle, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { calculateDiscountPercent } from "../../lib/utils";
import { Link } from "react-router-dom";
import PriceCut from "../price/PriceCut";

const ItemCard = ({ item, selectedTags }) => {
  const { id, title, discountedPrice, price, tags, image } = item;

  const [show, setShow] = useState(true);

  const itemInCart = useStore((state) =>
    state.items.find((i) => i.data.id === id)
  );

  const addToCart = useStore((state) => state.addItem);
  const removeFromCart = useStore((state) => state.removeItem);

  const isDicounted = discountedPrice < price;

  const discountPercent = calculateDiscountPercent(price, discountedPrice);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setShow(true);
    } else {
      let match = selectedTags.some((tag) => tags.includes(tag));
      setShow(match);
    }
  }, [selectedTags, tags]);

  if (!show) return null;

  return (
    <div className="w-full h-80 md:h-72 bg-white flex flex-col gap-3 group z-0 justify-between">
      <div className="space-y-1">
        <div className="w-auto h-auto overflow-hidden">
          <img
            src={image.url}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-110 overflow-hidden transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="relative">
          <Link to={`item/${item.id}`}>
            <p className="  text-md text-zinc-500 w-24 md:w-48 truncate ">
              {title}
            </p>
            {isDicounted ? (
              <div className="flex gap-2 flex-wrap max-w-[70%] items-center">
                <PriceCut>{price}</PriceCut>
                <p className="text-red-600 text-md font-extralight ">
                  {discountedPrice} kr
                </p>
                <p className="px-2 py-1 rounded  bg-red-500 text-red-50 text-xs">
                  {discountPercent}% off
                </p>
              </div>
            ) : (
              <p className="text-md font-extralight ">{price} kr</p>
            )}
          </Link>

          <div className="absolute top-0 md:top-2 right-0  px-2 flex gap-4 items-center ">
            <button>
              <Heart size={24} strokeWidth={1.3} />
            </button>
            {itemInCart ? (
              <button
                onClick={() => removeFromCart(id)}
                className=" hover:scale-105 duration-300"
              >
                <MinusCircle size={24} strokeWidth={1.3} />
              </button>
            ) : (
              <button
                onClick={() => addToCart(item)}
                className=" hover:scale-105 duration-300"
              >
                <PlusCircle size={24} strokeWidth={1.3} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
