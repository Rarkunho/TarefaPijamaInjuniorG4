import styles from "./styles.module.css"
import botaoCoracao from "../../assets/Favorito2.png"
import iconeAdulto from "../../assets/Adulto.png"
import iconeCrianca from "../../assets/tipoInfantil.png"
import iconeFamilia from "../../assets/generoFamilia.png"
import iconeFeminino from "../../assets/generoFeminino.png"
import iconeMasculino from "../../assets/generoMasculino.png"
import iconeUnissex from "../../assets/estiloUnissex.png"
import iconeInverno from "../../assets/climaInverno.png"
import iconeVerao from "../../assets/estacaoVerao.png"
import SizeButton from "../../components/Buttons/SizeButton"
import AddToCartButton from "../../components/Buttons/AddToCartButton"
import QuantityButton from "../../components/Buttons/QuantityButton"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import usePijamaStore from "../../stores/usePijamaStore"
import formatarPreco from "../../hooks/usePrice"

const icones = {
    season: {
        WINTER: iconeInverno,
        SUMMER: iconeVerao,
    },
    gender: {
        UNISEX: iconeUnissex,
        FEMALE: iconeFeminino,
        MALE: iconeMasculino,
        FAMILY: iconeFamilia
    },
    type: {
        ADULT: iconeAdulto,
        CHILD: iconeCrianca,
    }
} as const

type GenreParams = Record<string, string | undefined>;

export default function PijamaIndividual() {
    const { id } = useParams<GenreParams>()
    //console.log(id)
    const { pijamaSelecionado, pijamaSizes, filterById, addToFavorite, filterBySizes} = usePijamaStore()
    const [ativo, setAtivo] = useState<string | null>(null)
    const [preco, setPreco] = useState<number>(pijamaSelecionado?.price || 0)
    const [precoPix, setPrecoPix] = useState<number>(pijamaSelecionado?.price || 0)
    const navigate = useNavigate()
    const [counter, setCounter] = useState(1);

    const sizes = ["PP", "P", "M", "G", "GG"]


    useEffect(() => {
        if (id) {
            //console.log("Chamando filterById com ID:", id)
            filterById(id)
        } else {
            console.error("ID está indefinido!")
        }
    }, [id, filterById])

    useEffect(() => {
        if (pijamaSelecionado) {
            let novoPreco = pijamaSelecionado.price;

            if (pijamaSelecionado.salePercent && pijamaSelecionado.salePercent > 0) {
                novoPreco = pijamaSelecionado.price - (pijamaSelecionado.price * (pijamaSelecionado.salePercent / 100))
            }

            setPreco(novoPreco)
            setPrecoPix(novoPreco - (novoPreco * 0.15))
        }
    }, [pijamaSelecionado])

    


    function handleSizeButton(size: string) {
        if (size !== ativo) {
            setAtivo(size);
            if (pijamaSelecionado && pijamaSelecionado.id) {
                //console.log(pijamaSelecionado.id)
                //console.log("o size é", size)
                filterBySizes(pijamaSelecionado.id, size);
                //console.log("pijamaSizes é ",pijamaSizes)
            }
        }
    }

    function handleClickFavorite() {
        if (pijamaSelecionado) {
            addToFavorite(pijamaSelecionado.id)
            //console.log(pijamaSelecionado.id)
            navigate("/favoritos")
        }
    }

    function getIcon<T extends object>(obj: T, key?: string | number) {
        if (typeof key === "number") {
            key = String(key)
        }
        return key && key.toUpperCase() in obj ? obj[key.toUpperCase() as keyof T] : null
    }

    const estacaoIcon = getIcon(icones.season, pijamaSelecionado?.season)
    const estiloIcon = getIcon(icones.gender, pijamaSelecionado?.gender)
    const faixaEtariaIcon = getIcon(icones.type, pijamaSelecionado?.type)

    if (!pijamaSelecionado) {
        return <p>Carregando...</p>;
    }


    return (
        <>
            <main className={styles.mainContainer}>
                <div className={styles.container}>
                    <img src={pijamaSelecionado.image} alt="Foto do Pijama"/>
                    <div className={styles.info}>
                        <div className={styles.titulo}>
                            <h2>{pijamaSelecionado.name}</h2>
                            <p>Ref: {pijamaSelecionado.id}</p>
                        </div>
                        <div className={styles.preco}>
                            <div>
                                <h2>{formatarPreco(preco)}</h2>
                                <p>6x de <span>{formatarPreco(preco / 6)}</span></p>
                            </div>
                            <h3>Ou por <span>{formatarPreco(precoPix)}</span> no PIX</h3>
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
                            <p>Ainda temos <span>{pijamaSizes && pijamaSizes.stockQuantity}</span> peças do tamanho escolhido <br/>em nosso estoque!</p>
                        </div>
                        <div className={styles.quantidade}>
                            <h2 className={styles.tituloItalico}>Quantidade: </h2>
                            <QuantityButton numberSizes={pijamaSizes?.stockQuantity || 0} onCounterChange={setCounter}/>
                        </div>
                        <div className={styles.carrinho}>
                            <AddToCartButton pijamaSelecionado={pijamaSelecionado} quantidade={counter} /> 
                            <img className={styles.favoritos} 
                                src={botaoCoracao} 
                                alt="Ícone de Favoritos"
                                onClick={pijamaSelecionado.favorite ? undefined : handleClickFavorite}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.icones}>
                    {estacaoIcon && <img src={estacaoIcon} alt="Ícone da Estação"/>}
                    {estiloIcon && <img src={estiloIcon} alt="Ícone do Estilo"/>}
                    {faixaEtariaIcon && <img src={faixaEtariaIcon} alt="Ícone da Faixa Etária"/>}
                </div>
            </main>
            <section className={styles.sectionContainer}>
                <h2>SOBRE NOSSO PIJAMA</h2>
                <p>{pijamaSelecionado.description}</p>
                <div className={styles.lista}>
                    <h3>Contém: </h3>
                    <ul>
                        <li>Uma blusa </li>
                        <li>Uma calça </li>
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