import './PortfolioSummary.css'
import StatCard, {StatCardMobo} from '../ui/StatCard'
import TradeInsightCard from '../ui/TradeInsightCard'
import { useContext } from 'react'
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext'

export default function PortfolioSummary() {

    const { folioCoins, cryptoStats } = useContext(CryptoPortfolioContext);

    return (
        <div className='portfolio-summary'>
            <div className='summary-stats'>
                <div className='summary-stats-desk'>
                    <StatCard title={"Invested"} value={cryptoStats.invested} />
                    <StatCard title={"Current"} value={cryptoStats.current} />
                    <StatCard title={"Profit & Loss"} value={cryptoStats.pnl} color={true} />
                </div>
                <div className='summary-stats-mobo'>
                    <StatCardMobo invested={cryptoStats.invested} current={cryptoStats.current} pnl={cryptoStats.pnl} roi={cryptoStats.roi} color={true} />
                </div>
            </div>
            <div className='trade-insights'>
                <TradeInsightCard icon={"fa-solid fa-arrow-up-right-dots"} cardTitle={"Gainers"} trades={
                    folioCoins.map((trade) => (
                        <tr>
                            <td>{trade.symbol}</td>
                            <td>{trade.cur}</td>
                        </tr>
                    ))
                } />

                <TradeInsightCard icon={"fa-solid fa-arrow-trend-down"} cardTitle={"Losers"} trades={
                    folioCoins.map((trade) => (
                        <tr>
                            <td>{trade.symbol}</td>
                            <td>{trade.ltp}</td>
                        </tr>
                    ))
                } />
            </div>
        </div>
    )
}