import { useContext, useState } from 'react';
import './JournalDashboard.css'
import { JournalContext } from '../../../context/JournalContext';
import JournalStats from '../../journal/JournalStats';
import JournalPerformance from './components/JournalPerformance';

function JournalDashboard() {

    const { journals } = useContext(JournalContext);

    const [ activeJournal, setActiveJournal ] = useState(journals[0]);

    return (
        <div className='journal-dashboard'>
            <div className='journals'>
                {journals.length > 0 ? journals.map((journal) => {
                    return (
                    <div onClick={() => setActiveJournal(journal)} key={journal.key} className={activeJournal?.key === journal.key ? "journal-card-active" : "journal-card"}>
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
                {activeJournal && <JournalStats trades={activeJournal.trades} />}
            </div>
            <div>
                <h2>P&L Performance</h2>
                <JournalPerformance trades={activeJournal.trades} />
            </div>
        </div>
    )
}

export default JournalDashboard;