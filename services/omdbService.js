
import axios from "axios";

const OMDB_URL = "https://www.omdbapi.com/";

const omdbClient = axios.create({
    baseURL: OMDB_URL,
    timeout: 10000
});

// Custom error for errors returned by OMDb
export class OmdbError extends Error {
    constructor(message) {
        super(message);
        this.name = "OmdbError";
    }
}

// Reusable function for all OMDb requests
async function requestOMDb(params) {
    const response = await omdbClient.get("/", {
        params: {
            ...params,
            apikey: process.env.OMDB_API_KEY
        }
    });

    const data = response.data;

    if (data.Response === "False") {
        throw new OmdbError(
            data.Error || "The OMDb request failed."
        );
    }

    return data;
}

// Search movies
export async function searchMovies(title, year, type, page) {
    return requestOMDb({
        s: title,
        y: year || undefined,
        type: type || undefined,
        page
    });
}

// Retrieve one movie by IMDb ID
export async function getMovieById(imdbID) {
    return requestOMDb({
        i: imdbID
    });
}
