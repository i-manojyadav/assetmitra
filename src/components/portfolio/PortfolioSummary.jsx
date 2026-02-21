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
                <TradeInsightCard icon={"fa-solid fa-arrow-up-right-dots"} color={"#beffbe"} cardTitle={"Best Performers"} trades={
                    gainers.map((gainer) => (
                        <tr>
                            <td>{gainer.symbol.toUpperCase()}</td>
                            <td>{Number(gainer.ltp.toFixed()).toLocaleString()}</td>
                            <td style={{color: "green"}}>{Number(gainer.pnl.toFixed(2)).toLocaleString()} ({Number(((gainer.pnl/gainer.inv)*100).toFixed(2)).toLocaleString()}%)</td>
                        </tr>
                    ))
                } />

                <TradeInsightCard icon={"fa-solid fa-arrow-trend-down"} color={"#ffb3b3"} cardTitle={"Worst Performers"} trades={
                    losers.map((loser) => (
                        <tr>
                            <td>{loser.symbol.toUpperCase()}</td>
                            <td>{Number(loser.ltp.toFixed()).toLocaleString()}</td>
                            <td style={{color: "red"}}>{Number(loser.pnl.toFixed(2)).toLocaleString()} ({Number(((loser.pnl/loser.inv)*100).toFixed(2)).toLocaleString()}%)</td>
                        </tr>
                    ))
                } />
            </div>
        </div>
    )
}