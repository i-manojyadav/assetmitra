import { useContext, useEffect, useState } from 'react'
import StatCard, { StatCardMobile } from '../ui/StatCard'
import './FDPortfolio.css'
import { v4 as uuidv4 } from 'uuid';
import AssetList, { AssetListMobile } from '../ui/AssetList';
import { FDPortfolioContext } from '../../context/FDPortfolioContext';
import TradeDetailCard from '../ui/TradeDetailCard';
import toast from 'react-hot-toast';

function FDPortfolio() {

    const { fdFolio, setFDFolio, setFDStats, fdStats } = useContext(FDPortfolioContext);

    const [ isActive, setIsActive ] = useState(false);
    const [ selectedAsset, setSelectedAsset ] = useState(null);
    const [ fd, setFD ] = useState({ bankName: "", principalAmount: "", intRate: "", startDate: "", maturityDate: "", key: uuidv4() });

    //FD TOGGLE
    function addFdToggle() {
        if (isActive === false) {
            setIsActive(true)
        }

        else {
            setIsActive(false)
        }
    }

    // HANDLE FD CHANGE
    function handleFDChange(e) {
        setFD((fd) => {
            return {...fd, [e.target.name]: e.target.value}
        });
    }

    // ON FD ADD
    function onFDAdd(e) {
        e.preventDefault();

        setFDFolio((prev) => {
            return [...prev, fd];
        })

        addFdToggle();

        setFD({ bankName: "", principalAmount: "", intRate: "", startDate: "", maturityDate: "" });

        toast.success(`FD added`);
    }

    // CALCULATE FD DETAILS
    function calculateFD(fd) {

        const start = new Date(fd.startDate);
        const end = new Date(fd.maturityDate);
        const today = new Date();

        const totalDays = (end - start) / 86400000;
        const elapsedDays = (today - start) / 86400000;
        const daysLeft = Math.max(0, (end - today) / 86400000);

        const p = Number(fd.principalAmount);
        const r = Number(fd.intRate) / 100;
        const n = 4;

        const totalYears = totalDays / 365;
        const elapsedYears = elapsedDays / 365;

        const maturityAmount = p * Math.pow((1 + r / n), n * totalYears);

        const effectiveElapsedYears = Math.min(elapsedYears, totalYears);

        const currentValue = today.getTime() >= end.getTime() ? maturityAmount : p * Math.pow((1 + r / n ), n * effectiveElapsedYears);

        const PnL = (currentValue - p);

        return {
            PnL,
            daysLeft,
            maturityAmount
        }

    }


    // SET FD PROFIT
    useEffect(() => {
        setFDFolio((prev) => 
            prev.map((fd) => {
                const { PnL, daysLeft, maturityAmount } = calculateFD(fd);
                return { ...fd, profit: PnL, daysLeft: daysLeft, maturityAmount: maturityAmount }
            })
        )

    }, [fdFolio.length]);


    //Remove FD
    function removeFD(bank, key) {
        setFDFolio(() => {
            return fdFolio.filter((fd) => {
                return fd.key != key
            });
        });

        toast.success(`FD deleted`);
    }



    return (
        <div className='fd-portfolio'>
            <div className='fd-stats'>
                <div className='stats fd-stats-desktop'>
                    <StatCard title={"Invested"} value={fdStats.invested} subTitle={"Capital deployed"} />
                    <StatCard title={"Current"} value={fdStats.current} subTitle={"Market Value"} />
                    <StatCard title={"Profit"} value={fdStats.fdProfit} subTitle={"Unrealized"} roi={fdStats.roi} isPnL={true} />
                </div>
                <div className='stats-mobile'>
                    <StatCardMobile invested={fdStats.invested} current={fdStats.current} pnl={fdStats.fdProfit} roi={fdStats.roi} />
                </div>
            </div>
            <div className='add-fd-toggle'>
                <button onClick={addFdToggle}>Add FD</button>
            </div>
            <div style={{display: isActive? "block" : "none"}} className='add-fd'>
                <div className='add-fd-form'>
                    <form onSubmit={onFDAdd}>
                        <div>
                            <input type='text' value={fd.bankName} name='bankName' onChange={handleFDChange} placeholder='Bank Name' style={{textTransform: 'uppercase'}} required />
                            <input type='number' value={fd.principalAmount} name='principalAmount' onChange={handleFDChange} placeholder='Principal Amount' style={{textTransform: 'uppercase'}} required />
                            <input type='number' value={fd.intRate} name='intRate' onChange={handleFDChange} placeholder='Interest Rate (%)' style={{textTransform: 'uppercase'}} required />
                        </div>
                        <div>
                            <label htmlFor='start-date'>Start Date:</label>
                            <input id='start-date' type='date' value={fd.startDate} name='startDate' onChange={handleFDChange} style={{textTransform: 'uppercase'}} required />
                            <label htmlFor='maturity-date'>Maturity Date:</label>
                            <input id='maturity-date' type='date' value={fd.maturityDate} name='maturityDate' onChange={handleFDChange} style={{textTransform: 'uppercase'}} required />
                            <button><i className="fa-solid fa-plus"></i>Add</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='fd-folio'>
                <AssetList th={["Bank", "Status", "Principal", "Current", "Rate", "Maturity (₹)", "Days Left", "Profit", <i className="fa-solid fa-ellipsis-vertical"></i>]} asset={
                    fdFolio.map((fd) => {
                        return (
                            <tr key={fd.key}>
                                <td>{fd.bankName}</td>
                                <td><p className='status-badge' style={{backgroundColor: fd.daysLeft > 0 ? "#92fcaf" : "#fc9992"}}> {fd.daysLeft>0? "Active" : "Matured"}</p></td>
                                <td>{Number(fd.principalAmount).toLocaleString()}</td>
                                <td>{Number(Number(Number(fd.principalAmount) + Number(fd.profit)).toFixed()).toLocaleString()}</td>
                                <td>{fd.intRate}%</td>
                                <td>{Number(Number(fd.maturityAmount).toFixed()).toLocaleString()}</td>
                                <td>{Number(fd.daysLeft).toFixed()}</td>
                                <td style={{color: "green"}}>{Number(Number(fd.profit).toFixed()).toLocaleString()}</td>
                                <td onClick={() => removeFD(fd.bankName, fd.key)}><i className="fa-regular fa-trash-can"></i></td>
                            </tr>
                        )
                    })} />
                <AssetListMobile asset={
                    fdFolio.map((fd) => {
                        return (
                            <tr className='asset-data' key={fd.key}>
                                <td className='asset-data-left'>
                                    <div className='asset-sec'><span className='asset'>{fd.bankName}</span></div>
                                    <div><span className='title'>Inv.</span> <span className='value'>{Number(fd.principalAmount).toLocaleString()}</span></div>
                                </td>
                                <td className='asset-data-right'>
                                    <div className='asset-sec'><span style={{color: "green"}} className='asset'>{Number(Number(fd.profit).toFixed(2)).toLocaleString()}</span></div>
                                    <div><span className='title'>Maturity (₹)</span> <span className='value'>{Number(fd.maturityAmount).toLocaleString()}</span></div>
                                </td>
                            </tr>
                    )})
                } />
            </div>
            <div>
                {selectedAsset && <TradeDetailCard />}
            </div>
        </div>
    )
}

export default FDPortfolio