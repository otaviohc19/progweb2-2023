import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";


export default function Filme() {
    let params = useParams();
    const [filme, setFilme] = useState();

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";

        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }

        let url = `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=credits&language=pt-BR`;
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => setFilme(data.results))
            .catch(error => console.error(error));
    });


    return (
        <div>
            <Menu />
            <h1>filme {params.id}</h1>     
        </div>
    )
}