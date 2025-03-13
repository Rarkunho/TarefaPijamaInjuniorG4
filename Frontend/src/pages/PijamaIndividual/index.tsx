import styles from "./styles.module.css"
import fotoTeste from "../../assets/pijamaTeste.png"
import botaoCoracao from "../../assets/Favorito2.png"
import iconeAdulto from "../../assets/Adulto.png"
import iconeUnissex from "../../assets/estiloUnissex.png"
import iconeInverno from "../../assets/climaInverno.png"
import SizeButton from "../../components/Buttons/SizeButton"
import AddToCartButton from "../../components/Buttons/AddToCartButton"
import QuantityButton from "../../components/Buttons/QuantityButton"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function PijamaIndividual() {
    const navigate = useNavigate()
    const [ativo, setAtivo] = useState<string | null>(null)
    const sizes = ["PP", "P", "M", "G", "GG"]

    function handleSizeButton(size: string) {
        setAtivo(size)
    }

    return (
        <>
            <main className={styles.mainContainer}>
                <div className={styles.container}>
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
                                {sizes.map((size) => (
                                    <SizeButton
                                        key={size}
                                        text={size}
                                        isActive={ativo === size}
                                        onClick={() => handleSizeButton(size)}
                                    />
                                ))}
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
                                onClick={() => navigate("/favoritos")}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.icones}>
                    <img src={iconeInverno} alt="Icone da Estação"/>
                    <img src={iconeUnissex} alt="Icone do Estilo"/>
                    <img src={iconeAdulto} alt="Icone da Faixa Etaria"/>
                </div>
            </main>
            <section className={styles.sectionContainer}>
                <h2>SOBRE NOSSO PIJAMA</h2>
                <p>Esse pijama é perfeito para as noites mais frias do inverno, isso graças ao seu tecido que é de alta qualidade, feito com o mais puro algodão da Suécia. Além disso, sua cor sofisticada traz a sensação de fineza e conforto, o que reflete a alta costura da peça.</p>
                <div className={styles.lista}>
                    <h3>Contém: </h3>
                    <ul>
                        <li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li>
                        <li>Uma calça na cor azul petróleo com estampa poá branca</li>
                    </ul>
                </div>
                <div className={styles.lista}>
                    <h3>Composição: </h3>
                    <ul>
                        <li>100% algodão</li>
                    </ul>
                </div>
            </section>
        </>
    )
}