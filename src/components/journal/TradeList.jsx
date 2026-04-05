import { useContext, useState } from 'react';
import './TradeList.css'
import { StrategyContext } from '../../context/StrategyContext';
import JournalStats from './JournalStats';

function TradeList({ journal }) {

    const [ trades, setTrades ] = useState(journal.trades);
    const [ isActive, setIsActive ] = useState(false);

    const { strategies } = useContext(StrategyContext);

    console.log(trades);


    //TOGGLE
    function toggle() {
        if (isActive === false) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    //CALCULATE PROFIT & LOSS
    function calculatePnL(trade) {

        const entry = Number(trade.entryPrice);
        const exit = Number(trade.exitPrice);
        const charges = Number(trade.charges);
        const qty = Number(trade.qty);
        const type = trade.type?.trim().toLowerCase();
        const tradeKey = trade.key

        let tradePnL = 0;

        if (type === "buy") {
            tradePnL = ((exit - entry) * qty) - charges;
        } else if (type === "sell") {
            tradePnL = ((entry - exit) * qty) - charges;
        } else {
            tradePnL = "NA";
        }

        let tradeROI = (tradePnL / (entry * qty)) * 100;

        return {
            tradePnL, tradeROI, tradeKey
        }
    }

    //TRADE OUTCOME
    function tradeOutcome(trade, value) {

        const { tradePnL } = calculatePnL(trade);

        let key;

        if (value === "loss" && tradePnL < 0) {
            key = trade.key;

        } else if (value === "profit" && tradePnL > 0) {
            key = trade.key;

        } else if (value = "breakeven" && tradePnL === 0) {
            key = trade.key;

        } else {
            key = undefined;
        }

        return {
            key
        }
    }

    // HANDLE FILTER change
    function onFilterChange(e) {
        const filterName = e.target.name;
        const filterValue = e.target.value;

        let filteredTrades;

        if (filterName === "type" || filterName === "tradingStyle" || filterName === "strategy") {
            filteredTrades = journal.trades.filter((trade) => {
                return trade[filterName] === filterValue;
            });

        } else if (filterName === "outcome") {
            filteredTrades = journal.trades.filter((trade) => {
                const { key } = tradeOutcome(trade, filterValue);
                return trade.key === key;
            });
            
        } else {
            filteredTrades = journal.trades;
        }

        setTrades(filteredTrades);

        document.querySelectorAll("select").forEach((s) => {
            if (s !== e.target) s.selectedIndex = 0;
        });

    }



    return (
        <div className='trade-list'>
            <div className='stats'>
                <JournalStats trades={trades} />
            </div>

            <div className='trade-filters'>
                <p><b>Filter:</b></p>

                <div>
                    <button className='all-trades-btn' onClick={() => setTrades(journal.trades)}>All</button>
                </div>

                <div>
                    <select name='type' onChange={onFilterChange}> 
                        <option value='' disabled>Type</option>
                        <option value='buy' name='type'>Buy</option>
                        <option value='sell' name='type'>Sell</option>
                    </select>
                </div>

                <div>
                    <select name='tradingStyle' onChange={onFilterChange}>
                        <option value='' disabled>Trading Style</option>
                        <option value='swing'>Swing</option>
                        <option value='intraday'>Intraday</option>
                        <option value='scalping'>Scalping</option>
                        <option value='positional'>Positional</option>
                    </select>
                </div>

                <div>
                    <select name='strategy' onChange={onFilterChange}>
                        <option value='' disabled>Strategy</option>
                        {strategies.map((strategy) => {
                            return <option value={strategy.name}>{strategy.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select name='outcome' onChange={onFilterChange}>
                        <option value='' disabled>Outcome</option>
                        <option value='loss'>Loss</option>
                        <option value='profit'>Profit</option>
                        <option value='breakeven'>Breakeven</option>
                    </select>
                </div>
            </div>

            <div className='trade-list-desktop'>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Entry</th>
                            <th>Exit</th>
                            <th>Qty</th>
                            <th>SL</th>
                            <th>Style</th>
                            <th>Charges</th>
                            <th>Net P&L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade) => {

                            const { tradePnL, tradeROI } = calculatePnL(trade);

                            return (
                                <>
                                <tr>
                                    <td>{trade.symbol}</td>
                                    <td><span className={trade.type === "buy" ? "typeBuy" : "typeSell"}>{trade.type}</span></td>
                                    <td>{Number(trade.entryPrice).toLocaleString()}</td>
                                    <td>{Number(trade.exitPrice).toLocaleString()}</td>
                                    <td>{Number(trade.qty).toLocaleString()}</td>
                                    <td>{Number(trade.stopLoss).toLocaleString()}</td>
                                    <td>{trade.tradingStyle}</td>
                                    <td>{Number(trade.charges).toLocaleString()}</td>
                                    <td style={{color: tradePnL > 0? "#00e5a0" : "#ff4560"}}>{(tradePnL).toLocaleString()} ({tradeROI.toFixed(2)}%)</td>
                                </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className='trade-list-mobile'>
                {trades.map((trade) => {

                    const { tradePnL, tradeROI } = calculatePnL(trade);

                    return (
                        <div style={{borderLeft: tradePnL > 0 ? "4px solid #00e5a070" : "4px solid #ff456070"}} key={trade.key} className='trade-card-mobile'>
                            <div className='trade-info'>
                                <div className='trade-symbol-pnl'>
                                    <p><span>{trade.symbol.toUpperCase()}</span> <span className={trade.type === "buy" ? "typeBuy" : "typeSell"}>{trade.type}</span></p>
                                    <p style={{color: tradePnL > 0 ? "#00e5a0" : "#ff4560"}}>{tradePnL.toLocaleString()} ({tradeROI.toFixed(2)}%)</p>
                                </div>
                                <div className='trade-price'>
                                    <div>
                                        <p className='trd-title'>Entry</p>
                                        <p className='trd-value'>{Number(trade.entryPrice).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className='trd-title'>Exit</p>
                                        <p className='trd-value'>{Number(trade.exitPrice).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className='trd-title'>Qty</p>
                                        <p className='trd-value'>{Number(trade.qty).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className='trd-title'>Charges</p>
                                        <p className='trd-value'>{Number(trade.charges).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className='trd-type-date'>
                                    <div>
                                        <p className='trade-style-badge'>{trade.tradingStyle.toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className='trd-value'>{trade.strategy.toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{display: isActive? "block" : "none"}}>
                                <p>Extra Info</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TradeList;