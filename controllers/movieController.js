
import axios from "axios";

import {
    searchMovies,
    getMovieById,
    OmdbError
} from "../services/omdbService.js";

// Shared defaults for the homepage
function getDefaultViewData() {
    return {
        movies: [],
        error: null,
        searchTerm: "",
        selectedYear: "",
        selectedType: "",
        currentPage: 1,
        totalPages: 0
    };
}

// Homepage controller
export function showHome(req, res) {
    res.render("index", getDefaultViewData());
}

// Search controller
export async function search(req, res) {
    const title = String(req.query.title || "").trim();
    const year = String(req.query.year || "").trim();
    const type = String(req.query.type || "").trim();

    const rawPage = String(req.query.page || "1");
    const parsedPage = Number(rawPage);

    const currentPage =
        Number.isInteger(parsedPage) &&
        parsedPage >= 1 &&
        parsedPage <= 100
            ? parsedPage
            : 1;

    const viewData = {
        ...getDefaultViewData(),
        searchTerm: title,
        selectedYear: year,
        selectedType: type,
        currentPage
    };

    if (!title) {
        return res.status(400).render("index", {
            ...viewData,
            error: "Please enter a movie title."
        });
    }

    if (
        year &&
        (
            !/^\d{4}$/.test(year) ||
            Number(year) < 1870 ||
            Number(year) > new Date().getFullYear()
        )
    ) {
        return res.status(400).render("index", {
            ...viewData,
            error: "Please enter a valid release year."
        });
    }

    if (
        type &&
        !["movie", "series", "episode"].includes(type)
    ) {
        return res.status(400).render("index", {
            ...viewData,
            selectedType: "",
            error: "Invalid content type."
        });
    }

    try {
        const data = await searchMovies(
            title,
            year,
            type,
            currentPage
        );

        const totalResults = Number(data.totalResults) || 0;

        const totalPages = Math.min(
            100,
            Math.ceil(totalResults / 10)
        );

        return res.render("index", {
            ...viewData,
            movies: data.Search || [],
            totalPages
        });

    } catch (error) {
        console.error("Search error:", error.message);

        if (error instanceof OmdbError) {
            return res.render("index", {
                ...viewData,
                currentPage: 1,
                error: error.message
            });
        }

        return res.status(502).render("index", {
            ...viewData,
            error: getServiceErrorMessage(error)
        });
    }
}

// Movie details controller
export async function showMovie(req, res) {
    const imdbID = req.params.id;

    if (!/^tt\d+$/.test(imdbID)) {
        return res.status(400).send("Invalid movie ID.");
    }

    try {
        const movie = await getMovieById(imdbID);

        return res.render("movie", {
            movie
        });

    } catch (error) {
        console.error("Movie details error:", error.message);

        if (error instanceof OmdbError) {
            return res.status(404).send("Movie not found.");
        }

        return res.status(502).send(
            getServiceErrorMessage(error)
        );
    }
}

// Convert technical errors into friendly messages
function getServiceErrorMessage(error) {
    if (error.code === "ECONNABORTED") {
        return "The movie service took too long to respond.";
    }

    if (axios.isAxiosError(error)) {
        return "Unable to connect to the movie service.";
    }

    return "An unexpected error occurred. Please try again.";
}
