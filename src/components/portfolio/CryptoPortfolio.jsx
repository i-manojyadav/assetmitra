import './CryptoPortfolio.css'
import StatCard, { StatCardMobile } from '../ui/StatCard'
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext';
import PositionItem from './PositionItem';

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



    return (
        <div className='crypto-portfolio'>
            <div className='crypto-stats-'>
                <div className='stats crypto-stats-desktop'>
                    <StatCard title={"Invested"} value={cryptoStats.invested} subTitle={"Capital deployed"} />
                    <StatCard title={"Current"} value={cryptoStats.current} subTitle={"Market Value"} />
                    <StatCard title={"Profit & Loss"} value={cryptoStats.pnl} subTitle={"Unrealized"} roi={cryptoStats.roi} isPnL={true} />
                </div>
                <div className='stats-mobile'>
                    <StatCardMobile invested={cryptoStats.invested} current={cryptoStats.current} pnl={cryptoStats.pnl} roi={cryptoStats.roi} />
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
                <PositionItem onAdd={addCoinToggle} />
            </div>
        </div>
    )
}