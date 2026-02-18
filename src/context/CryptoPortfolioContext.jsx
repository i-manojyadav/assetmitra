import { createContext, useEffect, useState } from "react";
import { getCoins } from "../components/portfolio/crypto-api";

export const CryptoPortfolioContext = createContext();

export function CryptoContext({ children }) {

    // API COINS
    const [coinList, setCoinList] = useState([]);

    // CRYPTO PORTFOLIO COINS
    const [folioCoins, setFolioCoins] = useState([]);

    // CRYPTO STATS
    const [cryptoStats, setCryptoStats] = useState([]);


    // FETCH CRYPTO COINS
    useEffect(() => {
        function fetchCoins() {
            getCoins().then((data) => {
                setCoinList(data);
            });
        }

        fetchCoins();

        const interval = setInterval(() => {
            fetchCoins();
        }, 15000);

        return () => clearInterval(interval);

    }, []);


    // CRYPTO STATS
    useEffect(() => {
        if (folioCoins.length === 0) return;

        let invested = folioCoins.reduce((sum, coin) => {
            return sum + coin.coinQty * coin.coinAvgBuy;
        }, 0);

        let current = folioCoins.reduce((sum, coin) => {
            return sum + coin.ltp * coin.coinQty
        }, 0);

        invested = Number(invested.toFixed(2));
        current = Number(current.toFixed(2));
        let pnl = Number((current - invested).toFixed(2));

        setCryptoStats((stat) => {
            return {...stat, invested: invested, current: current, pnl: pnl}
        });
    }, [folioCoins]);


    // UPDATING COINS PRICE LIVE

    useEffect(() => {
        if (coinList.length === 0) return;

        const coinLTP = folioCoins.map((coin) => {
            const apiCoin = coinList.find((item) => {
                return item.symbol === coin.coinSymbol.toUpperCase();
            });

            if (!apiCoin) return coin;

            return {...coin, ltp: Number(apiCoin.lastPrice * 90)};
        });

        setFolioCoins(coinLTP);
    }, [coinList]);




    // SAVING USER PORTFOLIO DATA

    useEffect(() => {
        const savedData = localStorage.getItem("folioCoins");

        if (savedData) {
            setFolioCoins(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("folioCoins", JSON.stringify(folioCoins));
    }, [folioCoins]);




    return (
        <CryptoPortfolioContext.Provider
        value={{coinList,
            folioCoins,
            setFolioCoins,
            cryptoStats,
            setCryptoStats,
        }}>

            {children}

        </CryptoPortfolioContext.Provider>
    )


}