import { useContext, useEffect, useState } from 'react';
import StatCard, { StatCardMobile } from '../../../ui/StatCard';
import './PortfolioStats.css'
import { CryptoPortfolioContext } from '../../../../context/CryptoPortfolioContext';
import { FDPortfolioContext } from '../../../../context/FDPortfolioContext';

function PortfolioStats() {

    const { cryptoStats } = useContext(CryptoPortfolioContext);
    const { fdStats } = useContext(FDPortfolioContext);

    const [ active, setActive ] = useState("summary");
    const [ portfolioStats, setPortfolioStats ] = useState([]);


    // ON CHANGE
    function handleChange(e) {
        setActive(e.target.value);
    }

    useEffect(() => {
        const cryptoInvested = Number(cryptoStats.invested);
        const cryptoCurrent = Number(cryptoStats.current);
        const cryptoPnL = Number(cryptoStats.pnl);
        const cryptoROI = Number(cryptoStats.roi);

        const fdInvested = Number(fdStats.invested);
        const fdCurrent = Number(fdStats.current);
        const fdProfit = Number(fdStats.fdProfit);
        const fdRoi = Number(fdStats.roi);

        const invested = cryptoInvested + fdInvested;
        const current = cryptoCurrent + fdCurrent;
        const pnl = cryptoPnL + fdProfit;
        const roi = (pnl / invested) * 100;

        if(active === "summary") {
            setPortfolioStats({invested: invested, current: current, pnl: pnl, roi: roi});
        } else if (active === "crypto") {
            setPortfolioStats({invested: cryptoInvested, current: cryptoCurrent, pnl: cryptoPnL, roi: cryptoROI});
        } else if (active === "fd") {
            setPortfolioStats({invested: fdInvested, current: fdCurrent, pnl: fdProfit, roi: fdRoi});
        } else {
            setPortfolioStats([]);
        }

    }, [active]);


    return(
        <div className='portfolio-stats'>
            <div className='select-folio'>
                <label style={{color: active === "summary" ? "#008000" : "#ffffff47"}}><input type='radio' value='summary' name='stats' onChange={handleChange} checked={active === "summary"} />Summary</label>
                <label style={{color: active === "crypto" ? "#008000" : "#ffffff47"}}><input type='radio' value='crypto' name='stats' onChange={handleChange} />Crypto</label>
                <label style={{color: active === "fd" ? "#008000" : "#ffffff47"}}><input type='radio' value='fd' name='stats' onChange={handleChange} />FD</label>
            </div>

            <div>
                <div className='stats stats-desktop'>
                    <StatCard title={"Invested"} value={portfolioStats.invested} subTitle={"Capital deplpoyed"} />
                    <StatCard title={"Current"} value={portfolioStats.current} subTitle={"Market Value"} />
                    <StatCard title={"Profit & Loss"} value={portfolioStats.pnl} subTitle={"Unrealized"} roi={portfolioStats.roi} isPnL={true} />
                </div>

                <div className='stats-mobile'>
                    <StatCardMobile invested={portfolioStats.invested} current={portfolioStats.current} pnl={portfolioStats.pnl} roi={portfolioStats.roi} />
                </div>
            </div>
        </div>
    )
}

export default PortfolioStats;