import { createContext, useLayoutEffect, useState } from "react";

//create context object
export const CryptoContext = createContext({});

//create provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  return <CryptoContext.Provider value={{}}>{children}</CryptoContext.Provider>;
};
