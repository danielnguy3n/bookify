"use client";

import { Book } from "@/typings";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import SearchResult from "./SearchResult";
import { IoMdClose } from "react-icons/io";
import Skeleton from "../UI/Skeleton";
import useDebounce from "./useDebounce";
import { closeSidebar, openSidebar } from "@/redux/sidebarSlice";
import { useAppDispatch } from "@/redux/store";

async function fetchResults(search: string | undefined) {
  if (!search) return;
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
  );
  return res.json();
}

function Searchbar() {
  const dispatch = useAppDispatch()
  const [results, setResults] = useState<Book[] | null>();
  const [input, setInput] = useState<string>('');

  const debouncedInput = useDebounce(input, 300);

  const [searchLoading, setSearchLoading] = useState<Boolean | null>(null);

  async function getResults(input: string | undefined) {
    const data = await fetchResults(input);
    if (data && data.length === 0) {
      setResults(null);
    } else {
      setResults(data);
    }
    setSearchLoading(false);
  }

  useEffect(() => {
    getResults(debouncedInput);
  }, [debouncedInput]);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchLoading(true);
    setInput(e.target.value);
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
                value={input}
                placeholder="Search for books"
                className="search__input"
                onChange={(e) => handleInput(e)}
              />
              <div className="search__icon">
                {input ? (
                  <IoMdClose
                    onClick={() => setInput("")}
                    className="search__icon--pointer"
                  />
                ) : (
                  <HiMagnifyingGlass />
                )}
              </div>
              {input &&
                (searchLoading ? (
                  <>
                    <div className="search__results--wrapper">
                      <Skeleton width={`100%`} height={114} marginBottom={8} />
                      <Skeleton width={`100%`} height={114} marginBottom={8} />
                      <Skeleton width={`100%`} height={114} marginBottom={8} />
                      <Skeleton width={`100%`} height={114} marginBottom={8} />
                      <Skeleton width={`100%`} height={114} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="search__results--wrapper">
                      {results
                        ? results?.map((result) => (
                            <SearchResult key={result.id} result={result} setInput={setInput} />
                          ))
                        : "No Books Found"}
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={() => dispatch(openSidebar())}>
            <FiMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
