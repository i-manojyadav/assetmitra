import AssetAllocation from './components/AssetAllocation';
import Performers from './components/Performers';
import PortfolioStats from './components/PortfolioStats';
import './PortfolioDashboard.css'

function PortfolioDashboard() {
    return (
        <div className='portfolio-dashboard'>
            <div>
                <PortfolioStats />
            </div>

            <div>
                <h2>Asset Allocation</h2>
                <AssetAllocation />
            </div>

            <div>
                <h2>Performers</h2>
                <Performers />
            </div>
        </div>
    )
}

export default PortfolioDashboard;