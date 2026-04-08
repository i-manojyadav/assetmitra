import { useContext, useEffect, useState } from 'react'
import './StrategyStats.css'
import { JournalContext } from '../../context/JournalContext';
import StatCard from '../ui/StatCard';

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

            const side = trade.side.toLowerCase() === "buy" ? 1 : -1;

            const pnl = (exit - entry) * qty * side;

            return sum + pnl;
        }, 0);

        const charges = trades.reduce((sum, trade) => {
            return sum + Number(trade.charges);
        }, 0);

        const netPnL = grossPnL - charges;

        const invested = trades.reduce((sum, trade) => {
            return sum + (Number(trade.entryPrice) * Number(trade.qty));
        }, 0);

        const roi = (netPnL / invested) * 100;

        const calWinRate = (trade) => {
            if (trades.length === 0) {
                return 0;
            }

            const wins = trades.reduce((sum, trade) => {
                const entry = Number(trade.entryPrice);
                const exit = Number(trade.exitPrice);
                const qty = Number(trade.qty);

                const side = trade.side?.toLowerCase() === "buy" ? 1 : -1;

                const pnl = (exit -entry) * qty * side;

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
            const charges = Number(trade.charges);
            const side = trade.side.toLowerCase();

            if (side === "buy") {
                return ((exit - entry) * qty) - charges;
            } else if(side === "sell") {
                return ((entry - exit ) * qty) - charges;
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


        setStrategyStats(() => {
            return { netPnL: netPnL, roi: roi, charges: charges, winRate: winRate, bestTrade: bestTrade, worstTrade: worstTrade }
        });

    }, [trades.length])


    return (
        <>
        <div className='strategy-details'>
            <div>
                <p className='strategy-title'>{strategy.name}</p>
                <span className='badge'>{strategy.side}</span>
                <span className='badge'>{strategy.type}</span>
                <span className='badge'>{strategy.market}</span>
            </div>
            <div>
                <p><span style={{color: "#6b6b6b"}}>Target: </span><span>{strategy.target}%</span> | <span style={{color: "#6b6b6b"}}>Stop Loss: </span><span>{strategy.stopLoss}%</span></p>
                <p><span style={{color: "#6b6b6b"}}>Notes: </span> <span>{strategy.notes}</span></p>
            </div>
        </div>
        <div className='stats'>
            <StatCard title={"Net P&L"} value={strategyStats.netPnL} subTitle={"After charges"} roi={strategyStats.roi} isPnL={true}/>
            <StatCard title={"Win Rate"} value={strategyStats.winRate} subTitle={"Win Rate %"} isWinRate={true} />
            <StatCard title={"Charges"} value={strategyStats.charges} subTitle={"Brokerage & Taxes"} />
            <StatCard title={"Best Trade"} value={strategyStats.bestTrade?.pnl} subTitle={strategyStats.bestTrade?.symbol ?? "Symbol"} />
            <StatCard title={"Worst Trade"} value={strategyStats.worstTrade?.pnl} subTitle={strategyStats.worstTrade?.symbol ?? "Symbol"} />
            <StatCard title={"Trades"} value={trades.length} subTitle={"No. of total trades"} />
        </div>
        </>
    )
}

export default StrategyStats