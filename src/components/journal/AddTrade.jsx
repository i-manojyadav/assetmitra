import { useContext, useEffect, useState } from 'react';
import './AddTrade.css'
import { v4 as uuidv4 } from 'uuid';
import { JournalContext } from '../../context/JournalContext';
import toast from 'react-hot-toast';
import { StrategyContext } from '../../context/StrategyContext';

function AddTrade({ journalKey }) {

    const { journals, setJournals } = useContext(JournalContext);
    const { strategies } = useContext(StrategyContext);

    const [ trades, setTrades ] = useState([]);
    const [ addTrade, setAddTrade ] = useState({
        symbol: "",
        side: "",
        type: "",
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

    const [ search, setSearch ] = useState({symbol: ""});
    const [ searchResults, setSearchResults ] = useState([]);

    const [ active, setActive ] = useState(false);
    const [ searchActive, setSearchActive ] = useState(false);
    const [ inputActive, setInput ] = useState(false);

    // TOGGLE
    function toggle() {
        if (active === false) {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    // ACTIVE JOURNAL
    useEffect(() => {

        const journal = journals.find((jr) => {
            return jr.key === journalKey;
        });

        const symbols = journal.trades.map((trade) => {
            return trade.symbol;
        });

        const uniqueSymbols = [...new Set(symbols)];

        setTrades(uniqueSymbols);
    }, [journalKey])


    function handleSearch(e) {
        setSearchActive(true);

        let input = e.target.value;

        if (input === "") {
            setSearchActive(false);
        }

        setSearch({
            ...search, [e.target.name]: e.target.value
        });

        let results = trades.filter((trade) => {
            return trade.toLowerCase().startsWith(input.toLowerCase());
        });

        setSearchResults(results);
    }

    function handleSelect(symbol) {
        setSearchActive(false);

        setSearch({...search, symbol: symbol});
        
        setAddTrade((data) => {
            return {...data, symbol: symbol}
        })
        
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
        toast.success("Trade added");

        setAddTrade({
            symbol: "",
            side: "",
            type: "",
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

        setSearch({
            symbol: ""
        })

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
                    <div className='trade-symbol-side'>
                        <div className='trade-symbol'>
                            <input type='search' placeholder='Enter Symbol' style={{textTransform: 'uppercase'}} value={search.symbol} name='symbol' onChange={handleSearch} required />
                        </div>
                        <div className='trade-side'>
                            <label><input type='radio' value='buy' name='side' checked={addTrade.side === "buy"} onChange={handleChange} required />Buy</label>
                            <label><input type='radio' value='sell' name='side' checked={addTrade.side === "sell"} onChange={handleChange} required />Sell</label>
                        </div>
                    </div>

                    <div className='search-results' style={{display: searchActive ? "block" : "none"}}>
                        <h3>Suggestions</h3>
                        <p className='search-item' onClick={() => handleSelect(search.symbol)}><span>{search.symbol}</span> <span><i className="fa-regular fa-pen-to-square"></i></span></p>
                        {searchResults.map((trade, index) => (
                            <p className='search-item' key={index} onClick={() => handleSelect(trade)}><span>{trade}</span> <span><i className="fa-regular fa-square-plus"></i></span></p>
                        ))}
                    </div>

                    <div className='trade-type-strategy'>
                        <div className='trade-type'>
                            <label>Type</label>
                            <select value={addTrade.type} name='type' onChange={handleChange} style={{textTransform: 'uppercase'}} required >
                                <option value="" disabled>Select</option>
                                <option value="swing" >Swing</option>
                                <option value="intraday" >Intraday</option>
                                <option value="scalping" >Scalping</option>
                                <option value="positional" >Positional</option>
                            </select>
                        </div>

                        <div className='trade-strategy'>
                            <label>Strategy</label>
                            <select value={addTrade.strategy} name='strategy' onChange={handleChange} style={{textTransform: 'uppercase'}} required >
                                <option value="" disabled>Select</option>
                                {strategies.map((strategy, idx) => {
                                    return <option value={strategy.name} key={idx}>{strategy.name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className='trade-price'>
                        <input type='number' placeholder='Entry Price' style={{textTransform: 'uppercase'}} value={addTrade.entryPrice} name='entryPrice' onChange={handleChange} required />
                        <input type='number' placeholder='Exit Price' style={{textTransform: 'uppercase'}} value={addTrade.exitPrice} name='exitPrice' onChange={handleChange} required />
                    </div>

                    <div className='trade-qty-sl'>
                        <input type='number' placeholder='Enter Quantity' style={{textTransform: 'uppercase'}} value={addTrade.qty} name='qty' onChange={handleChange} required />

                        <input type='number' placeholder='Enter Stop-loss' style={{textTransform: 'uppercase'}} value={addTrade.stopLoss} name='stopLoss' onChange={handleChange} required />
                    </div>

                    <div className='trade-charges-datetime'>
                        <div className='trade-charges'>
                            <label>All Charges</label>
                            <input type='number' placeholder='Enter Charges' style={{textTransform: 'uppercase'}} value={addTrade.charges} name='charges' onChange={handleChange} required />
                        </div>
                        <div className='trade-datetime'>
                            <label htmlFor='datetime'>Date & Time:</label>
                            <input type='datetime-local' value={addTrade.dateTime} name='dateTime' onChange={handleChange} style={{textTransform: 'uppercase'}} required />
                        </div>
                    </div>

                    <div className='trade-notes'>
                        <label>Trade Notes</label>
                        <input type='text' placeholder='Why did you take this trade?' style={{textTransform: 'uppercase'}} value={addTrade.notes} name='notes' onChange={handleChange} required />
                    </div>

                    <button className='log-trade-btn'>Log Trade</button>
                </form>
            </div>
        </div>
    )
}

export default AddTrade;