import { createContext, useLayoutEffect, useState } from "react";

// Create context object
export const CryptoContext = createContext({});

// Create provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinsData, setCoinsData] = useState(null);
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [perPage, setPerPage] = useState(10);

  const getCoinsData = async (coinid) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      ).then((res) => res.json());

      console.log("coindata", data);
      setCoinsData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const getCryptoData = async () => {
    try {
      const [coinsList, marketData] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/list`).then((res) => res.json()),
        fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d`
        ).then((res) => res.json()),
      ]);
  
      console.log("Coins List:", coinsList);
      console.log("Market Data:", marketData);
  
      setCryptoData(marketData);
      setTotalPages(100); // Assuming you want to set this based on the total number of coins
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then((res) => res.json());
      setSearchData(data.coins);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const resetFunc = () => {
    setPage(1);
    setCoinSearch("");
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setTotalPages,
        resetFunc,
        setPerPage,
        perPage,
        getCoinsData,
        coinsData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};