import { create } from "zustand";
import api from "../services/api";
import Pijama from "../types/Pijama";
import PijamaSizes from "../types/PijamaSizes";

interface CartItem{
    pijama: Pijama;
    size: string;
    quantity: number;
    stock: number;
}

interface PijamaStore {
    pijamas: Pijama[]
    pijamaSelecionado?: Pijama
    pijamaSizes?: PijamaSizes
    cartItems: CartItem[];
    getPijamas: () => Promise<void>
    filterByGender: (gender: string) => Promise<void>
    filterByType: (type: string) => Promise<void>
    filterBySeason: (station: string) => Promise<void>
    filterById: (id: string) => Promise<void>
    filterByFavorite: () => Promise<void>
    addToFavorite: (id: string) => Promise<void>
    filterBySizes: (id: string, size: string) => Promise<void>
    removeFromCart: (pijamaId: string) => void;
    addToCart: (item:CartItem) => void;
    getCart: ()=> void; 
}



const usePijamaStore = create<PijamaStore>((set) => (
    {
        pijamas: [],
        pijamaSelecionado: undefined,
        pijamaSizes: undefined,
        cartItems: [],
        getPijamas: async () => {
            try {
                const response = await api.get("/pajamas")
                console.log(response.data.pajamas, "pijamas store");
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao buscar os pijamas:", error)
            }
        },
        filterByFavorite: async () => {
            try {
                const response = await api.get("/pajamas?favorite=true")
                console.log(response.data.pajamas, "pijamas store");
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
            } catch (error) {
                console.error("Erro ao buscar os pijamas:", error)
            }
        },

        filterByGender: async (gender: string) => {
            try {
                const response = await api.get("/pajamas", {
                    params: { gender }
                })
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
            } catch (error) {
                console.error("Erro ao filtrar por gênero:", error)
            }
        },
        filterByType: async (type: string) => {
            try {
                const response = await api.get("/pajamas", {
                    params: { type }
                })
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
            } catch (error) {
                console.error("Erro ao filtrar por tipo:", error)
            }
        },
        filterBySeason: async (season: string) => {
            try {
                const response = await api.get("/pajamas", {
                    params: { season }
                })
                //console.log(response.data)
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
            } catch (error) {
                console.error("Erro ao filtrar por estação:", error)
            }
        },
        filterById: async (id: string) => {
            try {
                const response = await api.get("/pajamas", {
                    params: { id }
                });
                console.log("resposta: ", response.data.pajamas)
                const pijamaSelecionado = response.data.pajamas.find((pijama: Pijama) => pijama.id === id)
                set({ pijamaSelecionado })
            } catch (error) {
                console.error("Erro ao buscar pijama pelo ID:", error);
            }
        },
        addToFavorite: async (id: string) => {
            try {
                const response = await api.patch(`/pajamas/${id}`, {
                    favorite: true
                })
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
            } catch (error){
                console.error("Erro ao adicionar pijama aos favoritos:", error)
            }
        },
        filterBySizes: async (id: string, size: string) => {
            try {
                const resposta = await api.get(`/pajamas/stock/${encodeURIComponent(id)}/${encodeURIComponent(size)}`)
                console.log("resposta do sizes",resposta.data)
                set({ pijamaSizes: resposta.data })
            } catch (error) {
                console.error("Erro ao buscar tamanhos de pijama pelo ID:", error);
            }
        },
        addToCart: (item: CartItem) => {
            set((state) => ({
                cartItems: [...state.cartItems, item]
            }))
        },
        removeFromCart: (pijamaId: string) => {
            set((state) => ({
                cartItems: state.cartItems.filter((item) => item.pijama.id !== pijamaId),
            }))
        },
        getCart: () => {
            set((state) => ({
                cartItems: state.cartItems
            }))
        }
}))

export default usePijamaStore



