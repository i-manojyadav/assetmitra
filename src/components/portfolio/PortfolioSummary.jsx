import './PortfolioSummary.css'
import StatCard, {StatCardMobo} from '../ui/StatCard'
import TradeInsightCard from '../ui/TradeInsightCard'
import { useContext, useEffect, useState } from 'react'
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext'

export default function PortfolioSummary() {

    const { folioCoins, cryptoStats } = useContext(CryptoPortfolioContext);

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);

    useEffect(() => {
        const gainers = folioCoins.filter((gainer) => {
            return gainer.pnl > 0;
        })

        setGainers(gainers);

        const losers = folioCoins.filter((loser) => {
            return loser.pnl < 0;
        })

        setLosers(losers);
        
    }, [folioCoins]);


    return (
        <div className='portfolio-summary'>
            <div className='summary-stats'>
                <div className='summary-stats-desk'>
                    <StatCard title={"Invested"} value={cryptoStats.invested} />
                    <StatCard title={"Current"} value={cryptoStats.current} />
                    <StatCard title={"Profit & Loss"} value={cryptoStats.pnl} roi={cryptoStats.roi} color={true} />
                </div>
                <div className='summary-stats-mobo'>
                    <StatCardMobo invested={cryptoStats.invested} current={cryptoStats.current} pnl={cryptoStats.pnl} roi={cryptoStats.roi} color={true} />
                </div>
            </div>
            <div className='trade-insights'>
                <TradeInsightCard cardTitle={"Best Performers"} th={["Asset", "LTP", "P&L"]} trades={
                    gainers.map((gainer) => (
                        <tr key={gainer.key}>
                            <td>{gainer.symbol.toUpperCase()}</td>
                            <td>{Number(gainer.ltp.toFixed(2)).toLocaleString()}</td>
                            <td style={{color: "green"}}>{Number(gainer.pnl.toFixed(2)).toLocaleString()} ({Number(((gainer.pnl/gainer.inv)*100).toFixed(2)).toLocaleString()}%)</td>
                        </tr>
                    ))
                } />

                <TradeInsightCard cardTitle={"Worst Performers"} th={["Asset", "LTP", "P&L"]} trades={
                    losers.map((loser) => (
                        <tr key={loser.key}>
                            <td>{loser.symbol.toUpperCase()}</td>
                            <td>{Number(loser.ltp.toFixed(2)).toLocaleString()}</td>
                            <td style={{color: "red"}}>{Number(loser.pnl.toFixed(2)).toLocaleString()} ({Number(((loser.pnl/loser.inv)*100).toFixed(2)).toLocaleString()}%)</td>
                        </tr>
                    ))
                } />

                <TradeInsightCard cardTitle={"Asset Allocation"} th={["Asset", "Invested", "Allocation %"]} trades={
                    folioCoins.map((coin) => (
                        <tr key={coin.key}>
                            <td>{coin.symbol.toUpperCase()}</td>
                            <td>{Number(coin.inv.toFixed(2)).toLocaleString()}</td>
                            <td>{Number(((coin.inv / cryptoStats.invested) * 100).toFixed(2)).toLocaleString()}%</td>
                        </tr>
                    ))
                }/>
            </div>
        </div>
    )
}