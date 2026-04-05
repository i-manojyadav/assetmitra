import { useContext, useEffect, useState } from 'react'
import './StrategyStats.css'
import { JournalContext } from '../../context/JournalContext';

function StrategyStats({ strategy }) {

    const { journals } = useContext(JournalContext);

    const [ strategyStats, setStrategyStats ] = useState([]);
    const [ trades, setTrades ] = useState([]);

    //FILTER STRATEGY TRADES
    useEffect(() => {
        const filterTrades = journals.flatMap((journal) => {
            const trades = journal.trades.filter((trade) => {
                return trade.strategy === strategy.name;
            });

            return trades;
        });

        setTrades(filterTrades);

    }, [strategy.name]);

    //UPDATE STRATEGY STATS
    useEffect(() => {

        const grossPnL = trades.reduce((sum, trade) => {
            const entry = Number(trade.entryPrice);
            const exit = Number(trade.exitPrice);
            const qty = Number(trade.qty);

            const type = trade.type.toLowerCase() === "buy" ? 1 : -1;

            const pnl = (exit - entry) * qty * type;

            return sum + pnl;
        }, 0);

        const charges = trades.reduce((sum, trade) => {
            return sum + Number(trade.charges);
        }, 0);

        const netPnL = grossPnL - charges;

        const calWinRate = (trade) => {
            if (trades.length === 0) {
                return 0;
            }

            const wins = trades.reduce((sum, trade) => {
                const entry = Number(trade.entryPrice);
                const exit = Number(trade.exitPrice);
                const qty = Number(trade.qty);

                const type = trade.type?.toLowerCase() === "buy" ? 1 : -1;

                const pnl = (exit -entry) * qty * type;

                if (pnl > 0) {
                    return sum + 1;
                }

                return sum;
            }, 0);

            const tradeWins = (wins / trades.length) * 100;

            return tradeWins;
        }

        const winRate = calWinRate(trades);

        function calculatePnL(trade) {
            const entry = Number(trade.entryPrice);
            const exit = Number(trade.exitPrice);
            const qty = Number(trade.qty);
            const type = trade.type.toLowerCase();

            if (type === "buy") {
                return (exit - entry) * qty;
            } else if(type === "sell") {
                return (entry - exit ) * qty;
            }
        }

        const bestTrade = trades.reduce((best, trade) => {
            const pnl = calculatePnL(trade);

            if (!best || pnl > best.pnl) {
                return {...trade, pnl};
            }

            return best;

        }, null);

        const worstTrade = trades.reduce((worst, trade) => {
            const pnl = calculatePnL(trade);

            if (!worst || pnl < worst.pnl) {
                return {...trade, pnl};
            }

            return worst;

        }, null);

        console.log(worstTrade?.symbol);


        setStrategyStats(() => {
            return { netPnL: netPnL, charges: charges, winRate: winRate, bestTrade: bestTrade, worstTrade: worstTrade }
        });

    }, [trades.length])


    return (
        <div className='strategy-stats'>
            <div className='strategy-stat-card'>
                <p className='s-title'>Net P&L</p>
                <p className='s-value'>{strategyStats.netPnL}</p>
                <p className='s-sub-title'>After all charges</p>
            </div>
            <div className='strategy-stat-card'>
                <p className='s-title'>Charges</p>
                <p className='s-value'>{strategyStats.charges}</p>
                <p className='s-sub-title'>Brokerage + STT, etc.</p>
            </div>
            <div className='strategy-stat-card'>
                <p className='s-title'>Win Rate</p>
                <p className='s-value'>{strategyStats.winRate}%</p>
                <p className='s-sub-title'>Win Rate %</p>
            </div>
            <div className='strategy-stat-card'>
                <p className='s-title'>Best Trade</p>
                <p className='s-value'>{strategyStats.bestTrade?.pnl ?? 0}</p>
                <p className='s-sub-title'>{strategyStats.bestTrade?.symbol ?? "Symbol"}</p>
            </div>
            <div className='strategy-stat-card'>
                <p className='s-title'>Worst Trade</p>
                <p className='s-value'>{strategyStats.worstTrade?.pnl ?? 0}</p>
                <p className='s-sub-title'>{strategyStats.worstTrade?.symbol ?? "Symbol"}</p>
            </div>
            <div className='strategy-stat-card'>
                <p className='s-title'>All Trades</p>
                <p className='s-value'>{trades.length}</p>
                <p className='s-sub-title'>No. of total trades</p>
            </div>
        </div>
    )
}

export default StrategyStats