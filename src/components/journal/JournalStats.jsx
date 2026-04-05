import { useContext, useEffect, useState } from 'react';
import './JournalStats.css'

function JournalStats({ trades }) {

    const [ journalStats, setJournalStats ] = useState([]);

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

        const calWinRate = (trades) => {

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


        const invested = trades.reduce((sum, trade) => {
            return sum + (Number(trade.entryPrice) * Number(trade.qty));
        }, 0);

        const roi = (netPnL / invested) * 100;

        setJournalStats(() => {
            return { grossPnL: grossPnL, netPnL: netPnL, roi: roi, winRate: winRate, invested: invested, charges: charges }
        });
        
    }, [trades.length]);



    return (
        <div className='journal-stats'>
            <div className='journal-stat-card'>
                <p className='trade-title'>Gross P&L</p>
                <p className='trade-value'>{Number(journalStats.grossPnL).toLocaleString()}</p>
                <p className='sub-title'>Before Charges</p>
            </div>
            <div className='journal-stat-card'>
                <p className='trade-title'>Net P&L</p>
                <p className='trade-value'>{Number(journalStats.netPnL).toLocaleString()} <span className='stat-roi-badge'>({Number(Number(journalStats.roi).toFixed(2)).toLocaleString()}%)</span></p>
                <p className='sub-title'>After all charges</p>
            </div>
            <div className='journal-stat-card'>
                <p className='trade-title'>Win Rate</p>
                <p className='trade-value'>{(Number(journalStats.winRate).toFixed(2)).toLocaleString()}%</p>
                <p className='sub-title'>Win Rate %</p>
            </div>
            <div className='journal-stat-card'>
                <p className='trade-title'>Total Trades</p>
                <p className='trade-value'>{Number(trades.length).toLocaleString()}</p>
                <p className='sub-title'>No. of total trades</p>
            </div>
            <div className='journal-stat-card'>
                <p className='trade-title'>Total Invested</p>
                <p className='trade-value'>{Number(journalStats.invested).toLocaleString()}</p>
                <p className='sub-title'>Capital deployed</p>
            </div>
            <div className='journal-stat-card'>
                <p className='trade-title'>Total Charges</p>
                <p className='trade-value'>{Number(journalStats.charges).toLocaleString()}</p>
                <p className='sub-title'>Brokerage + STT, etc.</p>
            </div>
        </div>
    )
}

export default JournalStats;