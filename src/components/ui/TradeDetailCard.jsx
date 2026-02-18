import { useState } from 'react'
import './TradeDetailCard.css'

function TradeDetailCard( {asset} ) {

    const [isActive, setIsActive] = useState(true);


    return (
        isActive && (<div className='trade-detail-card'>
            <div className='asset'>
                <div className='asset-info'>
                    <p>{asset}</p>
                    <p>BTCUSDT</p>
                </div>
                <div className='close-card'>
                    <button onClick={() => setIsActive(false)} >X</button>
                </div>
            </div>
            <div className='asset-btn'>
                <button>Add</button>
                <button>Exit</button>
            </div>
            <div className='investment'>
                <div className='investment-value'>
                    <div className='invested'>
                        <p>Invested</p>
                        <p>Rs. 500</p>
                    </div>
                    <div className='current'>
                        <p>Current</p>
                        <p>Rs. 550</p>
                    </div>
                    <div className='pnl'>
                        <p>P&L</p>
                        <p>Rs. 50</p>
                    </div>
                </div>
                <div className='investment-change'>
                    <div>
                        <p>Qty.</p>
                        <p>650</p>
                    </div>
                    <div>
                        <p>Avg Price</p>
                        <p>32</p>
                    </div>
                    <div>
                        <p>Day's P&L</p>
                        <p>50</p>
                    </div>
                </div>
            </div>
        </div>)
    )
}

export default TradeDetailCard