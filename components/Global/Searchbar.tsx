"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/redux/store";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { IoMdClose as CloseIcon } from "react-icons/io";

import SearchResult from "./SearchResult";
import Skeleton from "../UI/Skeleton";
import useDebounce from "../../hooks/useDebounce";

import { openSidebar } from "@/redux/sidebarSlice";

import { Book } from "@/typings";

const SearchSkeleton = () => {
  return (
    <div className="search__results--wrapper">
      <Skeleton width={`100%`} height={114} marginBottom={8} />
      <Skeleton width={`100%`} height={114} marginBottom={8} />
      <Skeleton width={`100%`} height={114} marginBottom={8} />
      <Skeleton width={`100%`} height={114} marginBottom={8} />
      <Skeleton width={`100%`} height={114} />
    </div>
  );
};

async function fetchResults(search: string | undefined) {
  if (!search) return;
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
  );
  return res.json();
}

function Searchbar() {
  const dispatch = useAppDispatch();
  const [results, setResults] = useState<Book[] | null>();
  const [input, setInput] = useState<string>("");

  const debouncedInput = useDebounce(input, 300);

  const [loading, setLoading] = useState<Boolean | null>(null);

  async function getResults(input: string | undefined) {
    const data = await fetchResults(input);
    if (data && data.length === 0) {
      setResults(null);
    } else {
      setResults(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getResults(debouncedInput);
  }, [debouncedInput]);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    setInput(e.target.value);
  }

  const isInputEmpty = !input;

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
                  <CloseIcon
                    onClick={() => setInput("")}
                    className="search__icon--pointer"
                  />
                ) : (
                  <HiMagnifyingGlass />
                )}
              </div>
              {!isInputEmpty && loading && <SearchSkeleton />}
              {!isInputEmpty && !results && !loading && (
                <div className="search__results--wrapper"> No Books Found </div>
              )}
              {!isInputEmpty && results && (
                <div className="search__results--wrapper">
                  {results.map((result) => (
                    <SearchResult
                      key={result.id}
                      result={result}
                      setInput={setInput}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            className="sidebar__toggle--btn"
            onClick={() => dispatch(openSidebar())}
          >
            <FiMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
