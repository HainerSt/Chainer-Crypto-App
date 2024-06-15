import React from "react";
import paginationArrow from "../assets/pagination-arrow.svg";

const Paginations = () => {
  return (
    <div className="flex items-center">
      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button className="outline-0 hover:text-cyan w-8">
            <img className="w-full h-auto rotate-180" src={paginationArrow} alt="left arrow" />
          </button>
        </li>
        <li>
          <button>...</button>
        </li>
        <li>
          <button>1</button>
        </li>
        <li>
          <button>2</button>
        </li>
        <li>
          <button>3</button>>
        </li>
        <li>
          <button>...</button>
        </li>
        <li>
          <button>last-page</button>
        </li>
        <li>
          <button>
            {" "}
            <img className="w-full h-auto" src={paginationArrow} alt="left arrow" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginations;
