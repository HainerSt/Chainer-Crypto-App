import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import logoSvg from "../assets/logo.svg";
import Navigation from "../components/Navigation";

import { CryptoProvider } from "../context/CryptoContext";

const Home = () => {
  return (
    <CryptoProvider>
        <main className=" w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito">
          <div className="w-screen h-screen bg-gray-300 fixed -z-10"></div>
          <Link to="/" className="absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan flex items-center">
            <Logo />
            <img src={logoSvg} alt="CryptoApp Logo"></img>
            <span>Chainer</span>
          </Link>

        <Navigation />

          <Outlet />
        </main>
    </CryptoProvider>
  );
};

export default Home;
