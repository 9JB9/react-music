// //like a state manager.
// //like a dumpster for data lol

// import {createContext, useState, useContext, useEffect } from "react"

// const MusicContext = createContext()

// export const useMovieContext = () => useContext(MusicContext)

// export const MusicProvider = ({children}) => {
//     const [tracks, trendingTracks] = useState([])
//     const [albums, trendingAlbums] = useState([])
// } 

import { createContext, useState, useContext, useEffect } from "react";
const MusicContext = createContext()
export const useMusicContext = () => useContext (MusicContext)

export const MusicProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect (() => {
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites){
            setFavorites(JSON.parse(storedFavorites))
        }
    }, [])

    useEffect (() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (music) => {
        setFavorites(prev => [...prev, music])
    }

    const removeFromFavorites = (musicId) => {
        setFavorites(prev => prev.filter(music => music.id != musicId))
    }

    const isFavorite = (musicId) => {
        for (const music of favorites) {
            if (music.id === musicId) {
                return true
            }
        }

        return false
    }

    const value = {
        favorites, 
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MusicContext.Provider value = {value}>
        {children}
    </MusicContext.Provider>
}