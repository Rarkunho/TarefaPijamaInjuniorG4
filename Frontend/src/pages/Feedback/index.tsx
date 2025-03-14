import styles from "./styles.module.css"


export default function Login() {


    return (
        <main>
            <section className={styles.corpo}> 
                <div className={styles.container}>
                    <h1 className={styles.title}>Feedbacks</h1>
                    <p className={styles.text}>Fale um pouco sobre a sua <br /> experiência com a nossa loja!  </p>
                    <form className={styles.form}>
                        <input
                            type='text'
                            className={styles.input}
                            placeholder='Nome completo'
                        />

                        <input
                            type='text'
                            className={styles.descricao}
                            placeholder='Descrição detalhada'
                        />
        

                        <div className={styles.botao1}>
                            <button className='botao1'>ENTRAR</button>
                        
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
    }

