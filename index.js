
import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import movieRoutes from "./routes/movieRoutes.js";

// ES Modules do not provide __dirname automatically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
if (!process.env.OMDB_API_KEY) {
    console.error("Missing OMDB_API_KEY in .env");
    process.exit(1);
}

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(
    path.join(__dirname, "public")
));

// Register routes
app.use("/", movieRoutes);

// Handle unknown URLs
app.use((req, res) => {
    res.status(404).send("Page not found.");
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Movie Explorer running at http://localhost:${PORT}`
    );
});
