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
            return sum + coin.qty * coin.avgBuy;
        }, 0);

        let current = folioCoins.reduce((sum, coin) => {
            return sum + coin.ltp * coin.qty
        }, 0);

        invested = Number(invested);
        current = Number(current);
        let pnl = Number((current - invested));
        let roi = Number((pnl/invested)*100);

        setCryptoStats((stat) => {
            return {...stat, invested: invested, current: current, pnl: pnl, roi: roi}
        });
    }, [folioCoins]);

    // HANDLES EMPTY CRYPTOSTATS
    useEffect(() => {
        if (folioCoins.length === 0) {
            setCryptoStats({invested: 0, current: 0, pnl: 0, roi: 0});
        }
    }, [folioCoins]);


    // UPDATING COINS PRICE LIVE

    useEffect(() => {
        if (coinList.length === 0) return;

        const coinLTP = folioCoins.map((coin) => {
            const apiCoin = coinList.find((item) => {
                return item.symbol === coin.symbol.toUpperCase();
            });

            if (!apiCoin) return coin;

            return {...coin, ltp: Number(apiCoin.lastPrice * 90), cur: coin.qty * Number(apiCoin.lastPrice * 90), pnl: coin.qty * Number(apiCoin.lastPrice * 90) - coin.inv };
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