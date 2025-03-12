
import styles from './styles.module.css';
import Carrossel from '../../components/Carrossel';
import Cards from '../../components/Cards';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src="/scr/assets/LogoHome.png" alt="Logo" />
                    <p>Se os lobos soubessem desse conforto, <br />
                    nem sopravam casas, iam dormir!</p>
                </div>
            </div>
            <div className={styles.carrossel}>
                    <Carrossel />
            </div>
            <section className={styles.corpo}>
                <div className={styles.principios}>
                    <div className={styles.pijamas}> 
                        <img src="/scr/assets/pijamasHome.png" alt="pijamas" /> <br/>
                        <p>Pijamas conformtáveis <br /> e com tecnologia </p>
                    </div>
                    <div className={styles.pessoas}> 
                        <img src="/scr/assets/pessoasHome.png" alt="pessoas" />  <br/>
                        <p>Modelos para todas as <br /> idades e tamanhos</p>
                    </div>
                    <div className={styles.entrega}> 
                        <img src="/scr/assets/deliveryHome.png" alt="caminhao" />  <br/>
                        <p> Frete grátis em todo o <br/> Brasil e exterior</p>
                    </div>
                </div> 
                <div className={styles.titulo}>
                    <h2>Nossas últimas promoções!</h2> 
                </div>
                <div className={styles.promocoes}>
                    <br /> <br /> <br />
                    <Cards /> <Cards /> <Cards />
                </div >
                <div className={styles.titulo}>
                    <h2>Feedbacks</h2> 
                    <br/><br/><br/>
                    {/* cards de feedback */}
                    <br/><br/><br/>  
                </div>
                <div className={styles.botaoFeedback}>
                    <button onClick={() => navigate("/feedback")}>Também quero dar um feedback</button>
                </div>
                 


            </section>
        </div>
    )
}