import './Header.css'
import logo from "../../assets/AM-W-Logo.png"
import Button from '../ui/Button'
import { demoData } from '../../data/demoData'
import toast from 'react-hot-toast';

function Header() {

    function demoUser() {
        localStorage.setItem("fdFolio", JSON.stringify(demoData.fdFolio));
        localStorage.setItem("folioCoins", JSON.stringify(demoData.folioCoins));
        localStorage.setItem("journals", JSON.stringify(demoData.journals));
        localStorage.setItem("strategies", JSON.stringify(demoData.strategies));

        window.location.reload();
        toast.success("Demo data loaded");
    }

    function deleteDemoData() {

        const confirm = window.confirm("Deleting the data will permanently remove its all portfolio coins, FDs, strategies, and journals and its trades.");

        if (confirm) {
            localStorage.clear();
        };

        window.location.reload();
        toast.success("All data deleted");
    }


    return(
        <>
        <header>
            <nav>
                <div>
                    <img src={logo} alt="AssetMitra"></img>
                </div>
                <div>
                    <button onClick={() => demoUser()}><i className="fa-solid fa-eye"></i>Demo</button>
                    <button onClick={() => deleteDemoData()}><i className="fa-solid fa-trash"></i>Delete Data</button>
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header