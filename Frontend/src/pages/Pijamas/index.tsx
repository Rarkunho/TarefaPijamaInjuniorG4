import styles from "./styles.module.css"
import botao from "../../assets/lupa.png"
import Cards from "../../components/Cards"
import { useParams } from "react-router-dom";
import usePijamaStore from "../../stores/usePijamaStore";
import { useEffect } from "react";

type GenreParams = Record<string, string | undefined>;

export default function Pijamas() {
    const { genre } = useParams<GenreParams>();
    const { pijamas, getPijamas, filterByGender, filterByType, filterByStation} = usePijamaStore(); 

    useEffect(() => {
        getPijamas();
      }, [getPijamas]);

    return (
        <>
        <div className={styles.fundo}>
            <section className={styles.container}>
                <div className={styles.busca}>
                    <input 
                        className={styles.search}
                        placeholder={`Pesquise pelo produto...`}
                        //value={filtro}
                    // onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button>
                        <img src={botao} alt="Botão de Pesquisa"/>
                    </button>
                </div>
                <div className={styles.filtro}>
                    <select>
                        <option selected disabled>Gênero</option>
                        <option value="todos">Todos</option>
                        <option value="unissex">Unissex</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="familia">Família</option>
                    </select>
                    <select>
                        <option selected disabled>Tipo</option>
                        <option value="todos">Todos</option>
                        <option value="adulto">Adulto</option>
                        <option value="infantil">Infantil</option>
                    </select>
                    <select>
                        <option selected disabled>Estação</option>
                        <option value="todos">Todos</option>
                        <option value="inverno">Inverno</option>
                        <option value="verao">Verão</option>
                    </select>
                </div>
            </section>
            <main className={styles.principal}>
                <ul className={styles.pijamas}>
                {pijamas.map((pijama, index) => (
                    <Cards 
                        key={index} 
                        pijama={pijama} 
                    />
                ))}
                </ul>
            </main>
        </div>
        </>
    )
}