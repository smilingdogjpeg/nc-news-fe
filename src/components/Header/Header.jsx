import './Header.css'
import logo from '../Images/NC-news-header.png'

function Header() {
    return (
        <header>
            <img id="header-logo" src={logo} alt="NC News Logo"/>
            
        </header>
    )
}

export default Header