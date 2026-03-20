# MovieHub 
### Source Project Reference
[Port an from an existing Kotlin Project: MovieHub](https://github.com/Mbialowas10/MovieHubFall2025)

## Project Team
* ACE Faculty

## Project Background
MovieHub has been ported over from an existing Android app written in Kotlin using JetPack Compose to the technology stack listed below.

## Project Description
MovieHub is an web application that allows users to book mark movies to watch later and leave movie reviews. 

## User Stories
* As a user, I want to search an API for movies and popular TV shows.
* As a user, I want to favourite movies, so that I can watch later.
* As a user, I want to be able to write movie reviews.
* As a non-registered user I want to be able to read movie reviews left by users of the application. 

## Technology Stack
* Frontend: React and TypeScript (Vite)
* Backend: Postgres DB hosted by Neon Service
* API usage: The Movie Database (TMDB) - **[The Movie Database (TMDB) API](https://www.themoviedb.org)** 
* Vercel: frontend deployment
* Neon: backend deployment
* Tailwind CSS


### Installation

DB-Mock Branch
1. After cloning/forking this repo, checkout the dev branch to preview development code changes.
2. cd into ```movie-hub-web-2026``` directory.
3. Run npm i
4. create .env file in project root then add
```code VITE_TMDB_API_KEY=xxxxxxx```
replace xxxxxx with TMDB api key
**[The Movie Database (TMDB) API](https://www.themoviedb.org)** 

5. Json Server is used to mock a database connection. 
6. To run json-server, please run the following command:
```json-server --watch .\xxxx.json --port 4444```
In this project json files are stored inside the data directory. json-server
listens to whatever port you specify, here we used 4444.


