import './Layout.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function Layout() {
    return (
        <>
        <Toaster position="top-center" />
        <div className='layout'>
            <Header />
            <div className='in-layout'>
                <div className='sidebar-sec'>
                    <Sidebar />
                </div>
                <span className='layout-border'></span>
                <div className='content-sec'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Layout