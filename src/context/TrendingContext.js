import { createContext, useLayoutEffect, useState } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();

  const getTrendData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
        .then((res) => res.json())
        .then((json) => json);

      console.log(data.coins);
      setTrendData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendingRes = () => {
    getTrendData();
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);

  return <TrendingContext.Provider value={{ trendData, resetTrendingRes }}>{children}</TrendingContext.Provider>;
};
