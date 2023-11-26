import React, { useState } from "react";
import Menu from "../../components/Menu";
import axios from "axios";

export default function CriarConta() {

    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');
    let [senhaConfirma, setSenhaConfirma] = useState('');

    async function enviaFormulario() {
        // Validações
        if (email.length < 3 || senha.length == 0) {
            alert('Você deve digitar um e-mail válido e uma senha.');
            return;
        }

        if(senha != senhaConfirma) {
            alert("Sua senha e confirmação de senha devem ser iguais");
            return;
        }

        // Criação de usuário
        let body = {
            email: email,
            senha: senha
        }

        let resp = await axios.post("http://localhost:3000/usuarios", body);

        alert('Usuário criado: ' + resp.data.id);
    }

    return (
        <div>
            <Menu />
            <div>
            <div className="my-5 mx-4 border p-5 rounded-xl max-w-sm sm:mx-auto">
                <h3 className="text-xl font-bold">
                    Criar Conta
                </h3>

                <label className="block mt-2" htmlFor="txtEmail">
                    Seu e-mail
                </label>
                <input 
                    type="email" 
                    placeholder="email@gmail.com" 
                    id="txtEmail" 
                    className="block border px-4 py-2 w-full" 
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />

                <label className="block mt-2" htmlFor="txtSenha">
                    Sua senha
                </label>
                <input 
                    type="password" 
                    id="txtSenha" 
                    className="block border px-4 py-2 w-full" 
                    value={senha}
                    onChange={(ev) => setSenha(ev.target.value)}
                />

                <label className="block mt-2" htmlFor="txtSenhaConfirma">
                    Confirmação de senha
                </label>
                <input 
                    type="password" 
                    id="txtSenhaConfirma" 
                    className="block border px-4 py-2 w-full" 
                    value={senhaConfirma}
                    onChange={(ev) => setSenhaConfirma(ev.target.value)}
                />

                <button 
                    className="bg-blue-500 block w-full text-white py-2 px-4 mt-4 hover:bg-blue-400 transition duration-300"
                    onClick={enviaFormulario}
                >
                    Criar
                </button>

                <div className="text-right mt-4">
                    <a href="/login" className="text-blue-500 font-semibold">
                        Já possui uma conta? Entre
                    </a>
                </div>
            </div>
            </div>
        </div>
    )
}