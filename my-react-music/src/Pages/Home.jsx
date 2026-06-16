import { useState, useEffect } from "react"
import { getTrendingAlbums, getTrendingSingles } from "../services/api"; 
import "../css/Home.css"
import MusicCard from "../components/MusicCard";
import { Link } from "react-router-dom";
//you cant write for loops and other things like that inside of {} in the return (JSX) because {} only takes expressions
//it does not take statements

function Home (){
    
    const [singles, setSingles] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const loadTrendingSingles = async () => {
            //api calls normally actually produce an error if something goes wrong, rather than returning an object or some other form of response
            //meaning i have to handle this with a try and catch block 
            try {
                const trendingSingles = await getTrendingSingles(); //getTrendingSingles is an async function
                setSingles(trendingSingles);
            } catch (err) {
                console.log("Failed to load trending tracks...")
                //setError("Failed to load trending singles..."); //you didn't even create a setError LOL... its a react state thing
            }
        }
        loadTrendingSingles();
    },[])
    
    useEffect (() => {
        const loadTrendingAlbums = async () => {
            try {
                const trendingAlbums = await getTrendingAlbums()
                setAlbums(trendingAlbums)
            } catch(err) {
                console.log("Failed to load trending albums...")
                //setError("Failed to load trending albums...")
            }
        }
        loadTrendingAlbums();
    }, [])



    return (
        <div className="home-content">
            <div className="home-trending-albums">
                <div className="home-trending-header">
                    <h2>Trending Albums this week</h2>
                    <Link to = "/trending/albums" state={{type:"albums", music:albums}}> View more →</Link>
                </div>
                <div className="home-trending-cards">
                    {albums && albums.slice(0,9).map((album) => {
                    return <MusicCard music = {album} key = {album.id}/>
                    })}
                </div>
                
            </div>
            <div className="home-trending-singles">
                <div className="home-trending-header">
                    <h2>Trending tracks this week</h2>
                    <Link to = "/trending/tracks" state={{type:"tracks", music:singles}}> View more →</Link>
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

export default Home
