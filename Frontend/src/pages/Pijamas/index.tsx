import styles from "./styles.module.css"
import botao from "../../assets/lupa.png"
import Cards from "../../components/Cards"
import { useParams } from 'react-router-dom';
import usePijamaStore from "../../stores/usePijamaStore";
import { useEffect, useState } from "react";
import Pagination from "../../components/Paginacao";
import Pijama from "../../types/Pijama";

type GenreParams = Record<string, string | undefined>;


export default function Pijamas() {
    const { param } = useParams<GenreParams>()
    const { pijamas, getPijamas, filterByGender, filterByType, filterBySeason} = usePijamaStore() 
    
    const [genderFilter, setGenderFilter] = useState<string>(param || "todos")
    const [typeFilter, setTypeFilter] = useState<string>(param || "todos")
    const [seasonFilter, setSeasonFilter] = useState<string>('todos')
    const [filtro, setFiltro] = useState<string>("")
    const [filteredPijamas, setFilteredPijamas] = useState<Pijama[]>([])
    const [paginaAtual, setPaginaAtual] = useState<number>(1)

    const genderOptions = ["MALE", "FEMALE", "UNISEX", "FAMILY"]
    const typeOptions = ["ADULT", "CHILD"]
    const itensPorPagina = 12

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const pijamasPaginados = filteredPijamas.slice(indiceInicial, indiceFinal);

    const totalPaginas = Math.ceil(pijamas.length / itensPorPagina);


    // renderiza todos os pijamas
    useEffect(() => {
        getPijamas(); // dispara a atualização
    }, [getPijamas]);


    //renderiza os pijamas com base nos filtros do select
    useEffect(() => {
        let result = pijamas
            .filter(pijama => (genderFilter === "todos" || pijama.gender === genderFilter))
            .filter(pijama => (typeFilter === "todos" || pijama.type === typeFilter))
            .filter(pijama => (seasonFilter === "todos" || pijama.season === seasonFilter))

        setFilteredPijamas(result)
    }, [genderFilter, typeFilter, seasonFilter, pijamas, filtro])

   // useEffect(() => {
    //    if (genderFilter !== "todos") {
    //        filterByGender(genderFilter) 
    //    }
   // }, [genderFilter, filterByGender])

    //useEffect(() => {
     //   if (typeFilter !== "todos") {
      //      filterByType(typeFilter); 
     //   }
    //}, [typeFilter, filterByType])

    //useEffect(() => {
     //   if (seasonFilter !== "todos") {
      //      filterBySeason(seasonFilter); 
       // }
    //}, [seasonFilter, filterBySeason])

    //funcções para atualizar os filtros

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenderFilter(event.target.value);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value);
    }

    const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeasonFilter(event.target.value);
    }


    function handleSearch() {
        let result = pijamas;

        if (filtro) {
            result = result.filter(pijama =>
                pijama.name.toLowerCase().includes(filtro.toLowerCase())
            );
        }

        setFilteredPijamas(result)
    }


    //renderiza as paginas Feminino, Masculino e Infantil ajustando os valores de filtro
    useEffect(() => {
        if (param) {
            if (genderOptions.includes(param)) {
                setGenderFilter(param)
                setTypeFilter("todos")
                setSeasonFilter("todos")
            }
            else if (typeOptions.includes(param)) {
                setTypeFilter(param)
                setGenderFilter("todos")
                setSeasonFilter("todos")
            }
        } else {
            getPijamas()
            setGenderFilter("todos")
            setTypeFilter("todos")
            setSeasonFilter("todos")
        }   
    }, [param])



    return (
        <>
        <div className={styles.fundo}>
            <section className={styles.container}>
                <div className={styles.busca}>
                    <input 
                        placeholder={`Pesquise pelo produto...`}
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button onClick={handleSearch}
                    >
                        <img src={botao} alt="Botão de Pesquisa"/>
                    </button>
                </div>
                <div className={styles.filtro}>
                    <select value={genderFilter} onChange={handleGenderChange}>
                        <option value="todos" disabled={genderFilter !== 'todos'}>
                            Gênero
                        </option>
                        <option value="UNISEX">Unissex</option>
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                        <option value="FAMILY">Família</option>
                    </select>
                    <select value={typeFilter} onChange={handleTypeChange}>
                        <option value="todos" disabled={typeFilter !== 'todos'}>
                            Tipo
                        </option>
                        <option value="ADULT">Adulto</option>
                        <option value="CHILD">Infantil</option>
                    </select>
                    <select value={seasonFilter} onChange={handleSeasonChange}>
                        <option value="todos" disabled={seasonFilter !== 'todos'}>
                            Estação
                        </option>
                        <option value="WINTER">Inverno</option>
                        <option value="SUMMER">Verão</option>
                    </select>
                </div>
            </section>
            <main className={styles.principal}>
                <ul className={styles.pijamas}>
                {pijamasPaginados.map((pijama, index) => (
                    <Cards 
                        key={index} 
                        pijama={pijama} 
                    />
                ))}
                </ul>
                <div className={styles.paginacao}>
                    <Pagination 
                        totalPages={totalPaginas} 
                        currentPage={paginaAtual} 
                        onPageChange={setPaginaAtual} 
                    />
            </div>
            </main>
        </div>
        </>
    )
}
