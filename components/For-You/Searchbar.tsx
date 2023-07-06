import { HiMagnifyingGlass } from "react-icons/hi2";

function Searchbar() {
  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div></div>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                type="text"
                placeholder="Search for books"
                className="search__input"
              />
              <div className="search__icon">
                <HiMagnifyingGlass />
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
