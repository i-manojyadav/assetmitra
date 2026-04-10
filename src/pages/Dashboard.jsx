import { useState } from 'react';
import PortfolioDashboard from '../components/dashboard/portfolio/PortfolioDashboard';
import './Dashboard.css'

function Dashboard() {

    const [ active, setActive ] = useState("dashboard");

    // TOGGLE
    function toggle(item) {
        setActive(item);
    }


    return (
        <div className='dashboard'>
            <div className='tab-btns'>
                <button className={active === "dashboard" ? "tab-active-btn" : ""} onClick={() => toggle("dashboard")}>Portfolio</button>
                <button className={active === "strategy" ? "tab-active-btn" : ""} onClick={() => toggle("strategy")}>Strategy</button>
                <button className={active === "journal" ? "tab-active-btn" : ""} onClick={() => toggle("journal")}>Journal</button>
            </div>
            <div className='tab-content'>
                {active === "dashboard" && <PortfolioDashboard />}
                {active === "strategy" && <p>Strategy</p>}
                {active === "journal" && <p>Journal</p>}
            </div>
        </div>
    )
}

export default Dashboard;