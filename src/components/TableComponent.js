import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Paginations from "./Paginations";
import { Link } from "react-router-dom";
import { StorageContext } from "../context/StorageContext";

const SaveBtn = ({ data }) => {
  const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (allCoins.includes(data.id)) {
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  };

  return (
    <button
      className="outline-0 border-0 bg-none cursor-pointer"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <svg
        className={`w-[1.5rem] ml-1.5
        ${allCoins.includes(data.id) ? "fill-cyan" : "fill-gray-100"}
        hover:fill-cyan`}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG code */}
      </svg>
    </button>
  );
};

const TableComponent = () => {
  const { cryptoData, currency } = useContext(CryptoContext);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        {cryptoData ? (
          <table>
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1 md:table-cell hidden">total volume</th>
                <th className="py-1 sm:table-cell hidden">market cap</th>
                <th className="py-1 lg:table-cell hidden">1h</th>
                <th className="py-1 lg:table-cell hidden">24H</th>
                <th className="py-1 lg:table-cell hidden">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((data) => (
                <tr
                  key={data.id}
                  className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                >
                  <td className="py-4 flex items-center uppercase">
                    <SaveBtn data={data} />
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-[1.2rem] h-[1.2rem] mx-1.5"
                    ></img>
                    <span>
                      <Link to={`/${data.id}`} className="cursor-pointer">
                        {data.symbol}
                      </Link>
                    </span>
                  </td>
                  <td className="py-4">
                    <Link to={`/${data.id}`} className="cursor-pointer">
                      {data.name}
                    </Link>
                  </td>
                  <td className="py-4">
                    {currencyFormatter.format(data.current_price)}
                  </td>
                  <td className="py-4 md:table-cell hidden">
                    {currencyFormatter.format(data.total_volume)}
                  </td>
                  <td>{currencyFormatter.format(data.market_cap)}</td>
                  <td
                    className={
                      data.price_change_percentage_1h_in_currency > 0
                        ? "text-green py-4 lg:table-cell hidden"
                        : "text-red py-4 lg:table-cell hidden"
                    }
                  >
                    {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}%
                  </td>
                  <td
                    className={
                      data.price_change_percentage_24h_in_currency > 0
                        ? "text-green py-4 lg:table-cell hidden"
                        : "text-red py-4 lg:table-cell hidden"
                    }
                  >
                    {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}%
                  </td>
                  <td
                    className={
                      data.price_change_percentage_7d_in_currency > 0
                        ? "text-green py-4 lg:table-cell hidden"
                        : "text-red py-4 lg:table-cell hidden"
                    }
                  >
                    {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full min-h-[60vh] h-full flex justify-center items-center">
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="ml-2">Please wait...</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4 capitalize h-[2rem] text-sm">
        <span>
          Data provided by{" "}
          <a
            className="text-cyan"
            href="http://www.coingecko.com"
            target={"_blank"}
            rel="noreferrer"
          >
            CoinGecko
          </a>{" "}
          API.
        </span>
        <Paginations />
      </div>
    </>
  );
};

export default TableComponent;