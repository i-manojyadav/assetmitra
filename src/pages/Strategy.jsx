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

        toast.success(`${createStrategy.name}, Created`);

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

        console.log(strategies);
    }

    return (
        <div className='strategy'>
            <div className='create-strategy'>
                <button onClick={() => toggle()}><i className="fa-solid fa-plus"></i> Strategy</button>
            </div>

            <div style={{display: isActive? "block" : "none"}} className='strategy-form'>
                <form onSubmit={onCreate}>
                    <div className='strategy-name-price'>
                        <input type='text' placeholder='Enter Strategy Name' value={createStrategy.name} name='name' onChange={handleChange} />
                        <input type='number' placeholder='Target %' value={createStrategy.target} name='target' onChange={handleChange} />
                        <input type='number' placeholder='Stoploss %' value={createStrategy.stopLoss} name='stopLoss' onChange={handleChange} />
                    </div>

                    <div className='strategy-options'>
                        <select value={createStrategy.side} name='side' onChange={handleChange}>
                            <option value='' disabled>Side</option>
                            <option value='buy'>Buy</option>
                            <option value='sell'>Sell</option>
                            <option value='both'>Both</option>
                        </select>

                        <select value={createStrategy.type} name='type' onChange={handleChange}>
                            <option value='' disabled>Strategy Type</option>
                            <option value='swing'>Swing</option>
                            <option value='intraday'>Intraday</option>
                            <option value='scalping'>Scalping</option>
                            <option value='positional'>Positional</option>
                        </select>

                        <select value={createStrategy.market} name='market' onChange={handleChange}>
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
                        <input type='text' placeholder='Strategy Notes' value={createStrategy.notes} name='notes' onChange={handleChange} />
                    </div>

                    <button className='create-strategy-btn'>Create Strategy</button>
                </form>
            </div>

            <div className='strategies'>
                {strategies.length > 0 ? strategies.map((strategy) => {
                    return (
                        <div key={strategy.key} className='strategy-card' onClick={() => setSelectedStrategy(strategy)}>
                            <div className='strategy-info'>
                                <p className='strategy-name'>{strategy.name.toUpperCase()}</p>
                                <div className='strategy-badges'>
                                    <span>{strategy.side}</span>
                                    <span>{strategy.type}</span>
                                    <span>{strategy.market}</span>
                                </div>
                            </div>

                            <div className='strategy-prices'>
                                <div>
                                    <p>Target</p>
                                    <p>{strategy.target}%</p>
                                </div>
                                <div>
                                    <p>Stoploss</p>
                                    <p>{strategy.stopLoss}%</p>
                                </div>
                                <div>
                                    <p>R : R</p>
                                    <p>1:3</p>
                                </div>
                            </div>

                            <div className='strategy-notes'>
                                <p><span>Notes: </span>{strategy.notes}</p>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>

            <div className='stats'>
                {selectedStrategy && <StrategyStats strategy={selectedStrategy} />}
            </div>
        </div>
    )
}

export default Strategy;