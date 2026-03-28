import './Portfolio.css'
import { useState } from 'react'
import CryptoPortfolio from '../components/portfolio/CryptoPortfolio';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import FDPortfolio from '../components/portfolio/FDPortfolio';

function Portfolio() {

    const [selected, setSelected] = useState("summary")

    return(
        <div className='portfolio'>
            <div className='select-portfolio'>
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                    <option value="summary">Summary</option>
                    <option value="crypto">Crypto</option>
                    <option value="fd">FD</option>
                </select>
            </div>
            <div>
                {selected === "summary" && <PortfolioSummary />}
                {selected === "crypto" && <CryptoPortfolio />}
                {selected === "fd" && <FDPortfolio />}
            </div>
        </div>
    )
}

export default Portfolio