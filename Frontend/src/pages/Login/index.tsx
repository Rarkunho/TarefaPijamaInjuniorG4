
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação

import { useState } from 'react'; // Importa useState para alternar visibilidade da senha
import olhoSenha from "/src/assets/olhoSenha.png"; // Importe a imagem do ícone de senha



const userSchema = z.object({
    email: z.string().nonempty("O e-mail não pode ser vazio, tente novamente").refine(value=> z.string().email().safeParse(value).success, {
    message: "O e-mail não é válido"
    }),
    password: z.string().nonempty("A senha não pode ser vazia, tente novamente").min(6 , "A senha deve ter no mínimo 6 caracteres"), 
})

type User = z.infer<typeof userSchema>


export default function Login() {
    const{register , handleSubmit , reset , formState: {errors} }= useForm<User>({
        resolver: zodResolver(userSchema)
    })

    const navigate = useNavigate(); // Hook para navegação

    // Estado para alternar visibilidade da senha
    const [mostrarSenha, setMostrarSenha] = useState(false);


    async function createUser(data: User) {
        await new Promise(resolve=> setTimeout(resolve, 2000)) // demorar 2seg
       console.log(data)
       reset()

       // Após o login bem-sucedido, redireciona para a página Home
       navigate('/');
    }
    

    return (
        <main>
            <section className={styles.corpo}> 
                <div className={styles.container}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.text}>Faça login para ter acesso aos <br /> 
                    pijamas dos seus sonhos!</p>
                    <form onSubmit={handleSubmit(createUser)} className={styles.form}>
                        <input
                            type='text'
                            className={styles.input}
                            placeholder='Usuário ou e-mail'
                            {...register('email')}
                        />
                        {errors.email && <span>{errors.email.message}</span>}


                        {/* Campo de senha com ícone de visibilidade */}
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
                        
                        {errors.password && <span>{errors.password.message}</span>}

                        <div className={styles.esqueceuSenha}>
                            <p>Esqueceu a senha?</p>
                        </div>
                        

                        <div className={styles.botao1}>
                            <button className='botao1'>ENTRAR</button>
                            <hr/>
                        </div>
                    </form>
                    <div className={styles.botao2}>
                            <button className='botao2' onClick={() => navigate('/cadastrar')}>
                            CADASTRE-SE </button>
                        </div>
                </div>
            </section>
        </main>
    )
    }

