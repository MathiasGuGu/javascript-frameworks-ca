import { MoveRight, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useApiStore } from "../../store";
import { Link } from "react-router-dom";

const Searchbox = ({ search, setIsActive }) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  const [searchResults, setSearchResults] = useState([]);

  const items = useApiStore((state) => state.products);

  const data = items.data;

  useEffect(() => {
    if (search !== "") {
      let searchResults = data.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });

      setSearchResults(searchResults);
    }
  }, [search, data]);

  return (
    <div className="z-50 fixed top-14 left-0 md:left-1/2 md:-translate-x-1/2 bg-white rounded-lg shadow-md px-5  py-8 flex flex-col gap-3  w-screen max-w-2xl h-auto min-h-[200px] max-h-[500px] overflow-scroll">
      {searchResults.length !== 0 ? (
        searchResults.map((item) => {
          return (
            <Link
              onClick={() => setIsActive(false)}
              to={`/item/${item.id}`}
              key={item.id}
              className="flex items-center gap-4  even:bg-zinc-50 group"
            >
              <img
                className="w-16 h-16 object-cover"
                src={item.image.url}
                alt={item.title}
              />
              <a className="text-base font-light">{item.title}</a>
              <div className="hidden group-hover:flex">
                <MoveRight size={24} strokeWidth={1.3} />
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

const Searchbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");

  // show data if the search input is not empty

  // if the user clicks outside the searchbar, it will close
  window.addEventListener("scroll", () => {
    setIsActive(false);
    setSearch("");
  });

  // when user redirects to another page using react router dom, the searchbar will close
  window.addEventListener("popstate", () => {
    setIsActive(false);
    setSearch("");
  });

  return (
    <>
      <div
        className={`${
          isActive
            ? "bg-white border border-zinc-100 w-64 md:w-72 rounded-xl h-10 flex items-center relative  transition-all duration-300 pl-2"
            : " w-auto h-auto"
        }`}
      >
        <button
          className={`${isActive ? "absolute right-2 h-10" : " h-10"}`}
          onClick={() => {
            setIsActive(true);
          }}
        >
          <SearchIcon size={24} strokeWidth={1.5} />
        </button>
        {isActive && (
          <input
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            type="text"
            className="bg-transparent  duration-300 w-full h-full outline-none z-50"
            placeholder="Search"
          />
        )}
      </div>
      {isActive && (
        <div
          onClick={() => setIsActive(false)}
          className="absolute top-0 left-0 w-screen h-screen z-30"
        ></div>
      )}
      {search !== "" && isActive && (
        <>
          <Searchbox setIsActive={setIsActive} search={search} />
        </>
      )}
    </>
  );
};

export default Searchbar;
