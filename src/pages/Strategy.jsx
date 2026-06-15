import { useContext, useState } from 'react';
import './Strategy.css'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { StrategyContext } from '../context/StrategyContext';
import StrategyStats from '../components/strategy/StrategyStats';

function Strategy() {

    const [createStrategy, setCreateStrategy ] = useState({
        name: "",
        side: "",
        target: "",
        stopLoss: "",
        type: "",
        market: "",
        notes: "",
        key: uuidv4(),
        createdAt: new Date()
    });

    const { strategies, setStrategies } = useContext(StrategyContext);
    
    const [ selectedStrategy, setSelectedStrategy ] = useState(null);
    const [ isActive, setIsActive ] = useState(false);

    //TOGGLE 
    function toggle() {
        if (isActive === false) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    // HANDLE CREATE JOURNAL
    function handleChange(e) {
        setCreateStrategy((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    }

    // ON SUBMIT (CREATE STRATEGY)
    function onCreate(e) {
        e.preventDefault();

        setStrategies((prev) => {
            return [...prev, createStrategy]
        });

        toast.success(`Strategy added`);

        toggle();

        setCreateStrategy({
            name: "",
            side: "",
            target: "",
            stopLoss: "",
            type: "",
            market: "",
            notes: "",
            key: uuidv4(),
            createdAt: new Date()
        })

    }

    // DELETE STRATEGY
    function deleteStrategy(key) {
        const confirm = window.confirm("Are you sure you want to delete this strategy?");
        if (confirm) {
            setStrategies(strategies.filter((strategy) => {
                return strategy.key !== key;
            }));

            toast.success("Strategy deleted");
        }

    }

    return (
        <div className='strategy'>
            <div className='create-strategy'>
                <button style={{display: isActive? "none" : "block"}} onClick={() => toggle()}><i className="fa-solid fa-plus"></i> Strategy</button>
            </div>

            <div style={{display: isActive? "block" : "none"}} className='strategy-form'>
                <form onSubmit={onCreate}>
                    <div className='strategy-name-price'>
                        <input type='text' placeholder='Strategy Name' style={{textTransform: 'uppercase'}} value={createStrategy.name} name='name' onChange={handleChange} required />
                        <input type='number' placeholder='Target (%)' style={{textTransform: 'uppercase'}} value={createStrategy.target} name='target' onChange={handleChange} required />
                        <input type='number' placeholder='Stop Loss (%)' style={{textTransform: 'uppercase'}} value={createStrategy.stopLoss} name='stopLoss' onChange={handleChange} required />
                    </div>

                    <div className='strategy-options'>
                        <select value={createStrategy.side} name='side' onChange={handleChange} required>
                            <option value='' disabled>Trade Side</option>
                            <option value='buy'>Buy</option>
                            <option value='sell'>Sell</option>
                            <option value='both'>Both</option>
                        </select>

                        <select value={createStrategy.type} name='type' onChange={handleChange} required>
                            <option value='' disabled>Strategy Type</option>
                            <option value='swing'>Swing</option>
                            <option value='intraday'>Intraday</option>
                            <option value='scalping'>Scalping</option>
                            <option value='positional'>Positional</option>
                        </select>

                        <select value={createStrategy.market} name='market' onChange={handleChange} required>
                            <option value='' disabled>Market</option>
                            <option value='index'>Index</option>
                            <option value='forex'>Forex</option>
                            <option value='stock'>Stock</option>
                            <option value='option'>Option</option>
                            <option value='crypto'>Crypto</option>
                            <option value='futures'>Futures</option>
                        </select>
                    </div>

                    <div className='strategy-notes'>
                        <input type='text' placeholder='Define entry, exit, & rules...' style={{textTransform: 'uppercase'}} value={createStrategy.notes} name='notes' onChange={handleChange} required />
                    </div>

                    <button className='create-strategy-btn'>Add Strategy</button>
                </form>
            </div>

            <div className='strategies'>
                {strategies.length > 0 ? strategies.map((strategy) => {
                    return (
                        <div key={strategy.key} className={strategy.key === selectedStrategy?.key ? "strategy-card-active" : "strategy-card"} onClick={() => setSelectedStrategy(strategy)}>
                            <div className='strategy-info'>
                                <p className='strategy-name'>{strategy.name.toUpperCase()}</p>
                                <p className='badge'>RR = 1:{Number(Number(strategy.target) / Number(strategy.stopLoss)).toFixed()}</p>
                            </div>

                            <div className='strategy-action'>
                                <p className='strategy-created-at'><i className="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;{strategy.createdAt.toDateString()}</p>
                                <i onClick={() => {deleteStrategy(strategy.key)}} className="fa-solid fa-trash delete-btn"></i>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>

            <div className='strategy-stats'>
                {selectedStrategy && <StrategyStats strategy={selectedStrategy} />}
            </div>
        </div>
    )
}

export default Strategy;