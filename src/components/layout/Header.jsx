import './Header.css'
import Button from '../ui/Button'

function Header() {
    return(
        <>
        <header>
            <nav>
                <div>
                    <img src="src\assets\AssetMitra Logo White.png" alt="AssetMitra"></img>
                </div>
                <div>
                    <p>Hello, Welcome!</p>
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