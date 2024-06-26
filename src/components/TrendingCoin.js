import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  const navigate = useNavigate();

  const getcoinDetails = (id) => {
    navigate(id);
  };

  return (
    <div
      onClick={() => {
        getcoinDetails(data.id);
      }}
      className="w-[40%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40"
    >
      {data ? (
        <div className="i">
          <h3 className="text-base md:text-sm flex flex-row items-center my-0.5">
            <span className="text-gray-100 capitalize">name: &nbsp; </span>
            <span className="text-cyan capitalize md:text-base lg:text-lg">{data.name}</span>
          </h3>

          <h3 className="text-base block md:flex items-end md:items-center my-0.5">
            <span className="text-gray-100 capitalize">Market cap rank: &nbsp;</span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          <h3 className="text-base flex flex-wrap items-center my-0.5">
            <span className="text-gray-100 capitalize">Price: &nbsp; </span>
            <span className="text-cyan text-[0.7rem] md:text-sm">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>

          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">Score: &nbsp;</span>
            <span className="text-cyan">{data.score}</span>
          </h3>
          <img
            src={data.large}
            alt={data.name}
            className="w-[25%] h-auto rounded-full absolute top-2/4 -right-5 -translate-y-20"
          ></img>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin" role="status" />
          <span className="ml-2">Please wait...</span>
        </div>
      )}
    </div>
  );
};

export default TrendingCoin;
