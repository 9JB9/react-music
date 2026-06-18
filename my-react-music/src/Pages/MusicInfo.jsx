import "../css/MusicInfo.css"
import "../css/Home.css"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getTrendingAlbumsByArtist, getTrendingSingles, getTrendingSinglesByArtist } from "../services/api";
import MusicCard from "../components/MusicCard";
function MusicInfo (){

    const [singles, setSingles] = useState([])
    const [albums, setAlbums] = useState([])
    const location = useLocation();
    const data = location.state?.music
    const musicImage = data.image
    const musicTitle = data.name
    const musicReleaseDate = data.releasedate
    const artistID = data.artist_id
    const artistName = data.artist_name

    useEffect (() => {
        const loadSingles = async () => {
            try{
                const data = await getTrendingSinglesByArtist (artistID)
                setSingles(data)
            } catch(err) {
                console.log("couldn't load the singles for this artist")
            }
        }
        const loadAlbums = async () => {
            try{
                const data = await getTrendingAlbumsByArtist (artistID)
                setAlbums(data)
            } catch (err) {
                console.log("couldn't load the albums for this artist")
            }
        }
        loadAlbums()
        loadSingles ()
    }, [artistID])
    
    return (
        <div className="music-info">
            <div className="music-info-header">
                <img src = {musicImage} alt="music art or thumbnail"></img>
                <h1>{musicTitle}</h1>
                <h3>{musicReleaseDate}</h3>
            </div>
            <div className="music-info-download">
                DOWNLOAD
            </div>
            <div className="home-trending-singles">
                <div className="home-trending-header">
                    <h2>More singles by {artistName}</h2>
                </div>
                <div className="home-trending-cards">
                    {singles && singles.slice(0,9).map((single) => { //everything is truthy. things return values, and those values are truthy. JS allows you to put full blown expressions as booleans (including arrays, really anything). unlike Java and similar languages, where you are limited to boolean values
                    return <MusicCard music = {single} key = {single.id}/>
                    })}
                </div>
            </div>

        </div>
    )
}

export default MusicInfo