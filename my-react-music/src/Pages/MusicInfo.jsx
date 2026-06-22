import "../css/MusicInfo.css"
//import "../css/Home.css"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { downloadAlbums, getTrendingAlbumsByArtist, getTrendingSingles, getTrendingSinglesByArtist } from "../services/api";
import MusicCard from "../components/MusicCard";
import { downloadSingles } from "../services/api";

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
    const musicID = data.id

    //we need some way to check whether or not this is an album or a single to use the proper download routine
    let isSingleCheck = false
    if (data.album_id === null){
        isSingleCheck = true
    }

    //console.log(isSingleCheck)

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
    

    const handleDownloadClick = async () => {
        if (isSingleCheck){
            try{
                const blob = await downloadSingles(musicID)
                const blob_url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = blob_url
                link.download = `${musicTitle}-${artistName}.mp3`

                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                window.URL.revokeObjectURL(blob_url)
            } catch(err){
                console.log("music (singles) download routine has gone wrong")
            }
        }
        else{
            try{
                const blob = await downloadAlbums(musicID)
                const blob_url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = blob_url
                link.download = `${musicTitle}-${artistName}.mp3`

                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                window.URL.revokeObjectURL(blob_url)
            } catch (err) {
                console.log("music (albums) download routine has gone wrong")
            }
        }
    }
    return (
        <div className="music-info">
            <div className="music-info-header">
                <img src = {musicImage} alt="music art or thumbnail"></img>
                <h1>{musicTitle}</h1>
                <h3>{musicReleaseDate}</h3>
            </div>
            <div className="music-info-download">
                <div className="music-info-download-btn">
                    <button onClick={handleDownloadClick}>Click here to download!</button>
                    <img src = {musicImage} alt = "music art or thumbnail"></img>
                </div>
                <h2>Streaming</h2>
            </div>
            <div className="home-trending-singles">
                <div className="home-trending-header">
                    <h2>More {isSingleCheck ? "tracks" : "albums"} by {artistName}</h2>
                </div>
                <div className="home-trending-cards">
                    {isSingleCheck ?
                        (singles.map((single) => {
                            return <MusicCard music = {single} key = {single.id} />
                        })) :
                            (albums.map((album) => {
                                return <MusicCard music = {album} key = {album.id} />
                            }))
                    }
                </div>

            </div>
        </div>
    )
}

export default MusicInfo