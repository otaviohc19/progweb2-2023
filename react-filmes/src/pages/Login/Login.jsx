import React from "react";
import Menu from "../../components/Menu";

export default function Login() {

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
                <input type="email" placeholder="email@gmail.com" id="txtEmail" className="block border px-4 py-2 w-full" />

                <label className="block mt-2" htmlFor="txtSenha">
                    Senha
                </label>
                <input type="password" id="txtSenha" className="block border px-4 py-2 w-full" />

                <button className="bg-blue-500 block w-full text-white py-2 px-4 mt-4">
                    Enviar
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