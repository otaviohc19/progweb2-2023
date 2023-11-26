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
            .then(data => setFilme(data))
            .catch(error => console.error(error));
    }, [params.id]);

    return (
        <div>
            <Menu />
    
            {filme && (
                <div className="container mx-auto p-8">
                    <div className="flex mb-8">
                        <img
                            className="w-40 h-56 object-cover mr-4 border-double border-4 border-red-800"
                            src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                            alt={filme.title}
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{filme.title}</h1>
                            <p className="text-gray-700 mb-6">{filme.overview}</p>
                        </div>
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Informações do Filme</h2>
                            <p><span className="font-bold">Data de Lançamento:</span> {filme.release_date}</p>
                            <p><span className="font-bold">Nota Média:</span> {filme.vote_average}</p>
                            <p><span className="font-bold">Gêneros:</span> {filme.genres.map(genre => genre.name).join(", ")}</p>
                            <p><span className="font-bold">Duração:</span> {filme.runtime} minutos</p>
                            <p><span className="font-bold">Orçamento:</span> ${filme.budget}</p>
                            <p><span className="font-bold">Receita:</span> ${filme.revenue}</p>
                            {/* Adicione mais informações conforme necessário */}
                        </div>
    
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Equipe Técnica</h2>
                            <p><span className="font-bold">Diretor:</span> {filme.credits.crew.find(member => member.job === 'Director')?.name}</p>
                            <p><span className="font-bold">Roteirista:</span> {filme.credits.crew.find(member => member.job === 'Screenplay')?.name}</p>
                            <p><span className="font-bold">Fotografia:</span> {filme.credits.crew.find(member => member.job === 'Director of Photography')?.name}</p>
                            <p><span className="font-bold">Trilha Sonora:</span> {filme.credits.crew.find(member => member.job === 'Original Music Composer')?.name}</p>
                            {/* Adicione mais informações conforme necessário */}
                        </div>
                    </div>
    
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Elenco</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filme.credits.cast.slice(0, 6).map((castMember) => (
                                <div key={castMember.id} className="flex flex-col items-center mb-4">
                                    <img
                                        className="w-40 h-56 object-cover rounded-lg mb-2 border border-gray-300"
                                        src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
                                        alt={castMember.name}
                                    />
                                    <span className="text-center font-bold">{castMember.name}</span>
                                    <span className="text-center text-gray-500">{castMember.character}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}    