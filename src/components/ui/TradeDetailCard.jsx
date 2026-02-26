import { useState } from 'react'
import './TradeDetailCard.css'

function TradeDetailCard( { coin, onAdd, onExit, onClose } ) {

    return (
        <div className='trade-detail-card'>
            <div className='asset-cont'>
                <div className='asset-info'>
                    <p>{coin.symbol.toUpperCase()}</p>
                </div>
                <div className='close-card'>
                    <button onClick={onClose} ><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div className='asset-btn'>
                <button onClick={onAdd}>Add</button>
                <button onClick={onExit}>Remove</button>
            </div>
            <div className='investment'>
                <div className='investment-value'>
                    <div className='invested'>
                        <p className='asset-title'>Invested</p>
                        <p className='asset-value'>{Number(coin.inv).toLocaleString()}</p>
                    </div>
                    <div className='current'>
                        <p className='asset-title'>Current</p>
                        <p className='asset-value'>{Number(Number(coin.cur).toFixed(2)).toLocaleString()}</p>
                    </div>
                    <div className='pnl'>
                        <p className='asset-title'>P&L</p>
                        <p className='asset-value' style={{color: coin.pnl > 0 ? "green" : "red"}}>{Number(Number(coin.pnl).toFixed(2)).toLocaleString()} ({(((coin.pnl/coin.inv)*100).toFixed(2)).toLocaleString()}%)</p>
                    </div>
                </div>
                <div className='investment-change'>
                    <div>
                        <p className='asset-title'>Quantity</p>
                        <p className='asset-value'>{Number(coin.qty).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className='asset-title'>Avg Buy Price</p>
                        <p className='asset-value'>{Number(coin.avgBuy).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className='asset-title'>Last Traded Price</p>
                        <p className='asset-value'>{Number(coin.ltp).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeDetailCard