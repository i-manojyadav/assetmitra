import { useContext, useEffect, useState } from 'react';
import './TradeList.css'
import { StrategyContext } from '../../context/StrategyContext';
import JournalStats from './JournalStats';
import { JournalContext } from '../../context/JournalContext';

function TradeList({ journal }) {

    const [ trades, setTrades ] = useState([]);
    const [ isActive, setIsActive ] = useState(null);

    const { journals, setJournals } = useContext(JournalContext);
    const { strategies } = useContext(StrategyContext);

    // TOGGLE
    function toggle() {
        if (isActive === false) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    // UPDATE SELECTED JOURNAL
    useEffect(() => {
        setTrades(journal.trades);
    }, [journal]);

    // CALCULATE PROFIT & LOSS
    function calculatePnL(trade) {

        const entry = Number(trade.entryPrice);
        const exit = Number(trade.exitPrice);
        const charges = Number(trade.charges);
        const qty = Number(trade.qty);
        const side = trade.side?.trim().toLowerCase();
        const tradeKey = trade.key

        let tradePnL = 0;

        if (side === "buy") {
            tradePnL = ((exit - entry) * qty) - charges;
        } else if (side === "sell") {
            tradePnL = ((entry - exit) * qty) - charges;
        } else {
            tradePnL = "NA";
        }

        let tradeROI = (tradePnL / (entry * qty)) * 100;

        return {
            tradePnL, tradeROI, tradeKey
        }
    }

    // TRADE OUTCOME
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

        if (filterName === "side" || filterName === "type" || filterName === "strategy") {
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

    // DELETE TRADE
    function deleteTrade(key) {
        
        setJournals(journals.map((journal) => {
            return {
                ...journal, trades: journal.trades.filter((trade) => {
                    return trade.key !== key;
                })
            }
        }));

        setTrades(trades.filter((trade) => {
            return trade.key !== key;
        }));
    }



    return (
        <div className='trade-list'>
            <div className='stats'>
                <JournalStats trades={trades} />
            </div>

            <div className='trade-filters'>
                <p className='filter-title'>Filter:</p>

                <div>
                    <button className='all-trades-btn' onClick={() => setTrades(journal.trades)}>All</button>
                </div>

                <div>
                    <select name='side' defaultValue='' onChange={onFilterChange}>
                        <option value='' disabled>Side</option>
                        <option value='buy' name='side'>Buy</option>
                        <option value='sell' name='side'>Sell</option>
                    </select>
                </div>

                <div>
                    <select name='type' defaultValue='' onChange={onFilterChange}>
                        <option value='' disabled>Type</option>
                        <option value='swing'>Swing</option>
                        <option value='intraday'>Intraday</option>
                        <option value='scalping'>Scalping</option>
                        <option value='positional'>Positional</option>
                    </select>
                </div>

                <div>
                    <select name='strategy' defaultValue='' onChange={onFilterChange}>
                        <option value='' disabled>Strategy</option>
                        {strategies.map((strategy, idx) => {
                            return <option key={idx} value={strategy.name}>{strategy.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select name='outcome' defaultValue='' onChange={onFilterChange}>
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
                            <th>Side</th>
                            <th>Entry</th>
                            <th>Exit</th>
                            <th>Qty</th>
                            <th>SL</th>
                            <th>Charges</th>
                            <th>Net P&L</th>
                            <th><i className="fa-solid fa-ellipsis-vertical"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade, index) => {

                            const { tradePnL, tradeROI } = calculatePnL(trade);

                            return (
                                <>
                                <tr key={trade.key} onClick={() => setIsActive(isActive === index ? null : index)}>
                                    <td style={{borderLeft: tradePnL > 0 ? "2px solid #00e5a0" : "2px solid #ff4560"}}>{trade.symbol}</td>
                                    <td><span className={trade.side === "buy" ? "buy-badge" : "sell-badge"}>{trade.side}</span></td>
                                    <td>{Number(trade.entryPrice).toLocaleString()}</td>
                                    <td>{Number(trade.exitPrice).toLocaleString()}</td>
                                    <td>{Number(trade.qty).toLocaleString()}</td>
                                    <td>{Number(trade.stopLoss).toLocaleString()}</td>
                                    <td>{Number(trade.charges).toLocaleString()}</td>
                                    <td style={{color: tradePnL > 0? "#00e5a0" : "#ff4560"}}>{(tradePnL).toLocaleString()} ({tradeROI.toFixed(2)}%)</td>
                                    <td><i onClick={() => deleteTrade(trade.key)} className="fa-regular fa-trash-can"></i></td>
                                </tr>

                                {isActive === index && (<tr key={trade.key} className='expanded-section'>
                                    <td><span style={{color: "#909090"}}>Strategy</span></td>
                                    <td><span className='badge'>{trade.strategy}</span></td>
                                    <td><span style={{color: "#909090"}}>Type</span></td>
                                    <td><span className='badge'>{trade.type}</span></td>
                                    <td><span style={{color: "#909090"}}>Notes:</span></td>
                                    <td colSpan='5'><span>{trade.notes}</span></td>
                                </tr>)}
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className='trade-list-mobile'>
                {trades.map((trade, index) => {

                    const { tradePnL, tradeROI } = calculatePnL(trade);

                    return (
                        <div onClick={() => setIsActive(isActive === index ? null : index)} style={{borderLeft: tradePnL > 0 ? "4px solid #00e5a0" : "4px solid #ff4560"}} key={trade.key} className='trade-card-mobile'>
                            <div className='trade-info'>
                                <div className='trade-symbol-pnl'>
                                    <p><span>{trade.symbol.toUpperCase()}</span> <span className={trade.side === "buy" ? "buy-badge" : "sell-badge"}>{trade.side}</span></p>
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
                                <div className='trd-type-strategy'>
                                    <div>
                                        <p className='badge'>{trade.type.toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <i onClick={() => deleteTrade(trade.key)} className="fa-regular fa-trash-can delete-btn"></i>
                                    </div>
                                </div>
                            </div>

                            {isActive === index && <div className='expanded-section-mobile'>
                                <p className='badge'>Strategy : {trade.strategy}</p>
                                <p><span style={{color: "#f0f0f0"}}>Notes:</span> <span style={{color: "#8d8d8d"}}>{trade.notes}</span></p>
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TradeList;