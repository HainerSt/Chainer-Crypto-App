import React, { useContext, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";

const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinsData, coinsData } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinsData(coinId);
  }, [coinId]);

  const close = ()=>{
    navigate("..")
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center font-nunito"
    onClick={close}
    >
      <div className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
      onClick={(e)=>{e.stopPropagation()}}>
      {coinsData ? <h1>{coinsData.id}</h1> : null}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default CryptoDetails;
