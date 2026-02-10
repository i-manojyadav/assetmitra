import './Sidebar.css'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return(
        <div className='sidebar'>
            <NavLink to="/" className={({isActive}) => isActive? "active" : "not-active"}><i class="fa-solid fa-house"></i><span>Dashboard</span></NavLink>
            <NavLink to="/portfolio" className={({isActive}) => isActive? "active" : "not-active"}><i class="fa-solid fa-suitcase"></i> <span>Portfolio</span></NavLink>
            <NavLink to="/journal" className={({isActive}) => isActive? "active" : "not-active"}><i class="fa-solid fa-book"></i> <span>Journal</span></NavLink>
        </div>
    )
}

export default Sidebar