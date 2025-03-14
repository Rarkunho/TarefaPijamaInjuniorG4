import styles from "./styles.module.css"

export default function Footer() {
    return (
        <footer>
        <div className={styles.footer}>
            <div className={styles.sobre}> 
                <div className={styles.endereco}>
                    <h3>Endereço</h3> <br/>
                    <p> Av. Milton Tavares de Souza, <br /> 
                    s/n - Sala 115 B Boa Viagem,<br /> 
                    Niterói - RJ CEP: 24210-315 </p> <br/><br/>
                </div>
                <div className={styles.contato}>
                    <h3>Fale Conosco</h3> <br/>
                    <p>contato@injunior.com.br</p> <br/>
                </div>
                <div className={styles.redes}>
                    <img src="/src/assets/instagramFooter.png" alt="instagram" />
                    <img src="/src/assets/facebookFooter.png" alt="facebook" />
                    <img src="/src/assets/linkedinFooter.png" alt="linkedIn" />
                </div>
            </div>
            <div className={styles.logo}>
                <img src="/src/assets/LogoFooter.png" alt="logo"/>
            </div>
            <div className={styles.Iframe}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.187187535958!2d-43.135291996675456!3d-22.906465576854902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817e444e692b%3A0xfd5e35fb577af2f5!2sUFF%20-%20Instituto%20de%20Computa%C3%A7%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1741713329543!5m2!1spt-BR!2sbr" width="320" height="230" ></iframe>
            </div>
            
        </div>
        <div className={styles.copy}>
            <p>© Copyright 2025. IN Junior. Todos os direitos reservados. Niterói, Brasil.</p>
        </div>    
    </footer>             
    )
}