//this one is going to be the display card for both singles and albums
import { useMusicContext } from "../contexts/MusicContext"
import "../css/MusicCard.css"
import { Link } from "react-router-dom"

function MusicCard ({music}) {
    //let's first identify whether it is a single (track) or an album
    // let isSingleCheck = true //starts true
    // if (music.idTrack === null){
    //     isSingleCheck = false //is turned false when we identify its not a track

    //     //I'm not entirely sure if the database keeps this trend going of using null
    //     //on the object when it is purely an album and not a single, but the 
    //     //example provided in the API documentation does this, so we roll with it for now
    // }

    // let cardImg = "" 
    // let cardTitle = "" //empty until we add the proper title in here
    // //const releaseDate = "" //holding off on this, because datesd aren't provided, but I might be able to extract them from the description
    
    
    // if (isSingleCheck){
    //     //in here we make the card img url = to the track image url from the db
    //     cardImg = music.strTrackThumb
    //     cardTitle = music.strTrack
    // }
    // else{
    //     cardImg = music.strAlbumThumb
    //     cardTitle = music.strAlbum
    // }

    let isSingleCheck = true
    if (music.idTrack === null){
        isSingleCheck = false
    }

    const musicType = isSingleCheck ? "track" : "album"
    const cardImg = music.image
    const cardTitle = music.name
    const cardReleaseDate = music.releasedate

    const {isFavorite, addToFavorites, removeFromFavorites} = useMusicContext()
    const favorite = isFavorite(music.id)

    const handleHeartClick = (e) =>{
        e.preventDefault() //prevents default behavior. so in this case since the button and the 
                           //link are bubbled up, it will stop any of the behavior in the mix, and that includes
                           //navigation
        e.stopPropagation() //this will handle the bubbling up issue
                            //where it will stop 2 interactions from taking place
                            //at the same time from the same click.
        
        //handle favorite saving behavior here
        if (favorite) removeFromFavorites(music.id)
        else addToFavorites(music)
    }
    return (
        <div className="music-card">
            <button className="music-card-btn" onClick={handleHeartClick}>
                <span className = {`heart${favorite ? "-fav" : ""}`}> ❤ </span>
            </button>
            <Link to = {`/${musicType}/${cardTitle}/info`} state={{music}}>
                <img src = {cardImg} alt = {`image for track/album: ${cardTitle}`}></img>
                <div className="music-card-overlay">
                    <h2>{cardTitle}</h2>
                    <h3>{cardReleaseDate}</h3>
                </div>
            </Link>
        </div>
    )
}

export default MusicCard