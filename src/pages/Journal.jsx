import { useContext, useEffect, useState } from 'react';
import './Journal.css'
import { v4 as uuidv4 } from 'uuid';
import AddTrade from '../components/journal/AddTrade';
import { JournalContext } from '../context/JournalContext';
import EmptyState from '../components/ui/EmptyState';
import TradeList from '../components/journal/TradeList';
import JournalStats from '../components/journal/JournalStats';
import toast from 'react-hot-toast';

function Journal() {

    const [ createJournal, setCreateJournal ] = useState({
        name: "",
        key: uuidv4(),
        createdAt: new Date(),
        trades: []
    });

    const { journals, setJournals } = useContext(JournalContext);

    const [ selectedJournal, setSelectedJournal ] = useState(null);
    const [ active, setActive ] = useState(false);
    

    //TOGGLE
    function toggle() {
        if (active === false) {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    // HANDLE CREATE JOURNAL
    function handleChange(e) {
        setCreateJournal((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    }

    // HANDLE SUBMIT (CREATE JOURNAL)
    function onCreate(e) {
        e.preventDefault();

        setJournals((prev) => {
            return [...prev, createJournal];
        });

        toast.success("Journal created successfully");

        setCreateJournal({
            name: "",
            key: uuidv4(),
            createdAt: new Date(),
            trades: []
        });

        toggle();
    }

    // SELECTED JOURNAL
    function activeJournal(key) {
        setSelectedJournal(() => {
            return journals.filter((journal) => {
                return journal.key === key;
            });
        });
    }



    return (
        <div className='journal'>
            <div className='create-journal'>
                <button style={{display: active? "none" : "block"}} onClick={() => toggle()}><i className="fa-solid fa-plus"></i> Create Journal</button>
                <div style={{display: active? "block" : "none"}} className='journal-form'>
                    <form onSubmit={onCreate}>
                        <input type='text' placeholder='Journal name...' value={createJournal.name} name='name' onChange={handleChange} required />
                        <button>Create Journal</button>
                    </form>
                </div>
            </div>

            <div className='journals'>
                {journals.length > 0 ? journals.map((journal) => {
                    return (
                    <div onClick={() => activeJournal(journal.key)} key={journal.key} className={selectedJournal?.[0]?.key === journal.key ? "journal-card-active" : "journal-card"}>
                        <div className='journal-info'>
                            <p className='journal-name'>{journal.name.toUpperCase()}</p>
                            <p className='badge'>{journal.trades.length} trades</p>
                        </div>
                        <div className='journal-action'>
                            <p className='journal-created-at'><i className="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;{journal.createdAt.toDateString()}</p>
                        </div>
                    </div>
                    )
                }) : <EmptyState msg={{title: "No Journals Found", desc: "Create your first Journal"}} />} 
            </div>
            <div>
                {selectedJournal && <AddTrade journalKey={selectedJournal[0].key} />}
            </div>
            <div className='trade-list'>
                {selectedJournal && <TradeList journal={selectedJournal[0]} />}
            </div>
        </div>
    )
}

export default Journal;