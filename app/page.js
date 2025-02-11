"use client";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { cardClick } from "./actions/cardClick";
import Imagewithfallback from "@/components/Imagewithfallback";

export default function Home() {
  const [search, setSearch] = useState("");
  const [moviesList, setMoviesList] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const pages = useRef(null);
  const currentRef = useRef(null);
  const previousRef = useRef(null);
  const nextRef = useRef(null);

  const handleSearch = async (e, pageno = 1) => {
    setMoviesList([]);
    const api_url = `/api/movies/s?query=${search.trim()}&page=${pageno}`;
    const data = await fetch(api_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });

    if (!data.success) {
    } else {
      setMoviesList(data.data);
      setCurrentPage(pageno);
      const totalPages = Math.floor(data.totalResults / 30);
      if (e.target.tagName == "BUTTON" || pageno <= 3 || pageno == totalPages) {
        pages.current = [];
        if (totalPages <= 5) {
          for (let i = 1; i <= totalPages; i++) {
            pages.current = [...pages.current, i];
          }
        } else {
          pages.current = [1, 2, 3, "...", totalPages];
        }
      }
    }
  };

  useEffect(() => {
    if (currentRef.current != null) {
      if (currentPage == 1) {
        previousRef.current.classList.add("pointer-events-none");
        nextRef.current.classList.remove("pointer-events-none");
      } else if (currentPage == pages.current[pages.current.length - 1]) {
        nextRef.current.classList.add("pointer-events-none");
        previousRef.current.classList.remove("pointer-events-none");
      } else {
        nextRef.current.classList.remove("pointer-events-none");
        previousRef.current.classList.remove("pointer-events-none");
      }
      currentRef.current.className += " bg-violet-600";
    }
  }, [moviesList]);

  const handleNext = (e) => {
    const nextpage = Number(currentPage) + 1;
    handleSearch(e, nextpage);
    // If pagination needs to be upgraded
    if (pages.current.includes("...")) {
      if (nextpage > 3 && nextpage < pages.current[pages.current.length - 1]) {
        pages.current[1] = "...";
        pages.current[2] = nextpage;
      }
    }
  };
  const handlePrevious = (e) => {
    const nextpage = Number(currentPage) - 1;
    handleSearch(e, nextpage);
    // If pagination needs to be upgraded
    if (pages.current.includes("...")) {
      if (nextpage > 3 && nextpage < pages.current[pages.current.length - 1]) {
        pages.current[1] = "...";
        pages.current[2] = nextpage;
      }
    }
  };
  return (
    <div className="">
      <div className="    max-w-screen-2xl mx-auto ">
        <div className="searchArea flex flex-col items-center gap-3 p-10">
          <Image width={400} height={400} src="/logo.png" alt="Logo"/>
          <div className="w-4/6" >
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full p-2 ps-10 text-lg  text-gray-900 border border-gray-300 rounded-lg bg-gray-300 focus:ring-violet-600 focus:border-violet-600   outline-none"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              required
            />
            <button
              className="text-white absolute end-2.5 bottom-1 bg-violet-600 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2 "
            onClick={handleSearch}
            >
              Search
            </button>
          </div>
          </div>
        </div>
        {pages.current != null && pages.current.length != 0 && (
          <div className="pagination mt-10 w-fit mx-auto">
            <ul className="flex justify-between items-center gap-2">
              <li
                className="cursor-pointer rounded-md border-2 border-[#3b3b3b] flex justify-center items-center w-10 h-10 "
                onClick={(e) => {
                  handlePrevious(e);
                }}
                ref={previousRef}
              >
                &lt;
              </li>
              {pages.current.map((item) => {
                return (
                  <li
                    className="cursor-pointer rounded-full flex justify-center items-center w-10 h-10 "
                    key={uuidv4()}
                    ref={item == currentPage ? currentRef : null}
                    onClick={item!="..."?(e) => {
                      handleSearch(
                        e,
                        e.currentTarget.getAttribute("data-page"),
                      );
                    }:null}
                    data-page={item}
                  >
                    {item}
                  </li>
                );
              })}
              <li
                className="cursor-pointer rounded-md border-2 border-[#3b3b3b] flex justify-center items-center w-10 h-10 "
                onClick={(e) => {
                  handleNext(e);
                }}
                ref={nextRef}
              >
                &gt;
              </li>
            </ul>
          </div>
        )}
        <div className="mainContainer w-full mb-16 flex gap-3 flex-wrap p-8 justify-center ">
          {moviesList != null && moviesList.length == 0 && (
            <div className="loadercontainer">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          )}
          {moviesList != null &&
            moviesList.length != 0 &&
            moviesList.map((item) => {
              return (
                <div
                  className="card w-[200px] flex flex-col gap-1 border border-[#3b3b3b] rounded-md p-2 hover:relative hover:scale-110 hover:cursor-pointer hover:z-10 hover:backdrop-blur-md transition-transform"
                  key={item.imdbID}
                  data-imdbid={item.imdbID}
                  onClick={(e) => {
                    e.stopPropagation();
                    cardClick(e.currentTarget.getAttribute("data-imdbid"));
                  }}
                >
                  <div className="imageWrapper w-full h-72 relative">
                    <Imagewithfallback
                      src={item.Poster}
                      fallbacksrc="/notAvailable.png"
                    />
                  </div>
                  <h1 className=" px-1 font-bold overflow-clip text-nowrap text-ellipsis">
                    {item.Title}
                  </h1>
                  <div className="flex px-1 justify-between items-center">
                    <div>
                      <span>{item.Year}</span>
                    </div>
                    <span className="mr-1 border border-gray-500 px-2 rounded-md text-sm capitalize">
                      {item.Type}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
