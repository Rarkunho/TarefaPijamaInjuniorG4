import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react'; 
import olhoSenha from "/src/assets/olhoSenha.png"; 

// Validação no back
const userSchema = z.object({
    identifier: z.string()
        .nonempty("O campo não pode estar vazio")
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[A-Za-z0-9]+$/.test(value), {
            message: "Digite um e-mail válido ou um nome de usuário sem espaços",
        }),

    password: z.string()
        .nonempty("A senha não pode ser vazia")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type User = z.infer<typeof userSchema>;

export default function Login() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<User>({
        resolver: zodResolver(userSchema)
    });

    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); //mensagem de erro

    async function loginUser(data: User) {
        setErrorMessage(""); 

        try {
            const response = await fetch("http://localhost:3434/users/login", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: data.identifier, // 
                    password: data.password
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erro ao fazer login");
            }

            // Se der certo vai pra Home
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    return (
        <main>
            <section className={styles.corpo}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.text}>Faça login para acessar nossa loja!</p>

                    {errorMessage && <span className={styles.error}>{errorMessage}</span>}

                    <form onSubmit={handleSubmit(loginUser)} className={styles.form}>
                        {/* usuário ou e-mail */}
                        <input
                            type='text'
                            className={styles.input}
                            placeholder='Usuário ou e-mail'
                            {...register('identifier')}
                        />
                        {errors.identifier && <span className={styles.error}>{errors.identifier.message}</span>}

                        {/* senha */}
                        <div className={styles.campoSenha}>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                className={styles.input}
                                placeholder="Senha"
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className={styles.toggleSenha}
                            >
                                <img
                                    src={olhoSenha}
                                    alt="Mostrar senha"
                                    className={styles.iconeSenha}
                                />
                            </button>
                        </div>

                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

                        <div className={styles.esqueceuSenha}>
                            <p>Esqueceu a senha?</p>
                        </div>

                        <div className={styles.botao1}>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Entrando..." : "ENTRAR"}
                            </button>
                            <hr />
                        </div>
                    </form>

                    <div className={styles.botao2}>
                        <button onClick={() => navigate('/cadastrar')}>CADASTRE-SE</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
