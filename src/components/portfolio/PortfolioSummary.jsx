import './PortfolioSummary.css'
import StatCard from '../ui/StatCard'

export default function PortfolioSummary() {
    return (
        <div className='portfolio-summary'>
            <StatCard title={"Invested"} value={50000} />
            <StatCard title={"Current"} value={75000} />
            <StatCard title={"Profit & Loss"} value={"50%"} />
        </div>
    )
}