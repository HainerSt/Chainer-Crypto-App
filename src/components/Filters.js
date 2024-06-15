import React, { useContext, useRef } from "react";
import Search from "./Search";
import SubIcon from "../assets/submit-icon.svg";
import selectIcon from "../assets/select-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const Filters = () => {
  let { setCurrency, setSortBy } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  const handleSortBy = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val)
  };

  return (
    <div className="w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative">
      <Search />
      <div className="flex mr-7">
        <form onSubmit={handleCurrencySubmit} className="relative flex items-center font-nunito mr-12">
          <label htmlFor="currency" name="currency" className="flex justify-center items-center mr-2 font-bold">
            Currency:
          </label>
          <input
            ref={currencyRef}
            className="w-16 rounded bg-gray-200 placeholder:text-gray-200 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
            placeholder="usd"
            type="text"
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img src={SubIcon} className="w-full h-auto" />
          </button>
        </form>
        <label className="relative flex justify-center items-center">
          <span className="font-bold mr-2">Sort by:</span>
          <select
            name="sortby" onClick={handleSortBy}
            className="rounded bg-gray-200 text-base pl-2 pr-10 py-1.5 leading-4 capitalize
        focus:outline-0"
          >
            <option value="market_cap_desc">Market Cap Desc</option>
            <option value="market_cap_asc">Market Cap Asc</option>
            <option value="volume_desc">Volume Desc</option>
            <option value="volume_asc">Volume Asc</option>
            <option value="id_desc">id Desc</option>
            <option value="id_asc">id Asc</option>
            <option value="gecko_desc">Gecko Desc</option>
            <option value="gecko_asc">Gecko Asc</option>
          </select>
          <img src={selectIcon} className="w-[1rem] h-auto absolute right-1 top-2 pointer" />
        </label>
      </div>
    </div>
  );
};

export default Filters;
