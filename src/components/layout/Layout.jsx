import './Layout.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CryptoContext } from '../../context/CryptoPortfolioContext.jsx';
import { FDContext } from '../../context/FDPortfolioContext.jsx';

function Layout() {
    return (
        <>
        <CryptoContext>
            <FDContext>
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
            </FDContext>
        </CryptoContext>
        </>
    )
}

export default Layout