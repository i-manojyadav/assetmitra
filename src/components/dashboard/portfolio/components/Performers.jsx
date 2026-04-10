import { useContext, useEffect, useState } from 'react';
import { CryptoPortfolioContext } from '../../../../context/CryptoPortfolioContext';
import './Performers.css'
import { FDPortfolioContext } from '../../../../context/FDPortfolioContext';

function Performers() {

    const { folioCoins } = useContext(CryptoPortfolioContext);
    const { fdFolio } = useContext(FDPortfolioContext);

    const [ active, setActive ] = useState("crypto");
    const [ topPerformers, setTopPerformers ] = useState([]);
    const [ worstPerformers, setWorstPerformers ] = useState([]);

    console.log(fdFolio);
    console.log(folioCoins);

    function handleChange(e) {
        setActive(e.target.value);
    }

    useEffect(() => {
        if(active === "crypto") {
            const sortedCoins = folioCoins.sort((coin, item) => {
                return Number(item.pnl) - Number(coin.pnl);
            });

            setTopPerformers(sortedCoins.filter((coin) => {
                return Number(coin.pnl) > 0;
            }));

            setWorstPerformers(sortedCoins.filter((coin) => {
                return Number(coin.pnl) < 0;
            }));

        } else if (active === "fd") {
            const sortedFD = fdFolio.sort((fd, item) => {
                return Number(item.profit) - Number(fd.profit);
            });

            setTopPerformers(sortedFD.filter((fd) => {
                return Number(fd.profit) > 0;
            }));

            setWorstPerformers(sortedFD.filter((fd) => {
                return Number(fd.profit) < 0;
            }));
        }
    }, [active]);



    return (
        <div className='asset-performers'>
            <div className='select-asset'>
                <label style={{color: active === "crypto" ? "#008000" : "#ffffff47"}}><input type='radio' value='crypto' name='performer' onChange={handleChange} checked={active === "crypto"} />Crypto</label>
                <label style={{color: active === "fd" ? "#008000" : "#ffffff47"}}><input type='radio' value='fd' name='performer' onChange={handleChange} />FD</label>
            </div>

            <div className='selected-performers'>
                <div className='top-performers'>
                    <p className='performer-title'>Top Performers</p>
                    {topPerformers.length ? topPerformers.map((performer) => (
                        <p style={{color: "#f0f0f0"}} className='performer-item'><span>{performer.symbol ?? performer.bankName}</span> <span style={{color: "#008000"}}>{Number(Number(performer.pnl ?? performer.profit).toFixed(1)).toLocaleString()} ({Number((((Number(performer.pnl ?? performer.profit))/Number(performer.inv ?? performer.principalAmount)) * 100).toFixed(1)).toLocaleString()}%)</span></p>
                    )) : <p>No assets found</p>}
                </div>

                <div className='worst-performers'>
                    <p className='performer-title'>Worst Performers</p>
                    {worstPerformers.length? worstPerformers.map((performer) => (
                        <p style={{color: "#f0f0f0"}} className='performer-item'><span>{performer.symbol ?? performer.bankName}</span> <span style={{color: "#ff0000"}}>{Number(Number(performer.pnl ?? performer.profit).toFixed(2)).toLocaleString()} ({Number((((Number(performer.pnl ?? performer.profit))/Number(performer.inv ?? performer.principalAmount)) * 100).toFixed(1)).toLocaleString()}%)</span></p>
                    )) : <p>No assets found</p>}
                </div>
            </div>
        </div>
    )
}

export default Performers;