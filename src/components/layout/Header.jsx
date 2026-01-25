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
                    <a>Home</a>
                    <a>Features</a>
                </div>
                <div>
                    <Button icon="fa-regular fa-eye" name="Demo" />
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header