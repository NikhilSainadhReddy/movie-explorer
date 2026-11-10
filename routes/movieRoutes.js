
import express from "express";

import {
    showHome,
    search,
    showMovie
} from "../controllers/movieController.js";

const router = express.Router();

// Homepage
router.get("/", showHome);

// Search movies
router.get("/search", search);

// Individual movie details
router.get("/movie/:id", showMovie);

export default router;
