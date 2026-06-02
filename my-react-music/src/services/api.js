//we will handle our API functions and other informatio here

const API_KEY = "123";
const BASE_URL = "https://www.theaudiodb.com/api/v1/json";

export const getTrendingSingles = async () => { //functions are basically regular variables (that have their own modifiers) in JS... they have some quirky behaviors of their own, but they are treated like any other value in a way.
    const response = await fetch (`${BASE_URL}/${API_KEY}/trending.php?country=us&type=itunes&format=singles`); //fetch returns a promise... meaning if you don't await, it will just send the promise token foweard and your code will explode
    const data = await response.json(); 
    return data.results; // it is a function, and the values delcared in here don't persist, so we have to return something. results is the attribute in the JSON (javascript object) that contains the data we requested from the API
}

export const getTrendingAlbums = async () => {
    const response = await fetch (`${BASE_URL}/${API_KEY}/trending.php?country=us&type=itunes&format=albums`);
    const data = await response.json();
    return data.results;
}