import styles from "./styles.module.css"
import logo from "../../assets/LogoHeader.png"
import logoCarrinho from "../../assets/Compras.png"
import logoFavoritos from "../../assets/Favorito.png"
import logoPerfil from "../../assets/User.png"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()

    return (
        <>
            <header>
                <img className={styles.logo} 
                    src={logo} 
                    alt="Logo da Loja"
                    onClick={() => navigate("/")}
                />
                <nav>
                    <p onClick={() => navigate("/pijamas")}>Pijamas</p>
                    <p onClick={() => navigate("/pijamas/feminino")}>Feminino</p>
                    <p onClick={() => navigate("/pijamas/masculino")}>Masculino</p>
                    <p onClick={() => navigate("/pijamas/infantil")}>Infantil</p>
                </nav>
                <div className={styles.container}>
                    <div>
                        <img className={styles.carrinho} 
                            src={logoCarrinho} 
                            alt="Ícone de Carrinhos"
                            onClick={() => navigate("/carrinho")}
                        />
                        <img className={styles.favoritos} 
                            src={logoFavoritos} 
                            alt="Ícone de Favoritos"
                            onClick={() => navigate("/favoritos")}
                        />
                    </div>
                    <img className={styles.perfil} 
                        src={logoPerfil} 
                        alt="Ícone de Perfil"
                        onClick={() => navigate("/login")}
                    />
                </div>
            </header>
        </>
    )
}