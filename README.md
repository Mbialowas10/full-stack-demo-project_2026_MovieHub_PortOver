# React + TypeScript + Vite
## Author: Ace Faculty
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Requirements

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