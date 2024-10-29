import React, { useContext, useLayoutEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CryptoContext } from "../context/CryptoContext";

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="text-sm bg-gray-200 text-cyan px-1.5 py-0.5 my-1 rounded">{`${label} : ${new Intl.NumberFormat(
          "en-US",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height="80%" width="100%">
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"1.5px"} />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" hide />
        <YAxis dateKey={type} domain={["auto"]} hide />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          animationDuration="2000"
          cursor={false}
          animationEasing="ease-in-out"
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);

        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });

        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id);
  }, [id, type, days]);

  return (
    <div className="w-full h-[70%]">
      <ChartComponent data={chartData} currency={currency} type={type} />
      <div className="flex justify-center">
        <button
          className={`text-sm py-0 px-1.5 ml-2  bg-opacity-25 rounded ${
            days === 7
              ? "bg-gray-100 text-gray-300 border border-cyan"
              : "bg-gray-300 text-gray-100 border border-gray-100"
          } capitalize`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded ${
            days === 14
              ? "bg-gray-100 text-gray-300 border border-cyan"
              : " bg-gray-300 text-gray-100 border border-gray-100"
          } capitalize`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25  rounded ${
            days === 30
              ? "bg-gray-100 text-gray-300 border border-cyan"
              : " bg-gray-300 text-gray-100 border border-gray-100"
          } capitalize`}
          onClick={() => setDays(30)}
        >
          30d
        </button>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded ${
            type === "prices" ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100 border border-gray-300"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`text-md py-0.5 px-1.5 ml-2  bg-opacity-25 rounded ${
            type === "market_caps" ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100 border border-gray-300"
          } capitalize `}
          onClick={() => setType("market_caps")}
        >
          Total Volume
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded ${
            type === "total_volumes" ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100 border border-gray-300"
          } capitalize`}
          onClick={() => setType("total_volumes")}
        >
          Market Cap
        </button>
      </div>
    </div>
  );
};

export default Chart;
