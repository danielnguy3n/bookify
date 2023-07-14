"use client";

import { Book } from "@/typings";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass, HiOutlineClock } from "react-icons/hi2";
import SearchResult from "./SearchResult";
import { IoMdClose } from "react-icons/io";

async function fetchResults(search: string | undefined) {
  if (!search) return;
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
  );
  return res.json();
}

function Searchbar() {
  const [results, setResults] = useState<Book[]>();
  const [search, setSearch] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  async function getResults() {
    const data = await fetchResults(search);
    setTimeout(() => {
      setResults(data);
    }, 300);
  }

  useEffect(() => {
    getResults();
  }, [search]);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div></div>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                type="text"
                value={search}
                placeholder="Search for books"
                className="search__input"
                onChange={(e) => handleInput(e)}
                ref={inputRef}
              />
              <div className="search__icon">
                {search ? (
                  <IoMdClose
                    onClick={() => setSearch("")}
                    className="search__icon--pointer"
                  />
                ) : (
                  <HiMagnifyingGlass />
                )}
              </div>
              <div className="search__results--wrapper">
                {results?.map((result) => (
                  <SearchResult key={result.id} result={result} />
                ))}
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn"></div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
