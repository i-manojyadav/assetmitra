import './Portfolio.css'
import { useState } from 'react'
import StockPortfolio from '../components/portfolio/StockPortfolio';
import CryptoPortfolio from '../components/portfolio/CryptoPortfolio';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';

function Portfolio() {

    const [selected, setSelected] = useState("summary")

    return(
        <div className='portfolio'>
            <div className='select-portfolio'>
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                    <option value="summary">Summary</option>
                    <option value="crypto">Crypto</option>
                    <option value="stocks">Stocks</option>
                </select>
            </div>
            <div>
                {selected === "summary" && <PortfolioSummary />}
                {selected === "crypto" && <CryptoPortfolio />}
                {selected === "stocks" && <StockPortfolio />}
            </div>
        </div>
    )
}

export default Portfolio