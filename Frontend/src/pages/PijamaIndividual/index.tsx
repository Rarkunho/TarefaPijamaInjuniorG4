import styles from "./styles.module.css"
import fotoTeste from "../../assets/pijamaTeste.png"
import botaoCoracao from "../../assets/Favorito2.png"
import SizeButton from "../../components/Buttons/SizeButton"
import AddToCartButton from "../../components/Buttons/AddToCartButton"
import QuantityButton from "../../components/Buttons/QuantityButton"

export default function PijamaIndividual() {
    return (
        <>
            <main className={styles.container}>
                <img src={fotoTeste} alt="Foto do Pijama"/>
                <div className={styles.info}>
                    <div className={styles.titulo}>
                        <h2>PIJAMA FEMININO LONGO - ESTAMPA POÁ</h2>
                        <p>Ref: #123456</p>
                    </div>
                    <div className={styles.preco}>
                        <div>
                            <h2>R$ 78,90</h2>
                            <p>6x de <span>R$ 00,00</span></p>
                        </div>
                        <h3>Ou por <span>R$ 00,00</span> no PIX</h3>
                    </div>
                    <div className={styles.size}>
                        <h2 className={styles.tituloItalico}>Tamanhos:</h2>
                        <div>
                            <SizeButton/>
                            <SizeButton/>
                            <SizeButton/>
                            <SizeButton/>
                            <SizeButton/>
                        </div>
                        <p>Ainda temos <span>x</span> peças do tamanho escolhido <br/>em nosso estoque!</p>
                    </div>
                    <div className={styles.quantidade}>
                        <h2 className={styles.tituloItalico}>Quantidade: </h2>
                        <QuantityButton/>
                    </div>
                    <div className={styles.carrinho}>
                        <AddToCartButton/> 
                        <img className={styles.favoritos} 
                            src={botaoCoracao} 
                            alt="Ícone de Favoritos"
                            //onClick={() => navigate("/favoritos")}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}