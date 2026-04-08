import './PortfolioSummary.css'
import StatCard, {StatCardMobo} from '../ui/StatCard'
import TradeInsightCard from '../ui/TradeInsightCard'
import { useContext, useEffect, useState } from 'react'
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext'
import { FDPortfolioContext } from '../../context/FDPortfolioContext'

export default function PortfolioSummary() {

    const { folioCoins, cryptoStats } = useContext(CryptoPortfolioContext);
    const { fdFolio, fdStats } = useContext(FDPortfolioContext);

    const [ asset, setAsset ] = useState([]);
    const [ gainers, setGainers ] = useState([]);
    const [ losers, setLosers ] = useState([]);


    useEffect(() => {
        const assetInv = Number(fdStats.invested) + Number(cryptoStats.invested);
        const assetPnL = Number(fdStats.fdProfit) + Number(cryptoStats.pnl);
        const assetCur = Number(fdStats.current) + Number(cryptoStats.current);
        const assetROI = (Number(assetPnL) / Number(assetInv)) * 100;

        setAsset(() => {
            return { invested: assetInv, current: assetCur, pnl: assetPnL, roi: assetROI }
        });

    }, [folioCoins]);


    useEffect(() => {
        const gainers = folioCoins.filter((gainer) => {
            return gainer.pnl > 0;
        });

        setGainers(gainers);

        const losers = folioCoins.filter((loser) => {
            return loser.pnl < 0;
        })

        setLosers(losers);
        
    }, [folioCoins]);


    return (
        <div className='portfolio-summary'>
            <div className='summary-stats'>
                <div className='summary-stats-desk'>
                    <StatCard title={"Invested"} value={Number(asset.invested)} subTitle={"Capital deployed"} />
                    <StatCard title={"Current"} value={Number(asset.current)} subTitle={"Market Value"} />
                    <StatCard title={"Profit & Loss"} value={Number(asset.pnl)} subTitle={"Unrealized"} roi={Number(asset.roi)} isPnL={true} />
                </div>
                <div className='summary-stats-mobo'>
                    <StatCardMobo invested={Number(asset.invested)} current={Number(asset.current)} pnl={Number(asset.pnl)} roi={Number(asset.roi)} color={true} />
                </div>
            </div>
        </div>
    )
}