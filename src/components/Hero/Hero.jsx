import { useRef } from "react";
import { useApiStore } from "../../store";

const Hero = () => {
  const items = useApiStore((state) => state.products);
  const scrollRef = useRef(null);
  let data = items.data;

  let images = data.map((item) => item.image.url);

  return (
    <div className="flex relative">
      <div
        ref={scrollRef}
        className="flex overflow-scroll "
        style={{ scrollBehavior: "smooth" }}
      >
        {images.concat(images).map((image, index) => {
          return (
            <img
              alt="hero image"
              className="w-1/3 h-[500px] md:h-auto object-cover"
              key={index}
              src={image}
            ></img>
          );
        })}
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Spring Sale!</h1>
          <p className="text-lg text-white">
            Get up to 25% off on selected products
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
