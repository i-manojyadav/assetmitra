import PortfolioDashboard from '../components/dashboard/portfolio/PortfolioDashboard';
import './Dashboard.css'

function Dashboard() {
    return (
        <div className='dashboard'>
            <div className='tab-btn'>
                <button>Portfolio</button>
            </div>
            <div className='tab-content'>
                <PortfolioDashboard />
            </div>
        </div>
    )
}

export default Dashboard;