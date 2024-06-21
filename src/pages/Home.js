import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

import { CryptoProvider } from "../context/CryptoContext";
import { TrendingProvider } from "../context/TrendingContext";

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
      <main className=" w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito">
        <div className="w-screen h-screen bg-gray-300 fixed -z-10"></div>

        <Link
          to="/"
          className="absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan flex items-center"
        >
          <span>Chainer</span>
        </Link>

        <Navigation />

        <Outlet />
      </main>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
