import './HomeContent.css'
import FeatureCard from '../components/ui/FeatureCard'

function HomeContent() {
    return (
        <section className='home-content'>
        <div className='home'>
            <h1>AssetMitra</h1>
            <h2>Turn Trades Into Insights</h2>
            <button>Explore Services</button>
        </div>
        <div className='services'>
            <h2>Services</h2>
            <p>Services and Tools We Offer</p>
            <div>
                <h3>Portfolio Tracking</h3>
                <div className='features'>
                    <FeatureCard icon="fa-solid fa-chart-simple" title="Stocks" desc="Monitor Daily Gains and Overall Returns."/>
                    <FeatureCard icon="fa-brands fa-bitcoin" title="Crypto" desc="Track Profit/Loss Across Multiple Coins."/>
                    <FeatureCard icon="fa-solid fa-seedling" title="FDs & SIPs" desc="Monitor FDs & SIPs for Long-term Growth."/>
                </div>
            </div>
            <div>
                <h3>Journal</h3>
                <div className='features'>
                    <FeatureCard icon="fa-solid fa-file-lines" title="Trade Records" desc="Add/Edit/Delete Trades, Types, etc."/>
                    <FeatureCard icon="fa-solid fa-magnifying-glass-chart" title="Analytics" desc="Trades, Charges, Profit & Loss, etc."/>
                    <FeatureCard icon="fa-regular fa-hourglass-half" title="Open Positions" desc="Stop Loss and Target Monitoring, Status, etc."/>
                </div>
            </div>
        </div>
        </section>
    )
}

export default HomeContent