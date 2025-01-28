import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";

const HLIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZ = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZ));
  }, [currentPrice, high, low]);

  return (
    <>
      <span className="bg-red h-1.5 rounded-l-lg w-[50%]" style={{ width: `${100 - green}%` }}>
        &nbsp;
      </span>
      <span className="bg-green h-1.5 rounded-r-lg w-[50%]" style={{ width: `${green}%` }}>
        &nbsp;
      </span>
    </>
  );
};

const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinsData, coinsData: data, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinsData(coinId);
  }, [coinId, getCoinsData]);

  const close = () => {
    navigate("..");
  };

  // Add a loading state or conditional rendering
  if (!data || !data.market_data) {
    return (
      <div className="w-full min-h-[60vh] h-full flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin" role="status" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Fallback values for missing data
  const currentPrice = data.market_data?.current_price?.[currency] || 0;
  const high = data.market_data?.high_24h?.[currency] || 0;
  const low = data.market_data?.low_24h?.[currency] || 0;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-40 backdrop-blur-sm flex items-center justify-center font-nunito"
      onClick={close}
    >
      <div
        className="w-[90%] md:w-[65%] md:h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex itemx-center justify-between h-full w-full p-4">
          <div className="flex flex-col w-[45%] h-full pr-2">
            {/* ... other JSX ... */}
            <div className="flex flex-wrap w-full mt-4 justify-between text-sm md:text-base">
              <HLIndicator currentPrice={currentPrice} high={high} low={low} />
            </div>
            {/* ... other JSX ... */}
          </div>
          <div className="flex flex-col w-[55%] pl-3">
            <Chart id={data.id} /> {/* Ensure Chart is used */}
            {/* ... other JSX ... */}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default CryptoDetails;