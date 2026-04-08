import { useContext, useEffect, useState } from 'react';
import './JournalStats.css'
import StatCard from '../ui/StatCard';

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
        <div className='stats'>
            <StatCard title={"Invested"} value={journalStats.invested} subTitle={"Capital deployed"} />
            <StatCard title={"Gross P&L"} value={journalStats.grossPnL} subTitle={"Before charges"} />
            <StatCard title={"Net P&L"} value={journalStats.netPnL} subTitle={"After charges"} roi={journalStats.roi} isPnL={true} />
            <StatCard title={"Win Rate"} value={journalStats.winRate} subTitle={"Win Rate (%)"} isWinRate={true} />
            <StatCard title={"Total Trades"} value={trades.length} subTitle={"No. of total trades"} />
            <StatCard title={"Charges"} value={journalStats.charges} subTitle={"Brokerage & Taxes"} />
        </div>
    )
}

export default JournalStats;