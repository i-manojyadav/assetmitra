import './CryptoPortfolio.css'
import StatCard, { StatCardMobo } from '../ui/StatCard'
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext';

export default function CryptoPortfolio() {

    const { coinList, folioCoins, setFolioCoins, cryptoStats } = useContext(CryptoPortfolioContext);

    const [isActive, setIsActive] = useState(false);

    function addCoinToggle() {
        if (isActive === false) {
            setIsActive(true);
        }

        else {
            setIsActive(false)
        }
    }

    // ADD NEW COIN
    const [coin, setCoin] = useState({
        symbol: "",
        qty: "",
        avgBuy: ""
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
            if (crypto.symbol === coin.symbol.toUpperCase()) {
                setFolioCoins((userCoin) => {
                    return [...userCoin, {...coin, ltp: crypto.lastPrice * 90, inv: coin.qty * coin.avgBuy, key: uuidv4()}]
                });

                setCoin({
                    symbol: "",
                    qty: "",
                    avgBuy: ""
                });

                toast.success(`(${crypto.symbol}) Added Successfully!`);
            }

            else {
                console.log("ERROR IN USER INPUT");
            }
        });
    }


    // EXIT OR REMOVE ASSET
    function removeCoin(symbol, key) {
        setFolioCoins(folioCoins.filter((coin) => {
            return coin.key != key;
        }));

        toast.success(`${symbol}, Removed!`);
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
                    <StatCardMobo invested={cryptoStats.invested} current={cryptoStats.current} pnl={cryptoStats.pnl} roi={cryptoStats.roi} color={true}/>
                </div>
            </div>
            <div className='add-coin-toggle'>
                <button style={{display: isActive? "none" : "block"}} onClick={addCoinToggle}>Add Coin</button>
            </div>
            <div style={{display: isActive? "block" : "none"}} className='add-coin'>
                <div className='add-coin-form'>
                    <form onSubmit={addACoin}>
                        <input type="text" placeholder='Enter Coin Symbol' value={coin.symbol} name='symbol' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Enter Quantity' value={coin.qty} name='qty' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Enter Avg. Buy Price' value={coin.avgBuy} name='avgBuy' onChange={handleCoinChange}/>
                        <button onClick={() => setIsActive(false)} className='addCoinBtn'><i className="fa-solid fa-plus"></i>Add</button>
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
                                <td>{coin.symbol.toUpperCase()}</td>
                                <td>{Number(coin.qty).toLocaleString()}</td>
                                <td>{Number(coin.avgBuy).toLocaleString()}</td>
                                <td>{Number(coin.inv).toLocaleString()}</td>
                                <td>{Number(coin.cur).toLocaleString()}</td>
                                <td>{Number(Number(coin.ltp).toFixed(2)).toLocaleString()}</td>
                                <td style={{color: coin.pnl > 0? "green" : "red"}}>{Number(coin.pnl).toLocaleString()} ({(((coin.pnl/coin.inv)*100).toFixed(2)).toLocaleString()}%)</td>
                                <td className='folio-action'><i onClick={() => {removeCoin(coin.symbol, coin.key)}} className="fa-solid fa-arrow-right-from-bracket"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='crypto-folio-mobo'>
                <table>
                    <tbody>
                        {folioCoins.map((coin, key) => (
                            <tr className='cfm' key={coin.key}>
                                <td className='cfm-left'><div>{coin.symbol}</div> <div>Inv. {Number(coin.inv.toFixed(2)).toLocaleString()}</div></td>
                                <td className='cfm-right'><div style={{color: coin.pnl > 0 ? "green" : "red"}}>{Number(((coin.pnl) || 0).toFixed(2)).toLocaleString()} ({(((coin.pnl/coin.inv)*100).toFixed(2)).toLocaleString()}%)</div> <div>LTP: {(coin.ltp.toFixed(2)).toLocaleString()}</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}