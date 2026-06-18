import "../css/ArtistInfo.css"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getArtist, getArtistDescription } from "../services/api"

function ArtistInfo (){

    const location = useLocation()
    const musicData = location.state?.music
    const artistID = musicData.artist_id
    const [artistData, setArtistData] = useState(null)
    const [artistImage, setArtistImage] = useState("")
    const [artistDescription, setArtistDescription] = useState("")
    const artistName = musicData.artist_name
    
   
    //first lets run the api call on useEffect, because we only need that to happen once

    useEffect(() => {
        const loadArtistData = async () => {
            try{
                const data = await getArtist(artistID)
                const description = await getArtistDescription (artistID)
                setArtistData(data)
                setArtistImage(data[0].image)
                const rawDescription = description[0].musicinfo.description.en;
                const cleanDescription = rawDescription.replace(/<\/?p>|&nbsp;/g, "")
                setArtistDescription(cleanDescription)
            } catch (err){
                console.log("failed to load the artist information")
            }
        }
        loadArtistData()
    }, [])
    
    return (
        <div className="artist-info">
            <div className="artist-info-artist-bio">
                <img src = {artistImage} alt="artist avatar"></img>
                <p>{artistDescription}</p>
            </div>
        </div>
    )
}

export default ArtistInfo