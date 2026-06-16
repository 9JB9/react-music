//we are going to load the entire full list of trending tracks or albums
//whether or not it will be track or album will depend on the user when they click the link
//meaning the first challenge is to figure out how to determine whether the user has requested
//for tracks or albums
import { useLocation } from "react-router-dom"
import MusicCard from "../components/MusicCard"
import "../css/TrendingPage.css"

function TrendingPage (){
    const location = useLocation()
    const musicData = location.state?.music
    const musicType = location.state?.type

    
    return (
        <div className="trending-content">
            <div className="music-grid">
                {musicData.map((music) => (
                    <MusicCard music={music} key={music.id}> </MusicCard>
                ))}
            </div>
        </div>
    )
}

export default TrendingPage