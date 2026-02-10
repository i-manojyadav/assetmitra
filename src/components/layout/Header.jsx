import './Header.css'
import logo from "../../assets/AM-W-Logo.png"
import Button from '../ui/Button'

function Header() {
    return(
        <>
        <header>
            <nav>
                <div>
                    <img src={logo} alt="AssetMitra"></img>
                </div>
                <div>
                    <Button icon="fa-regular fa-user" name="Account" />
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header