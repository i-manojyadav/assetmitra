import { useState } from 'react';
import './TradeList.css'

function TradeList({ journal }) {

    const [ isActive, setIsActive ] = useState(false);


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
            tradePnL, tradeROI
        }
    }



    return (
        <div className='trade-list'>
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
                        {journal.trades.map((trade) => {

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
                {journal.trades.map((trade) => {

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