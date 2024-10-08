import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav
      className="
   xs:w-[80%] md:w-[40%] mt-16 flex justify-around align-middle
    border border-cyan rounded-lg
    "
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `
            ${
              isActive
                ? `bg-cyan text-gray-300 px-3`
                : `bg-gray-200 text-gray-100  hover:text-cyan active:bg-cyan active:text-gray-300 px-3`
            }
            w-full text-base text-center font-nunito m-2.5
            
            border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `
            ${
              isActive
                ? `bg-cyan text-gray-300 px-3`
                : `bg-gray-200 text-gray-100  hover:text-cyan active:bg-cyan active:text-gray-300 px-3`
            }
            w-full text-base text-center font-nunito m-2.5
            
            border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `
            ${
              isActive
                ? `bg-cyan text-gray-300 px-3`
                : `bg-gray-200 text-gray-100  hover:text-cyan active:bg-cyan active:text-gray-300 px-3`
            }
            w-full text-base text-center font-nunito m-2.5
            
            border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
