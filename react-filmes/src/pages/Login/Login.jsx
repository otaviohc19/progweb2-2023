import React, { useState } from "react";
import Menu from "../../components/Menu";
import axios from "axios";
import Cookies from 'universal-cookie';

// Inicializando os Cookies
let cookie = new Cookies();

export default function Login() {

    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');

    async function enviaFormulario() {
        let body = {
            email: email,
            senha: senha
        }

        let resp = await axios.post("http://localhost:3000/login", body);

        console.log(resp.data.token);

        // Criar cookie com nosso Token
        let config = {
        path: '/',
        maxAge: 60 * 60 * 24 * 1    // 1 Dia
        }

        // Pegando o token do Backend
        let token = resp.data.token;

        // Criando um Cookie chamado "auth"
        cookie.set('auth', token, config);

        // Redirecionar o usuário
        window.location.href = '/home';
    }

    

    return (
        <div>
            <Menu />
            <div className="my-5 mx-4 border p-5 rounded-xl max-w-sm sm:mx-auto">
                <h3 className="text-xl font-bold">
                    Entrar
                </h3>

                <label className="block mt-2" htmlFor="txtEmail">
                    E-mail
                </label>
                <input 
                    type="email" 
                    placeholder="exemplo@email.com" 
                    id="txtEmail" 
                    className="block border px-4 py-2 w-full" 
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />

                <label className="block mt-2" htmlFor="txtSenha">
                    Senha
                </label>
                <input 
                    type="password" 
                    id="txtSenha" 
                    className="block border px-4 py-2 w-full" 
                    value={senha}
                    onChange={(ev) => setSenha(ev.target.value)}
                />

                <button 
                    className="bg-blue-500 block w-full text-white py-2 px-4 mt-4"
                    onClick={enviaFormulario}
                >
                    Entrar
                </button>

                <div className="text-right mt-4">
                    <a href="/criarconta" className="text-blue-500 font-semibold">
                        Ainda não possui uma conta?
                    </a>
                </div>
            </div>
        </div>
    )
}