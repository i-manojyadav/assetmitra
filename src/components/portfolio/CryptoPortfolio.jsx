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

    const [ searchCoin, setSearchCoin ] = useState("");
    const [ coinMatch, setCoinMatch ] = useState([]);
    const [ searchActive, setSearchActive ] = useState(false);

    // ADD NEW COIN
    const [coin, setCoin] = useState({
        symbol: "",
        qty: "",
        avgBuy: ""
    });

    // HANDLE COIN SEARCH
    function handleCoinSearch(e) {
        setSearchActive(true);
        let input = e.target.value;

        if (input === "") {
            setSearchActive(false);
        }
        
        setSearchCoin(input);

        let coinSymbols = coinList.map((coin) => {
            return coin.symbol;
        })

        let filteredCoins = coinSymbols.filter((coin) => {
            return coin.toLowerCase().startsWith(input.toLowerCase());
        });

        setCoinMatch(filteredCoins);
    }

    // HANDLE COIN SELECT (SEARCH)
    function handleCoinSelect(coin) {
        setSearchCoin(coin);
        setCoin((data) => {
            return {...data, symbol: coin}
        });

        setSearchActive(false);
    }

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
                    return [...userCoin, {...coin, ltp: crypto.lastPrice * 94, inv: coin.qty * coin.avgBuy, key: uuidv4()}]
                });

                setCoin({
                    symbol: "",
                    qty: "",
                    avgBuy: ""
                });

                setSearchCoin("");

                addCoinToggle();

                toast.success(`Coin added`);
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
                        <input type="search" placeholder='Coin Symbol' style={{textTransform: 'uppercase'}} value={searchCoin} onChange={handleCoinSearch}/>
                        <input type="number" step="any" placeholder='Quantity' style={{textTransform: 'uppercase'}} value={coin.qty} name='qty' onChange={handleCoinChange}/>
                        <input type="number" step="any" placeholder='Avg. Buy Price' style={{textTransform: 'uppercase'}} value={coin.avgBuy} name='avgBuy' onChange={handleCoinChange}/>
                        <button className='addCoinBtn'><i className="fa-solid fa-plus"></i>Add</button>
                    </form>
                </div>
                <div className='coin-search-list' style={{display: searchActive ? "block" : "none"}}>
                    <h3>Suggestions</h3>
                    {coinMatch.map((coin, index) => (
                        <p className='coin-search-item' key={index} onClick={() => handleCoinSelect(coin)}><span>{coin}</span> <span><i className="fa-regular fa-square-plus"></i></span></p>
                    ))}
                </div>
            </div>
            <div className='crypto-folio'>
                <PositionItem onAdd={addCoinToggle} />
            </div>
        </div>
    )
}