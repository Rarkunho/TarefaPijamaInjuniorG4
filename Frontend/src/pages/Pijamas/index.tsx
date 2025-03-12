import styles from "./styles.module.css"
import botao from "../../assets/lupa.png"
import Cards from "../../components/Cards"

export default function Pijamas() {
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
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                    <Cards/>
                </ul>
            </main>
        </div>
        </>
    )
}