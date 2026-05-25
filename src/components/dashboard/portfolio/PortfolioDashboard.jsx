import { useContext } from 'react';
import AssetAllocation from './components/AssetAllocation';
import Performers from './components/Performers';
import PortfolioStats from './components/PortfolioStats';
import './PortfolioDashboard.css'
import { CryptoPortfolioContext } from '../../../context/CryptoPortfolioContext';
import { FDPortfolioContext } from '../../../context/FDPortfolioContext';
import EmptyState from '../../ui/EmptyState';

function PortfolioDashboard() {

    const { cryptoStats } = useContext(CryptoPortfolioContext);
    const { fdStats } = useContext(FDPortfolioContext);

    return (
        <div className='portfolio-dashboard'>
            {cryptoStats.invested != 0 || fdStats.invested != 0 ? <div>
                <PortfolioStats />
            </div> : <EmptyState msg={{title: "Empty Portfolio", desc: "Add Crypto Coin or FD first"}} />}

            {cryptoStats.invested != 0 || fdStats.invested != 0 ? <div>
                <h2>Asset Allocation</h2>
                <AssetAllocation />
            </div> : null}

            {cryptoStats.invested != 0 || fdStats.invested != 0 ? <div>
                <h2>Performers</h2>
                <Performers />
            </div> : null}
        </div>
    )
}

export default PortfolioDashboard;