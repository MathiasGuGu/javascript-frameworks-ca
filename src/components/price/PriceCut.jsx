import React from "react";

const PriceCut = ({ children }) => {
  return (
    <p className=" after:w-full after:h-[1px] font-light after:absolute relative after:bg-black text-md after:left-0 after:top-1/2">
      {children}
    </p>
  );
};

export default PriceCut;
