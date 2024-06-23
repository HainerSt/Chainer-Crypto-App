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
        <>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">name: &nbsp; </span>
            <span className="text-cyan">{data.name}</span>
          </h3>

          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">Market cap rank: &nbsp;</span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">Price (in btc): &nbsp; </span>
            <span className="text-cyan">
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
            className="w-[25%] h-auto rounded-full absolute top-2/4 -right-8 -translate-y-20"
          ></img>
        </>
      ) : null}
    </div>
  );
};

export default TrendingCoin;
