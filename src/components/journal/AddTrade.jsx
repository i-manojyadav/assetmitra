import { useContext, useState } from 'react';
import './AddTrade.css'
import { v4 as uuidv4 } from 'uuid';
import { JournalContext } from '../../context/JournalContext';
import toast from 'react-hot-toast';
import { StrategyContext } from '../../context/StrategyContext';

function AddTrade({ journalKey }) {

    const { journals, setJournals } = useContext(JournalContext);
    const { strategies } = useContext(StrategyContext);

    const [ addTrade, setAddTrade ] = useState({
        symbol: "",
        type: "",
        tradingStyle: "",
        strategy: "",
        entryPrice: "",
        exitPrice: "",
        qty: "",
        stopLoss: "",
        charges: "",
        dateTime: "",
        notes: "",
        key: uuidv4()
    });

    const [ active, setActive ] = useState(false);

    //TOGGLE
    function toggle() {
        if (active === false) {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    // HANDLE CHANGE
    function handleChange(e) {
        setAddTrade((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    }

    // ADD TRADE
    function onAddTrade(e) {
        e.preventDefault();
        
        journalTrade(addTrade, journalKey);

        toast.success(`${addTrade.symbol.toUpperCase()} Trade Added Successfully!`)

        setAddTrade({
            symbol: "",
            type: "",
            tradingStyle: "",
            strategy: "",
            entryPrice: "",
            exitPrice: "",
            qty: "",
            stopLoss: "",
            charges: "",
            dateTime: "",
            notes: "",
            key: uuidv4()
        });

        toggle();

    }

    // ADD TRADE IN JOURNAL
    function journalTrade(addTrade, key) {
        const updated = journals.map((journal) => {
            if(journal.key === key) {
                return {...journal, trades: [...journal.trades, addTrade]}
            };
            return journal;
        });

        setJournals(updated);

    }


    
    return (
        <div className='add-trade'>
            <div>
                <button onClick={() => toggle()}>Add Trade</button>
            </div>

            <div style={{display: active? "block" : "none"}} className='add-trade-form'>
                <div className='title-sec'>
                    <h3>Add <span style={{color: "#f59e0b"}}>Trade</span></h3>
                    <p>Journal</p>
                </div>
                
                <form onSubmit={onAddTrade}>
                    <div className='trade-symbol-type'>
                        <div className='trade-symbol'>
                            <input type='text' placeholder='Enter Symbol' value={addTrade.symbol} name='symbol' onChange={handleChange} required />
                        </div>
                        <div className='trade-type'>
                            <label><input type='radio' value='buy' name='type' checked={addTrade.type === "buy"} onChange={handleChange} required />Buy</label>
                            <label><input type='radio' value='sell' name='type' checked={addTrade.type === "sell"} onChange={handleChange} required />Sell</label>
                        </div>
                    </div>

                    <div className='trade-style-strategy'>
                        <div className='trade-style'>
                            <label>Trading Style</label>
                            <select value={addTrade.tradingStyle} name='tradingStyle' onChange={handleChange} required >
                                <option value="" disabled>Select</option>
                                <option value="swing" >Swing</option>
                                <option value="intraday" >Intraday</option>
                                <option value="scalping" >Scalping</option>
                                <option value="positional" >Positional</option>
                            </select>
                        </div>

                        <div className='trade-strategy'>
                            <label>Trading Strategy</label>
                            <select value={addTrade.strategy} name='strategy' onChange={handleChange} required >
                                <option value="" disabled>Select</option>
                                {strategies.map((strategy, idx) => {
                                    return <option value={strategy.name} key={idx}>{strategy.name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className='trade-price'>
                        <input type='number' placeholder='Entry Price' value={addTrade.entryPrice} name='entryPrice' onChange={handleChange} required />
                        <input type='number' placeholder='Exit Price' value={addTrade.exitPrice} name='exitPrice' onChange={handleChange} required />
                    </div>

                    <div className='trade-qty-sl'>
                        <input type='number' placeholder='Enter Quantity' value={addTrade.qty} name='qty' onChange={handleChange} required />

                        <input type='number' placeholder='Stop Loss' value={addTrade.stopLoss} name='stopLoss' onChange={handleChange} required />
                    </div>

                    <div className='trade-charges-datetime'>
                        <div className='trade-charges'>
                            <label>All Charges</label>
                            <input type='number' placeholder='Enter Charges' value={addTrade.charges} name='charges' onChange={handleChange} required />
                        </div>
                        <div className='trade-datetime'>
                            <label htmlFor='datetime'>Date & Time:</label>
                            <input type='datetime-local' value={addTrade.dateTime} name='dateTime' onChange={handleChange} required />
                        </div>
                    </div>

                    <div className='trade-notes'>
                        <label>Trade Notes</label>
                        <input type='text' placeholder='Enter Trade Notes' value={addTrade.notes} name='notes' onChange={handleChange} required />
                    </div>

                    <button className='log-trade-btn'>Log Trade</button>
                </form>
            </div>
        </div>
    )
}

export default AddTrade;