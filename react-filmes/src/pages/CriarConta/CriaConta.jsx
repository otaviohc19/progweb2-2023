import React from "react";
import Menu from "../../components/Menu";

export default function CriarConta() {

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
                <input type="email" placeholder="email@gmail.com" id="txtEmail" className="block border px-4 py-2 w-full" />

                <label className="block mt-2" htmlFor="txtSenha">
                    Sua senha
                </label>
                <input type="password" id="txtSenha" className="block border px-4 py-2 w-full" />

                <label className="block mt-2" htmlFor="txtSenhaConfirma">
                    Confirmação de senha
                </label>
                <input type="password" id="txtSenhaConfirma" className="block border px-4 py-2 w-full" />

                <button className="bg-blue-500 block w-full text-white py-2 px-4 mt-4">
                    Criar
                </button>

                <div className="text-right mt-4">
                    <a href="/" className="text-blue-500 font-semibold">
                        Já possui uma conta? Entre
                    </a>
                </div>
            </div>
            </div>
        </div>
    )
}