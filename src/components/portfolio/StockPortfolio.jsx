import './StockPortfolio.css'
import StatCard from '../ui/StatCard'

export default function StockPortfolio() {
    return (
        <div className='stock-portfolio'>
            <div className='stocks-stats'>
                <StatCard title="Invested" value="25000" />
                <StatCard title="Current" value="25000" />
                <StatCard title="Profit & Loss" value="25000" />
            </div>
        </div>
    )
}