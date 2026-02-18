import './CryptoPortfolio.css'
import StatCard, { StatCardMobo } from '../ui/StatCard'
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext';

export default function CryptoPortfolio() {

    const { coinList, folioCoins, setFolioCoins, cryptoStats } = useContext(CryptoPortfolioContext);



    // ADD NEW COIN
    const [coin, setCoin] = useState({
        coinSymbol: "",
        coinQty: "",
        coinAvgBuy: ""
    });


    // HANDLE USER INPUT CHANGE
    function handleCoinChange(e) {
        setCoin((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    }


    // ADD NEW COIN
    function addACoin(e) {
        e.preventDefault();
        userInputMatch();
    }


    // MATCHING USER INPUT WITH API DATA
    function userInputMatch() {
        coinList.filter((crypto) => {
            if (crypto.symbol === coin.coinSymbol.toUpperCase()) {
                setFolioCoins((userCoin) => {
                    return [...userCoin, {...coin, ltp: crypto.lastPrice * 90, key: uuidv4()}]
                });

                setCoin({
                    coinSymbol: "",
                    coinQty: "",
                    coinAvgBuy: ""
                });

                toast.success(`(${crypto.symbol}) Added Successfully!`);
            }

            else {
                console.log("ERROR IN USER INPUT");
            }
        });
    }


    // EXIT OR REMOVE ASSET
    function removeCoin(coinSymbol, key) {
        setFolioCoins(folioCoins.filter((coin) => {
            return coin.key != key;
        }));

        toast.success(`${coinSymbol}, Removed!`);
    }


    return (
        <div className='crypto-portfolio'>
            <div className='crypto-stats'>
                <div className='crypto-stats-desk'>
                    <StatCard title="Invested" value={cryptoStats.invested} />
                    <StatCard title="Current" value={cryptoStats.current} />
                    <StatCard title="Profit & Loss" value={cryptoStats.pnl} color={true} />
                </div>
                <div className='crypto-stats-mobo'>
                    <StatCardMobo invested={cryptoStats.invested} current={cryptoStats.current} pnl={cryptoStats.pnl} color={true}/>
                </div>
            </div>
            <div className='add-coin'>
                <div className='add-coin-form'>
                    <form onSubmit={addACoin}>
                        <input type="text" placeholder='Enter Coin Symbol' value={coin.coinSymbol} name='coinSymbol' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Enter Quantity' value={coin.coinQty} name='coinQty' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Enter Avg. Buy Price' value={coin.coinAvgBuy} name='coinAvgBuy' onChange={handleCoinChange}/>
                        <button className='addCoinBtn'><i className="fa-solid fa-plus"></i>Add</button>
                        
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
                                <td>{coin.coinSymbol.toUpperCase()}</td>
                                <td>{Number(coin.coinQty).toLocaleString()}</td>
                                <td>{Number(coin.coinAvgBuy).toLocaleString()}</td>
                                <td>{Number((Number(coin.coinQty)*Number(coin.coinAvgBuy)).toFixed(2)).toLocaleString()}</td>
                                <td>{Number((Number(coin.ltp)*Number(coin.coinQty)).toFixed(2)).toLocaleString()}</td>
                                <td>{Number(Number(coin.ltp).toFixed(2)).toLocaleString()}</td>
                                <td style={{color: (Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinAvgBuy))) > 0 ? "green" : "red"}}>{Number((Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinAvgBuy))).toFixed(2)).toLocaleString()}</td>
                                <td className='folio-action'><i onClick={() => {removeCoin(coin.coinSymbol, coin.key)}} className="fa-solid fa-arrow-right-from-bracket"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='crypto-folio-mobo'>
                <table>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Change</th>
                            <th><i className="fa-solid fa-ellipsis-vertical"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {folioCoins.map((coin, key) => (
                            <tr key={coin.key}>
                                <td><div><span>Avg: {coin.coinAvgBuy}</span> | <span>Qty: {coin.coinQty}</span></div> <div className='cfm-asset'>{coin.coinSymbol.toUpperCase()}</div> <div><span>Inv. {Number((Number(coin.coinQty)*Number(coin.coinAvgBuy)).toFixed(2)).toLocaleString()}</span> | <span>Cur. {Number((Number(coin.ltp)*Number(coin.coinQty)).toFixed(2)).toLocaleString()}</span></div> </td>
                                <td><div><span>{((Number((Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinAvgBuy))).toFixed(2)) / Number((Number(coin.coinQty)*Number(coin.coinAvgBuy)).toFixed(2))) * 100).toFixed(2)}%</span></div> <div className='cfm-asset' style={{color: (Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinAvgBuy))) > 0 ? "green" : "red"}}>{Number((Number(coin.ltp)*Number(coin.coinQty) - (Number(coin.coinQty)*Number(coin.coinAvgBuy))).toFixed(2)).toLocaleString()}</div> <div><span>LTP {Number(Number(coin.ltp).toFixed(2)).toLocaleString()}</span></div></td>
                                <td className='folio-action'><i onClick={() => {removeCoin(coin.coinSymbol, coin.key)}} className="fa-solid fa-arrow-right-from-bracket"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}