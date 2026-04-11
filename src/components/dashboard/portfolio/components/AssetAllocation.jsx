import { useContext, useEffect, useState } from 'react';
import './AssetAllocation.css'
import { PieChart, Pie, Tooltip } from 'recharts';
import { CryptoPortfolioContext } from '../../../../context/CryptoPortfolioContext';
import { FDPortfolioContext } from '../../../../context/FDPortfolioContext';

function AssetAllocation() {

    const { folioCoins } = useContext(CryptoPortfolioContext);
    const { fdFolio } = useContext(FDPortfolioContext);

    const [ active, setActive ] = useState("crypto");
    const [ data, setData ] = useState([]);
    

    // HANDLE CHANGE
    function handleChange(e) {
        setActive(e.target.value);
    }

    const colors = ["#00e5a0", "#ff4560", "#00d9ff", "#ffd700", "#ff6b35", "#9d4edd", "#3a86ff", "#39ff14", "#ff006e", "#00b4d8"];

    useEffect(() => {

        const cryptoCurrentValue = folioCoins.reduce((sum, coin) => {
            return sum + (Number(coin.qty) * Number(coin.ltp));
        }, 0);

        const fdCurrentValue = fdFolio.reduce((sum, fd) => {
            return sum + (Number(fd.principalAmount) + Number(fd.profit));
        }, 0);

        if (active === "crypto") {
            setData(folioCoins.map((coin, index) => ({
                name: coin.symbol.toUpperCase(),
                value: ((Number(coin.qty) * Number(coin.ltp)) / cryptoCurrentValue) * 100,
                fill: colors[index % colors.length]
            })));
        } else if (active === "fd") {
            setData(fdFolio.map((fd, index) => ({
                name: fd.bankName.toUpperCase(),
                value: ((Number(fd.principalAmount) + Number(fd.profit)) / fdCurrentValue) * 100,
                fill: colors[index % colors.length]
            })));
        } else {
            setData([]);
        }

    }, [active]);


    return (
        <div className='asset-allocation'>
            <div className='select-asset'>
                <label>Current Value:</label>
                <label style={{color: active === "crypto" ? "#008000" : "#ffffff47"}}><input type='radio' value='crypto' name='asset' onChange={handleChange} checked={active === "crypto"} />Crypto</label>
                <label style={{color: active === "fd" ? "#008000" : "#ffffff47"}}><input type='radio' value='fd' name='asset' onChange={handleChange} />FD</label>
            </div>

            <div className='selected-asset'>
                <div className='selected-asset-chart'>
                    <PieChart width='100%' height='250px'>
                        <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        innerRadius="50%"
                        />
                        <Tooltip />
                    </PieChart>
                </div>
                <div className='selected-asset-list'>
                    {data.map((asset) => (
                        <p className='asset-items'><span style={{color: asset.fill}}>{asset.name}</span> <span>{Number(Number(asset.value).toFixed(2)).toLocaleString()}%</span></p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AssetAllocation;