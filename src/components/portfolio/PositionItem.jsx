import { useContext, useState } from 'react'
import './PositionItem.css'
import { CryptoPortfolioContext } from '../../context/CryptoPortfolioContext.jsx'
import toast from 'react-hot-toast';
import TradeDetailCard from '../ui/TradeDetailCard.jsx';

function PositionItem({ onAdd }) {

    const { folioCoins, setFolioCoins } = useContext(CryptoPortfolioContext);
    const [ selectedCoin, setSelectedCoin ] = useState(null);

    // EXIT POSITION
    function exitPosition(position, key) {
        setFolioCoins(folioCoins.filter((coin) => {
            return coin.key != key;
        }));

        toast.success(`${position.toUpperCase()}, Removed!`);
    }

    return (
        <div className='position-item'>
            <div className='position-item-desktop'>
                <table>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Qty</th>
                            <th>Avg</th>
                            <th>Invested</th>
                            <th>Current</th>
                            <th>LTP</th>
                            <th>P&L</th>
                            <th><i className="fa-solid fa-ellipsis-vertical"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {folioCoins.map((item) => (
                            <tr key={item.key}>
                                <td>{item.symbol.toUpperCase()}</td>
                                <td>{Number(item.qty).toLocaleString()}</td>
                                <td>{Number(item.avgBuy).toLocaleString()}</td>
                                <td>{Number(Number(item.inv).toFixed(2)).toLocaleString()}</td>
                                <td>{Number(Number(item.cur).toFixed(2)).toLocaleString()}</td>
                                <td>{Number(Number(item.ltp).toFixed(2)).toLocaleString()}</td>
                                <td style={{color: item.pnl > 0 ? "green" : "red"}}>{Number(Number(item.pnl).toFixed(2)).toLocaleString()} ({(((item.pnl/item.inv)*100).toFixed(2)).toLocaleString()}%)</td>
                                <td onClick={() => {exitPosition(item.symbol, item.key)}}><i className="fa-regular fa-trash-can"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='position-item-mobile'>
                <table>
                    <tbody>
                        {folioCoins.map((item) => (
                            <tr onClick={() => setSelectedCoin(item)} className='pim' key={item.key}>
                                <td className='pim-left'>
                                    <div className='asset-div'><span className='asset'>{item.symbol.toUpperCase()}</span></div>
                                    <div><span className='title'>Qty.</span> <span className='value'>{Number(item.qty).toLocaleString()}</span> | <span className='title'>Avg.</span> <span className='value'>{Number(item.avgBuy).toLocaleString()}</span></div>
                                </td>
                                <td className='pim-right'>
                                    <div className='asset-div'><span style={{color: item.pnl > 0 ? "green" : "red"}} className='asset'>{Number(Number(item.pnl).toFixed(2)).toLocaleString()} ({(((item.pnl/item.inv)*100).toFixed(2)).toLocaleString()}%)</span></div>
                                    <div><span className='title'>LTP</span> <span className='value'>{Number(Number(item.ltp).toFixed(2)).toLocaleString()}</span></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                {selectedCoin && <TradeDetailCard coin={selectedCoin} onAdd={onAdd} onExit={() => exitPosition(selectedCoin.symbol, selectedCoin.key)} onClose={() => setSelectedCoin(null)} />}
            </div>
        </div>
    )
}

export default PositionItem