import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cpf from "cpf";
import { JSX } from "react";

const buyerSchema = z.object({
    nome: z
        .string()
        .nonempty("O nome não pode ser vazio")
        .refine((value) => !/\d/.test(value), {
            message: "Números não são permitidos no nome",
        }),
    cpf: z
        .string()
        .nonempty("O CPF não pode ser vazio")
        .refine((value) => cpf.isValid(value), {
            message: "O CPF não é válido",
        }),
    logradouro: z.string().nonempty("O logradouro não pode ser vazio"),

    cep: z
        .string()
        .nonempty("O CEP não pode ser vazio")
        .regex(/^\d{5}-?\d{3}$/, {
            message:
                "CEP inválido. Deve estar no formato XXXXX-XXX ou XXXXXXXX.",
        }),

    uf: z
        .string()
        .nonempty("A UF não pode ser vazia")
        .max(2)
        .refine((value) => !/\d/.test(value), {
            message: "Números não são permitidos neste campo",
        }),
    cidade: z
        .string()
        .nonempty("A cidade não pode ser vazia, tente novamente")
        .refine((value) => !/\d/.test(value), {
            message: "Números não são permitidos neste campo",
        }),
    numero: z.string().nonempty("O número não pode ser vazio").regex(/^\d+$/, {
        message: "O campo deve conter apenas números.",
    }),
    bairro: z
        .string()
        .nonempty("O bairro não pode ser vazio, tente novamente")
        .refine((value) => !/\d/.test(value), {
            message: "Números não são permitidos neste campo",
        }),
    cartao: z
        .string()
        .nonempty("O número do cartão é obrigatório")
        .regex(/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/, {
            message:
                "Número de cartão inválido. Deve estar no formato XXXX-XXXX-XXXX-XXXX.",
        }),
});

type TModal = "endereco" | "pagamento" | "concluido";

interface ModalProps {
    modalType: TModal;
}

type Buyer = z.infer<typeof buyerSchema>;

export default function Modal({ modalType }: ModalProps): JSX.Element {
    const {
        register,
        formState: { errors },
    } = useForm<Buyer>({
        resolver: zodResolver(buyerSchema),
    });

    return (
        <div className={styles.container}>
            {modalType === "endereco" && (
                <h1 className={styles.title}>Dados</h1>
            )}
            {modalType === "pagamento" && (
                <h1 className={styles.title}>Pagamento</h1>
            )}

            {modalType === "endereco" && (
                <form
                    onSubmit={(e) => void e.preventDefault()}
                    className={styles.form}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Nome"
                        {...register("nome")}
                    />
                    {errors.nome && <span>{errors.nome.message}</span>}

                    <input
                        type="text"
                        className={styles.input}
                        placeholder="CPF"
                        {...register("cpf")}
                    />
                    {errors.cpf && <span>{errors.cpf.message}</span>}

                    <input
                        type="text"
                        className={styles.input}
                        placeholder="CEP"
                        {...register("cep")}
                    />
                    {errors.cep && <span>{errors.cep.message}</span>}

                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Logradouro"
                        {...register("logradouro")}
                    />
                    {errors.logradouro && (
                        <span>{errors.logradouro.message}</span>
                    )}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "355px",
                        }}>
                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: "30%" }}
                            placeholder="UF"
                            {...register("uf")}
                        />
                        {errors.uf && <span>{errors.uf.message}</span>}
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Cidade"
                            style={{ width: "50%", margin: "0" }}
                            {...register("cidade")}
                        />
                        {errors.cidade && <span>{errors.cidade.message}</span>}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "355px",
                        }}>
                        <input
                            type="number"
                            className={styles.input}
                            style={{ width: "30%" }}
                            placeholder="Número"
                            {...register("numero")}
                        />
                        {errors.numero && <span>{errors.numero.message}</span>}

                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: "50%", margin: "0" }}
                            placeholder="Bairro"
                            {...register("bairro")}
                        />
                        {errors.bairro && <span>{errors.bairro.message}</span>}
                    </div>

                    <div className={styles.botao1}>
                        <button className="botao1">ENVIAR</button>
                    </div>
                </form>
            )}

            {modalType === "pagamento" && (
                <form
                    onSubmit={(e) => void e.preventDefault()}
                    className={styles.form}>
                    <select
                        className={styles.input}
                        style={{width: '355px', color: '#00000088'}}
                        id="pagamento"
                        name="pagamento">
                        <option value="">Forma de Pagamento</option>
                        <option value="cartao">Cartão de crédito</option>
                        <option value="pix">
                            PIX (possui 15% de desconto na compra)
                        </option>
                    </select>

                    <select
                        className={styles.input}
                        style={{width: '355px', color: '#00000088'}}
                        id="pagamento"
                        name="pagamento">
                        <option value="">Forma de Pagamento</option>
                        <option value="cartao">Cartão de crédito</option>
                        <option value="pix">
                            PIX (possui 15% de desconto na compra)
                        </option>
                    </select>

                    <input
                        type="numeber"
                        className={styles.input}
                        placeholder="Número do Cartão"
                        {...register("cartao")}
                    />
                    {errors.cartao && <span>{errors.cartao.message}</span>}

                    <div
                        className={styles.botao1}
                        style={
                            modalType == "pagamento"
                                ? { justifyContent: "space-between" }
                                : { justifyContent: "center" }
                        }>
                        {modalType === "pagamento" && (
                            <button className="botao1">{"< Voltar"}</button>
                        )}
                        <button className="botao1">ENVIAR</button>
                    </div>
                </form>
            )}

            {modalType === "concluido" && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "center",
                    }}>
                    <h1 className={styles.sucess}>Sua compra foi concluída!</h1>
                    <p className={styles.sucess__msg}>
                        Obrigada por comprar conosco!
                    </p>
                </div>
            )}
        </div>
    );
}
