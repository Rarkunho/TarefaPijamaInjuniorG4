
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação


const userSchema = z.object({
    nome: z.string().nonempty("O nome não pode ser vazio, tente novamente"),
    usuario: z.string().nonempty("O usuário não pode ser vazio, tente novamente"),
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
                    <h1 className={styles.title}>Registre-se</h1>
                    <form onSubmit={handleSubmit(createUser)} className={styles.form}>
                        <input
                            type='text'
                            className={styles.input}
                            placeholder='Nome'
                            {...register('nome')}
                        />
                        {errors.nome && <span>{errors.nome.message}</span>}

                        <input
                            type='text'
                            className={styles.input}
                            placeholder='Nome de usuario'
                            {...register('usuario')}
                        />
                        {errors.usuario && <span>{errors.usuario.message}</span>}

                        <input
                            type='text'
                            className={styles.input}
                            placeholder='E-mail'
                            {...register('email')}
                        />
                        {errors.email && <span>{errors.email.message}</span>}

                        <input
                            type='password'
                            className={styles.input}
                            placeholder='Senha'
                            {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                        <input
                            type='password'
                            className={styles.input}
                            placeholder='Confirmar senha'
                            {...register('password')}
                        />
                        {errors.password && <span>{errors.password.message}</span>}


                        <div className={styles.botao1}>
                            <button className='botao1'>ENTRAR</button>
                            <hr/>
                            <button className='botao1'>CADASTRE-SE</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
    }

