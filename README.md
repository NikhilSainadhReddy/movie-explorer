# 🎬 Movie Explorer

A movie discovery web application built using **Node.js, Express.js, Axios, EJS, and the OMDb API**.

Movie Explorer allows users to search for movies and television series, filter results by release year and content type, navigate through paginated results, and explore detailed information about individual movies.

## Features

- **Movie Search:** Search for movies and series by title.
- **Filtering:** Filter results by release year and content type.
- **Movie Details:** View information such as plot, director, actors, genre, release date, and IMDb rating.
- **Pagination:** Navigate through multiple pages of search results.
- **Responsive Design:** Interface adapts to desktop and mobile screens.
- **Error Handling:** Handles invalid inputs, missing results, and API connection errors.
- **Secure API Configuration:** Stores the OMDb API key in environment variables.

## Tech Stack

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | JavaScript runtime              |
| Express.js | Backend web framework           |
| Axios      | HTTP requests to OMDb           |
| EJS        | Server-side HTML rendering      |
| HTML5      | Page structure                  |
| CSS3       | Styling and responsive design   |
| JavaScript | Application logic               |
| dotenv     | Environment variable management |
| OMDb API   | Movie information provider      |

## Project Structure

```text
movie-explorer/
│
├── controllers/
│   └── movieController.js
│
├── routes/
│   └── movieRoutes.js
│
├── services/
│   └── omdbService.js
│
├── public/
│   ├── styles.css
│   └── app.js
│
├── views/
│   ├── index.ejs
│   └── movie.ejs
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate into the project directory

```bash
cd movie-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Obtain an OMDb API key

Register for an API key:

https://www.omdbapi.com/apikey.aspx

### 5. Configure environment variables

Create a `.env` file in the project root:

```env
OMDB_API_KEY=YOUR_OMDB_API_KEY
PORT=3000
```

Replace `YOUR_OMDB_API_KEY` with your own API key.

**Do not commit your `.env` file to GitHub.**

### 6. Start the application

For development:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

### 7. Open the application

Visit:

http://localhost:3000

## Application Routes

| HTTP Method | Endpoint                          | Description                         |
| ----------- | --------------------------------- | ----------------------------------- |
| GET         | `/`                               | Displays the homepage               |
| GET         | `/search?title=Batman`            | Searches for movies                 |
| GET         | `/search?title=Batman&year=2022`  | Searches with a release-year filter |
| GET         | `/search?title=Batman&type=movie` | Searches by content type            |
| GET         | `/movie/:id`                      | Displays individual movie details   |

## API Integration

This project uses the Open Movie Database (OMDb) API.

Official website: https://www.omdbapi.com/

The application uses Axios to communicate with the API.

Two primary operations are supported:

1. Movie Search – Retrieves matching movie and series information.
2. Movie Details – Retrieves detailed information using an IMDb ID.

API requests are handled server-side, and the results are rendered using EJS templates.

## Error Handling

The application handles:

- Empty movie searches.
- Invalid release years.
- Unsupported content types.
- Movies that cannot be found.
- API connection failures.
- Request timeouts.
- Invalid movie IDs.
- Unknown application routes.

## Learning Outcomes

Through this project, I explored:

- Building server-side applications using Express.js.
- Understanding and integrating REST APIs.
- Making HTTP requests using Axios.
- Working with asynchronous JavaScript and async/await.
- Rendering dynamic pages using EJS.
- Organizing backend code using routes, controllers, and services.
- Using ES Modules with import and export.
- Managing environment variables and API credentials.
- Implementing input validation and error handling.
- Building responsive user interfaces.

## Acknowledgements

- OMDb API for providing movie information.
- Express.js, Axios, and EJS for the application technologies.

## License

This project is intended for educational purposes. Refer to the OMDb API website for its API usage and licensing terms.
