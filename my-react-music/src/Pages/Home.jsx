import { useState, useEffect } from "react"
import { getTrendingAlbums, getTrendingSingles } from "../services/api"; 
import "../css/Home.css"

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
                setError("Failed to load trending singles...");
            }
        }
        loadTrendingSingles();
    },[])
    
    useEffect (() => {
        const loadTrendingAlbums = async () => {
            try {
                const trendingAlbums = getTrendingAlbums()
                setAlbums(trendingAlbums)
            } catch(err) {
                setError("Failed to load trending albums...")
            }
        }
        loadTrendingAlbums();
    }, [])



    return (
        <div className="home-content">
            <div className="home-trending-albums"></div>
            <div className="home-trending-singles"></div>
        </div>
    )
}

export default Home
