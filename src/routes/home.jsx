import React, { useEffect, useState } from "react";
import ItemCard from "../components/item/ItemCard";
import { Filter, Loader2 } from "lucide-react";
import { useApiStore } from "../store";
import Hero from "../components/Hero/Hero";

const Home = () => {
  const data = useApiStore((state) => state.products);
  const [tags, setTags] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState([]);
  const [filter, setFilter] = useState(false);

  if (data.length === 0 && !useApiStore.getState().error) {
    console.log("fetching");
    useApiStore.getState().fetchProducts();
  }

  const isLoading = useApiStore((state) => state.isLoading);
  const error = useApiStore((state) => state.error);

  useEffect(() => {
    if (data.data) {
      data.data.forEach((item) => {
        item.tags.forEach((tag) => {
          setTags((prev) => new Set([...prev, tag]));
        });
      });
    }
  }, [data.data]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Loader2 size={50} className=" animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen  h-screen flex flex-col items-center justify-center">
        <p className="text-xl">Something went wrong</p>
        <p className=" text-zinc-500">please try again</p>
      </div>
    );
  }

  return (
    <section className="w-screen h-auto grid place-items-center  ">
      <Hero />
      <div className="w-screen h-auto  max-w-7xl lg:px-24 md:px-8 px-2 mt-24 flex gap-5 items-center">
        <button className="w-10 h-10 flex items-center justify-center border border-zinc-500 rounded">
          <Filter size={20} strokeWidth={1.5} />
        </button>
        <div className="flex gap-2 overflow-scroll w-[90%] items-center ">
          {Array.from(tags).map((tag) => {
            return (
              <button
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags((prev) => prev.filter((t) => t !== tag));
                  } else {
                    setSelectedTags((prev) => [...prev, tag]);
                  }
                }}
                className={` px-6 h-10  py-1 flex items-center text-sm rounded border border-zinc-200 ${
                  selectedTags.includes(tag)
                    ? "bg-blue-100 text-blue-500"
                    : "bg-white text-zinc-500"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-screen min-h-screen lg:px-24 md:px-8 px-2  py-12 h-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 lg:gap-6 md:gap-4 gap-2 max-w-7xl">
        {data.data.map((item) => {
          return (
            <ItemCard
              key={item.id}
              item={item}
              selectedTags={selectedTags}
              filter={filter}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
