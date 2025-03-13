import styles from "./styles.module.css";
import logoCarrinho from "../../assets/ComprasActive.png";
import logoFavoritos from "../../assets/FavoritoInactive.png";
import { useNavigate } from "react-router-dom";
import fotoTeste from "../../assets/pijamaTeste.png"
import SizeButton from "../../components/Buttons/SizeButton"

import QuantityButton from "../../components/Buttons/QuantityButton"



export default function Carrinho() {
    const navigate = useNavigate(); 
    
    return (
        <>
            <nav className={styles.nav}>
                <img
                    className={`${styles.title}`}
                    src={logoCarrinho}
                    alt="Ícone de Carrinhos"
                    onClick={() => navigate("/carrinho")}
                />
                <h2 className={`${styles.title}`} onClick={() => navigate("/carrinho")}>
                    Carrinho
                </h2>
                <img
                    className={`${styles.title} ${styles.inactive}`}
                    src={logoFavoritos}
                    alt="Ícone de Favoritos"
                    onClick={() => navigate("/favoritos")}
                />
                <h2 className={`${styles.title} ${styles.inactive}`}  onClick={() => navigate("/favoritos")}>Favoritos</h2>
            </nav>
            <main className={`${styles.fundo} ${styles.main}`}>
                <div className={styles.cart__container}>
                    
                    <div className={styles.cart__item}>
                        <div style={{display: "flex", gap: "2.7rem"}}>
                            <img className={styles.cart__item__img} src={fotoTeste} alt="Foto do Pijama"/>
                            <div className={styles.cart__item__infosize}>
                                <div className={styles.cart__item__title}>
                                    <h2>PIJAMA FEMININO LONGO - ESTAMPA POÁ</h2>
                                    <p className={styles.cart__item__ref}>Ref: #123456</p>
                                </div>
                                <SizeButton
                                text='M'
                                isActive={true} onClick={function (): void {} }
                                />
                            </div>
                        </div>
                        <div className={styles.cart__item__qtdprice}>
                            <div></div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap:'2.7rem'}}>
                                <div className={styles.quantidade}>
                                    <h2 className={styles.tituloItalico}>Quantidade: </h2>
                                    <QuantityButton/>
                                </div>
                                <h2 className={styles.cart__item__price}>R$ 78,90</h2>
                            </div>
                            <p className={styles.cart__item__msg}>Ainda temos <span>x</span> peças do tamanho escolhido <br/>em nosso estoque!</p>
                        </div>
                    </div>
                    <div className={styles.cart__item}>
                        <div style={{display: "flex", gap: "2.7rem"}}>
                            <img className={styles.cart__item__img} src={fotoTeste} alt="Foto do Pijama"/>
                            <div className={styles.cart__item__infosize}>
                                <div className={styles.cart__item__title}>
                                    <h2>PIJAMA FEMININO LONGO - ESTAMPA POÁ</h2>
                                    <p className={styles.cart__item__ref}>Ref: #123456</p>
                                </div>
                                <SizeButton
                                text='M'
                                isActive={true} onClick={function (): void {} }
                                />
                            </div>
                        </div>
                        <div className={styles.cart__item__qtdprice}>
                            <div></div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap:'2.7rem'}}>
                                <div className={styles.quantidade}>
                                    <h2 className={styles.tituloItalico}>Quantidade: </h2>
                                    <QuantityButton/>
                                </div>
                                <h2 className={styles.cart__item__price}>R$ 78,90</h2>
                            </div>
                            <p className={styles.cart__item__msg}>Ainda temos <span>x</span> peças do tamanho escolhido <br/>em nosso estoque!</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}