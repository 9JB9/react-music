import { Link } from 'react-router-dom'
import '../css/NavBar.css'


function NavBar () {

    return (
        <nav>
            <div className = 'nav-home'>
                <Link to = '/'> Music App </Link>
            </div>
            <div className="nav-links">
                <Link to = '/' className = 'nav-link' > Home </Link>
                <Link to = '/favorites' className = 'nav-link'> Favorites </Link>
            </div>
        </nav>
    )

}

export default NavBar