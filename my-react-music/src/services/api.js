// //we will handle our API functions and other informatio here

// const API_KEY = "123";
// const BASE_URL = "https://www.theaudiodb.com/api/v1/json";

// export const getTrendingSingles = async () => { //functions are basically regular variables (that have their own modifiers) in JS... they have some quirky behaviors of their own, but they are treated like any other value in a way.
//     const response = await fetch (`${BASE_URL}/${API_KEY}/trending.php?country=us&type=itunes&format=singles`); //fetch returns a promise... meaning if you don't await, it will just send the promise token foweard and your code will explode
//     const data = await response.json(); 
//     return data.trending; // it is a function, and the values delcared in here don't persist, so we have to return something. results is the attribute in the JSON (javascript object) that contains the data we requested from the API
// }

// export const getTrendingAlbums = async () => {
//     const response = await fetch (`${BASE_URL}/${API_KEY}/trending.php?country=us&type=itunes&format=albums`);
//     const data = await response.json();
//     return data.trending; 
//     //why not data.results?
//     //results is not a property of the object the API returns...
//     //just think of objects in general. the attributes present depend from API to API
//     //what you saw in the tutorial for the first project you did, does not hold true for 
//     //every API structure.
// }

//the api key would be declared here
const BASE_URL = "https://api.jamendo.com/v3.0" //not sure if it acc is this, but we ball

export const getTrendingAlbums = async () => { //whatever has been trending this past week
    const response = await fetch(`${BASE_URL}/albums/?client_id=${API_KEY}&format=jsonpretty&order=popularity_week&limit=all`)
    const data = await response.json()
    return data.results
}

export const getTrendingSingles = async () => {
    const response = await fetch (`${BASE_URL}/tracks/?client_id=${API_KEY}&format=jsonpretty&order=popularity_week&limit=all`)
    const data = await response.json()
    return data.results
}

export const getArtist = async (query) => {
    const response = await fetch (`${BASE_URL}/artists/?client_id=${API_KEY}&format=jsonpretty&id=${query}`)
    const data = await response.json()
    return data.results
}

export const getArtistDescription = async (query) => {
    const response = await fetch (`${BASE_URL}/artists/musicinfo/?client_id=${API_KEY}&format=jsonpretty&id=${query}`)
    const data = await response.json()
    return data.results
}

export const getTrendingSinglesByArtist = async (query) => {
    const response = await fetch (`${BASE_URL}/tracks/?client_id=${API_KEY}&format=jsonpretty&limit=all&artist_id=${query}`)
    const data = await response.json()
    return data.results
}

export const getTrendingAlbumsByArtist = async (query) => {
    const response = await fetch (`${BASE_URL}/albums/?client_id=${API_KEY}&format=jsonpretty&limit=all&artist_id=${query}`)
    const data = await response.json()
    return data.results
}

export const downloadSingles = async (track_id) => {
    const response = await fetch (`${BASE_URL}/tracks/file/?client_id=${API_KEY}&id=${track_id}&action=download`)
    
    //maybe do an error check in here in case the response thing goes wrong, but we can also handle it outside
    const data = await response.blob()
    return data
}

export const downloadAlbums = async (album_id) => {
    const response = await fetch (`${BASE_URL}/albums/file/?client_id=${API_KEY}&id=${album_id}`)
    const data = await response.blob()
    return data
}
