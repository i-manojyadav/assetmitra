import './CryptoPortfolio.css'
import StatCard from '../ui/StatCard'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { getCoins } from './crypto-api';
import toast from 'react-hot-toast';

export default function CryptoPortfolio() {


    // ADD NEW COIN
    const [coin, setCoin] = useState({
        coinName: "",
        coinQty: "",
        coinBuyPrice: ""
    });

    // STORES API DATA
    const [coinList, setCoinList] = useState([]);

    // USER CRYPTO COINS
    const [folioCoins, setFolioCoins] = useState([]);

    // CRYPTO STATS
    const [cryptoStats, setCryptoStats] = useState([]);



    // HANDLE USER INPUT CHANGE

    function handleCoinChange(e) {
        setCoin((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    }

    
    // CRYPTO COIN FETCHING

    useEffect(() => {
        function fetchCoins() {
            getCoins().then((data) => {
                setCoinList(data);
            });
        }

        fetchCoins();

        const interval = setInterval(() => {
            fetchCoins();
        }, 30000);

        return () => clearInterval(interval);

    }, []);


    // ADD NEW COIN

    function addACoin(e) {
        e.preventDefault();
        userInputMatch();
    }


    // MATCHING USER INPUT WITH API DATA

    function userInputMatch() {
        coinList.filter((crypto) => {
            if (crypto.symbol === coin.coinName.toUpperCase()) {
                setFolioCoins((userCoin) => {
                    return [...userCoin, {...coin, ltp: crypto.lastPrice * 90, key: uuidv4()}]
                });

                setCoin({
                    coinName: "",
                    coinQty: "",
                    coinBuyPrice: ""
                });

                toast.success(`(${crypto.symbol}) Added Successfully!`);
            }

            else {
                console.log("ERROR IN USER INPUT");
            }
        });
    }


    // UPDATING FOLIO COINS` PRICE

    useEffect(() => {
        if (coinList.length === 0) return;

        const coinLTP = folioCoins.map((coin) => {
            const apiCoin = coinList.find((item) => {
                return item.symbol === coin.coinName.toUpperCase();
            });

            if(!apiCoin) return coin;

            return {...coin, ltp: Number(apiCoin.lastPrice * 90)};
            
        });

        setFolioCoins(coinLTP);

    }, [coinList]);


    // UPDATING CRYPTO STATS

    useEffect(() => {

        if (folioCoins.length === 0) return;

        let invested = folioCoins.reduce((sum, coin) => {
            return sum + coin.coinQty * coin.coinBuyPrice;
        }, 0);

        let current = folioCoins.reduce((sum, coin) => {
            return (sum + coin.ltp * coin.coinQty);
        }, 0);

        invested = invested.toFixed(2);
        current = current.toFixed(2);
        let pnl = (current - invested).toFixed(2);

        setCryptoStats((stat) => {
            return {...stat, invested: invested, current: current, pnl: pnl}
        });

    }, [folioCoins]);


    // EXIT OR REMOVE ASSET

    function removeCoin(coinName, key) {
        setFolioCoins(folioCoins.filter((coin) => {
            return coin.key != key;
        }));

        toast.success(`${coinName}, Removed!`);
    }



    // SAVING USER PORTFOLIO DATA (LOCAL STORAGE)

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
        <div className='crypto-portfolio'>
            <div className='crypto-stats'>
                <StatCard title="Invested" value={cryptoStats.invested} />
                <StatCard title="Current" value={cryptoStats.current} />
                <StatCard title="Profit & Loss" value={cryptoStats.pnl} color={true} />
            </div>
            <div className='add-coin'>
                <div className='add-coin-form'>
                    <form onSubmit={addACoin}>
                        <input type="text" placeholder='Enter Coin Symbol' value={coin.coinName} name='coinName' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Enter Quantity' value={coin.coinQty} name='coinQty' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Enter Avg. Buy Price' value={coin.coinBuyPrice} name='coinBuyPrice' onChange={handleCoinChange}/>
                        <button className='addCoinBtn'><i className="fa-solid fa-plus"></i> Add</button>
                    </form>
                </div>
            </div>
            <div className='crypto-folio'>
                <table>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Qty</th>
                            <th>Avg</th>
                            <th>Invested</th>
                            <th>Current</th>
                            <th>LTP</th>
                            <th>P&L</th>
                            <th><i className="fa-solid fa-ellipsis-vertical"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {folioCoins.map((coin, key) => (
                            <tr key={coin.key}>
                                <td>{coin.coinName.toUpperCase()}</td>
                                <td>{Number(coin.coinQty).toLocaleString()}</td>
                                <td>{Number(coin.coinBuyPrice).toLocaleString()}</td>
                                <td>{Number((Number(coin.coinQty)*Number(coin.coinBuyPrice)).toFixed(2)).toLocaleString()}</td>
                                <td>{Number((Number(coin.ltp)*Number(coin.coinQty)).toFixed(2)).toLocaleString()}</td>
                                <td>{Number(Number(coin.ltp).toFixed(2)).toLocaleString()}</td>
                                <td style={{color: (Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinBuyPrice))) > 0 ? "green" : "red"}}>{Number((Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinBuyPrice))).toFixed(2)).toLocaleString()}</td>
                                <td className='folio-action'><i onClick={() => {removeCoin(coin.coinName, coin.key)}} className="fa-solid fa-arrow-right-from-bracket"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}