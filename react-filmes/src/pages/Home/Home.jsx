// Home/Home.jsx

import { useEffect, useState } from "react";
import Menu from "../../components/menu";

export default function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        let token= "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZmNDk0MmI2NzNlNzc4Yzk1NDhmNjM4ZDVhNDhlZiIsInN1YiI6IjY1MzMxZjZjNjJlODZmMDBjMzkzZWY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yi9DLPxd9pthrSEdmjHIw-MoeI6b1tJqgmvaUzb6XMk";
        
        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorizaton: 'Bearer ' + token 
            }
        }
        

        let url = "https://api.themoviedb.org/3/movie/popular";
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => setFilmes(data))
            .catch(error => console.error("ERRRRRO", error));

    }, []);

    return (
        <div>
            <Menu />
            <div className="container bg-white shadow p-4 mx-auto">
                <h1 className="text-4xl font-bold">Populares</h1>

                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    {filmes.results.map(filme => (
                        <div key={filme.id}>
                            <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path} />
                            <h3 className="text-2xl font-semibold text-center">
                                {filme.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}