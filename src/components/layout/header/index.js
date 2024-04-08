import { Link, NavLink } from "react-router-dom";
import CartButton from "../../cart/CartButton";
import { headerData } from "../../../data/Navigation/HeaderData";
import { useState } from "react";
import { Heart, Menu, SearchIcon } from "lucide-react";
import Searchbar from "../../header/Searchbar";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);
  // get scroll from top of page
  const [scroll, setScroll] = useState(0);

  window.addEventListener("scroll", () => {
    setScroll(window.scrollY);
  });

  window.addEventListener("resize", (e) => {
    if (window.innerWidth < 450) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  if (isMobile) {
    return (
      <nav
        className={`w-full h-16 flex items-center justify-between px-6 fixed transition-all duration-300 top-0 z-50 ${
          scroll > 75 && "bg-white"
        }`}
      >
        <div className="w-full h-16 flex items-center justify-between  relative top-0  z-50">
          <div className="flex gap-4 items-center w-1/3">
            <Menu />
          </div>

          <NavLink
            to="/"
            className="flex  items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className=" font-mono text-lg font-light underline">ecom</div>
          </NavLink>
          <div className="flex gap-4 items-center ">
            <Searchbar />
            <Heart size={24} strokeWidth={1.5} />
            <CartButton />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`w-full h-14 flex items-center justify-between px-12 fixed top-0 transition-all duration-300  z-50 ${
        scroll > 75 && "bg-white"
      }`}
    >
      <div className="flex gap-4 items-center ">
        <Link to="/" className="flex  items-center gap-2">
          <div className=" font-mono text-lg font-light underline">ecom</div>
        </Link>
      </div>
      <div className=" flex gap-6 items-center text-sm">
        {headerData.map((item, index) => (
          <Link
            className="hover:bg-zinc-100  px-2 grid place-items-center py-1 rounded-lg"
            key={index}
            to={item.path}
          >
            {item.title}
          </Link>
        ))}
        <Searchbar />

        <Heart size={24} strokeWidth={1.5} />
        <CartButton />
      </div>
    </nav>
  );
};

export default Header;
