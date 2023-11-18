// Contato/Contato.jsx

import { useState } from "react";
import Menu from "../../components/Menu";
import Cookies from "universal-cookie";
import axios from "axios";

let cookie = new Cookies();


export default function Contato() {
    const [logado, setLogado] = useState(false);

    verificaIdentidade();

    async function verificaIdentidade() {
        let token = await cookie.get("auth");
        if(token) {
            console.log("Existe o cookie, vou testar a identidade");
            console.log(token)

            let body = {
                token: token
            }

            let resp = await axios.post('http://localhost:3000/token', body);

            if (resp.data.valido == true) {
                setLogado(true);
            }
        }
    }

    if(logado == false){
        return (
            <div>
                <Menu />
                <div className="text-center">
                    Você não pode acessar esta página.
                </div>
            </div>
        )
    }

    return (
        <div>
            <Menu />
            <div className="text-center">
                Bem-vindo!
            </div>
        </div>
    )
}