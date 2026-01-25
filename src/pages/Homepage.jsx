import './Homepage.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function Homepage() {
    return (
        <>
        <Header />
        <div className="HomeContent">
            <div>
                <h1>AssetMitra</h1>
                <p>Turn Trades Into Insights</p>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Homepage