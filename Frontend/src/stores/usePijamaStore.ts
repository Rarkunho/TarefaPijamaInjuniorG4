import { create } from "zustand";
import api from "../services/api";
import Pijama from "../types/Pijama";

interface PijamaStore {
    pijamas: Pijama[]
    getPijamas: () => Promise<void>
    filterByGender: (gender: string) => Promise<void>
    filterByType: (type: string) => Promise<void>
    filterBySeason: (station: string) => Promise<void>
    filterById: (key: number) => Promise<void>
}



const usePijamaStore = create<PijamaStore>((set) => (
    {
        pijamas: [],
        getPijamas: async () => {
            try {
                const response = await api.get("/pajamas")
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
        filterById: async (id) => {
            try {
                const response = await api.get("/pajamas", {
                    params: { id }
                })
                set({ pijamas: Array.isArray(response.data.pajamas) ? response.data.pajamas : [] })
            } catch (error) {
                console.error("Erro ao buscar pijama pelo ID:", error)
            }
        }
    }
))

export default usePijamaStore



