import { useEffect, useState } from "react"
import type { TipoLogin } from "../../types/tipoLogin";
import { useForm } from "react-hook-form";
import type { TipoUsuarioLogado } from "../../types/TipoUsuarioLogado";
import { Navigate, replace } from "react-router-dom";


export default function Login(){
    useEffect(() => {
        document.title = "Login";
    }, []);

    const [aviso, setAviso] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<TipoLogin>({mode: "onBlur"});

    const onlyDigits = (value: string) => value.replace(/\D/g, "");

    const onSubmit = async (data: TipoLogin) => {
        setAviso(null);
        try {
            const payload = {
                cpf: onlyDigits(data.cpf),
                senha: data.senha,
            };
// tem q alterar esse para a api de java
            const resp = await fetch(`${API}/paciente/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });

            if (resp.status === 401){
                const msg = await resp.text();
                setAviso(msg || "Cpf ou senha inválidos.");
                return;
            }

            if (!resp.ok){
                const msg = await resp.text();
                setAviso(msg || `Erro no servidor (${resp.status}).`);
                return;
            }

            const dataJson = (await resp.json()) as Partial<TipoUsuarioLogado>;
            if (typeof dataJson.id !== "number") {
                setAviso("Login realizado, mas não recebi o ID do paciente.");
                return;
            }

            const usuario: TipoUsuarioLogado = {
                id: dataJson.id,
                cpf: dataJson.cpf ?? payload.cpf,
                nome: dataJson.nome,
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            Navigate("/SmProjeto", { replace: true});

        } catch (e){
            console.error(e);
            setAviso("Erro de conexão com a API")
        }
    }

    
    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <h2>Entre no site com uma conta nova</h2>
                <div>
                    <label htmlFor="cpf">Cpf</label>
                    <input id="cpf" inputMode="numeric" placeholder="Somente números"
                    className="form-input"
                    {...register("cpf", {
                        required: "Informe seu CPF",
                        validate: v => 
                            onlyDigits(v).length === 11 || "CPF deve ter 11 dígitos"
                    
                    })}/>
                    {errors.cpf && <span>{errors.cpf.message}</span>}
                </div>

                <div>
                    <label htmlFor="senha">Senha</label>
                    <input 
                    id="senha"
                    type="password"
                    {...register("senha",{
                        required: "informe a senha",
                    })} />
                    {errors.senha && <span>{errors.senha.message}</span>}
                </div>

                {aviso && <p>{aviso}</p>}

                <button type="submit">Entrar</button>
            </form>
        </main>
    )
}