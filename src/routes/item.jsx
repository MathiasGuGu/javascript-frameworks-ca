import React, { useState } from "react";
import { useApiStore, useStore } from "../store";
import { useParams } from "react-router-dom";
import { calculateDiscountPercent } from "../lib/utils";
import PriceCut from "../components/price/PriceCut";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import Rating from "../components/item/Rating";
import ReviewCard from "../components/item/ReviewCard";

const Item = () => {
  const { id } = useParams();

  const [cartLoading, setCartLoading] = useState(false);

  const simulateLoading = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
    }, 300);
  };

  const data = useApiStore((state) => state.products);

  const cart = useStore((state) => state.items);
  const addToCart = useStore((state) => state.addItem);
  const increaseAmount = useStore((state) => state.increaseAmount);

  if (data.length === 0 && !useApiStore.getState().error) {
    useApiStore.getState().fetchProducts();
  }

  const isLoading = useApiStore((state) => state.isLoading);
  const error = useApiStore((state) => state.error);

  let item;

  if (data.data && data.data.length > 0) {
    item = data.data.filter((item) => item.id === id);
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <p className="text-xl">Something went wrong</p>
        <p className=" text-zinc-500">please try again</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <p className="text-xl">
          <Loader2 className="animate-spin" />
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <p className="text-xl">Item not found</p>
      </div>
    );
  }

  let isInCart = cart.filter((i) => i.data.id === id).length > 0;

  let discountPercent;

  const isDiscounted = item[0].discountedPrice < item[0].price;

  if (isDiscounted) {
    discountPercent = calculateDiscountPercent(
      item[0].price,
      item[0].discountedPrice
    );
  }

  return (
    <div className="w-full h-auto grid place-items-center pt-24 px-5 md:px-10">
      {item && item.length > 0 ? (
        <>
          <section className="w-full max-w-6xl h-auto flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 h-auto">
              <div className="w-full h-auto">
                <img
                  src={item[0].image.url}
                  alt="Product"
                  className=" object-cover w-full h-[500px] md:h-[700px]"
                ></img>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className=" text-3xl font-light pt-3">{item[0].title}</h1>
              <Rating
                rating={item[0].rating}
                reviews={item[0].reviews.length}
              />
              <p className=" text-zinc-500">{item[0].description}</p>
              <div>
                {isDiscounted ? (
                  <div className="flex gap-2 items-center">
                    <PriceCut>{item[0].price}</PriceCut>
                    <p className="text-md font-bold text-lg text-red-500">
                      {item[0].discountedPrice} kr
                    </p>
                    <p className=" bg-red-500 text-red-50 flex items-center justify-center rounded px-2">
                      {discountPercent} % off
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-md font-light">{item[0].price} kr</p>
                  </div>
                )}
              </div>
              <div className=" flex gap-4 items-center  mt-6">
                {isInCart ? (
                  <button
                    onClick={() => {
                      simulateLoading();
                      increaseAmount(id);
                    }}
                    className=" bg-black text-white w-48 h-12 flex gap-2 items-center justify-center"
                  >
                    {cartLoading ? (
                      <Loader2 className=" animate-spin" />
                    ) : (
                      <div className="flex gap-2 w-full h-full items-center border justify-center">
                        Add to cart <ShoppingBag size={20} strokeWidth={1.5} />
                      </div>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      simulateLoading();
                      addToCart(item[0]);
                    }}
                    className="w-48 h-12 bg-black text-white  flex gap-2 items-center justify-center"
                  >
                    {cartLoading ? (
                      <Loader2 className=" animate-spin" />
                    ) : (
                      <div className="flex gap-2 items-center w-full justify-center ">
                        Add to cart <ShoppingBag size={20} strokeWidth={1.5} />
                      </div>
                    )}
                  </button>
                )}
                <button className="w-fit h-auto flex items-center ">
                  <Heart size={25} strokeWidth={1.3} />
                </button>
              </div>
            </div>
          </section>
          <section className="w-full max-w-6xl  py-24">
            {item[0].reviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-light">Reviews</h2>
                {item[0].reviews.map((review) => {
                  return <ReviewCard key={review.id} review={review} />;
                })}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-xl font-light">No reviews yet</p>
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <p className="text-xl">Item not found</p>
        </div>
      )}
    </div>
  );
};

export default Item;
