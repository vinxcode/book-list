import { create } from 'zustand'

export const useStore = create((set) => ({
    disponibles: [],
    listaLectura: [],
    fetchDisponibles: (newDisponibles) => set((state) => ({ disponibles: newDisponibles })),
    updateListaLectura: (newItem) => set((state) => ({ listaLectura: [...state.listaLectura, newItem]})),
}))

