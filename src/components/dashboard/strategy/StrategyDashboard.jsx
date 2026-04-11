import { useContext, useState } from 'react';
import { StrategyContext } from '../../../context/StrategyContext';
import './StrategyDashboard.css'
import StrategyStats from '../../strategy/StrategyStats';
import StrategyPerformers from './components/StrategyPerformers';
import { JournalContext } from '../../../context/JournalContext';

function StrategyDashboard() {

    const { journals } = useContext(JournalContext);
    const { strategies } = useContext(StrategyContext);

    const [ strategyTrades, setStrategyTrades ] = useState([]);
    const [ activeStrategy, setActiveStrategy ] = useState(null);

    // FILTER TRADES

    return (
        <div className='strategy-dashboard'>
            <div className='strategies'>
                {strategies.map((strategy) => {
                    return (
                        <div key={strategy.key} className={strategy.key === activeStrategy?.key ? "strategy-card-active" : "strategy-card"} onClick={() => setActiveStrategy(strategy)}>
                            <div className='strategy-info'>
                                <p className='strategy-name'>{strategy.name.toUpperCase()}</p>
                                <p className='badge'>RR = 1:{Number(Number(strategy.target) / Number(strategy.stopLoss)).toFixed()}</p>
                            </div>
                            <div className='strategy-action'>
                                <p className='strategy-created-at'><i className="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;{strategy.createdAt.toDateString()}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='strategy-stats'>
                {activeStrategy && <StrategyStats strategy={activeStrategy} />}
            </div>
            <div>
                <h2>Performers</h2>
                <StrategyPerformers />
            </div>
        </div>
    )
}

export default StrategyDashboard;