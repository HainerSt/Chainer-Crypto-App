import React, { useContext, useRef } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

function PerPage() {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = parseInt(inputRef.current.value);
    if (val > 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center font-nunito mr-12">
      <label htmlFor="perpage" className="flex justify-center items-center mr-2 font-bold">
        Per Page:{""}
      </label>
      <input
        ref={inputRef}
        className="w-16 rounded bg-gray-200 placeholder:text-gray-200 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
        placeholder="10"
        type="number"
        min={1}
        max={250}
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} className="w-full h-auto" alt="submit" />
      </button>
    </form>
  );
}

const Paginations = () => {
  const { page, setPage, totalPages, perPage, cryptoData } = useContext(CryptoContext);
  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page < TotalNumber) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    setPage((prevPage) => (prevPage + 3 >= TotalNumber ? TotalNumber : prevPage + 3));
  };

  const multiStepPrev = () => {
    setPage((prevPage) => (prevPage - 3 <= 1 ? 1 : prevPage - 3));
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
              <img className="w-full h-auto rotate-180" src={paginationArrow} alt="left arrow" />
            </button>
          </li>
          {page > 2 && (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          )}
          {page > 1 && (
            <li>
              <button
                onClick={() => setPage(page - 1)}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200"
              >
                {page - 1}
              </button>
            </li>
          )}
          <li>
            <button
              disabled
              className="outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>
          {page < TotalNumber && (
            <li>
              <button
                onClick={() => setPage(page + 1)}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          )}
          {page < TotalNumber - 1 && (
            <li>
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          )}
          {page !== TotalNumber && (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {TotalNumber}
              </button>
            </li>
          )}
          <li>
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <img className="w-full h-auto" src={paginationArrow} alt="right arrow" />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Paginations;
