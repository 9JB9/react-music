import MusicCard from "../components/MusicCard"
import { useMusicContext } from "../contexts/MusicContext"
import "../css/Favorites.css"

function Favorites (){
    const {favorites} = useMusicContext()
    const favoritesLength = favorites.length
    return (
        <div className="favorites-content">
            <div className="favorites-header">
                <h1>Favorite{(favoritesLength == 1) ? "" : "s"}</h1>
            </div>
            <div className = {`favorite-cards${(favoritesLength===0 ? "-text" : "")}`}>
                {(favoritesLength > 0) ? 
                    (favorites.map((music) => (
                        <MusicCard music = {music} key = {music.id}></MusicCard>
                    ))) :
                        (<h2>No tracks or albums have been favorited yet :(</h2>)}
            </div>
        </div>
    )
}

export default Favorites