import './Portfolio.css'
import { useState } from 'react'
import CryptoPortfolio from '../components/portfolio/CryptoPortfolio';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import FDPortfolio from '../components/portfolio/FDPortfolio';

function Portfolio() {

    const [ active, setActive ] = useState("summary");

    return(
        <div className='portfolio'>
            <div className='tab-btns'>
                <button className={active === "summary" ? "tab-active-btn" : ""} onClick={() => setActive("summary")}>Summary</button>
                <button className={active === "crypto" ? "tab-active-btn" : ""} onClick={() => setActive("crypto")}>Crypto</button>
                <button className={active === "fd" ? "tab-active-btn" : ""} onClick={() => setActive("fd")}>FD</button>
            </div>
            <div className='tab-content'>
                {active === "summary" && <PortfolioSummary />}
                {active === "crypto" && <CryptoPortfolio />}
                {active === "fd" && <FDPortfolio />}
            </div>
        </div>
    )
}

export default Portfolio