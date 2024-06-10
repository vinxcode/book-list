import { create } from 'zustand'

export const useStore = create((set) => ({
    disponibles: [],
    listaLectura: [],
    fetchDisponibles: (newDisponibles) => set((state) => ({ disponibles: newDisponibles })),
    addBook: (newItem) => set((state) => ({ listaLectura: [...state.listaLectura, newItem]})),
    updateDisponibles: (newDisponibles) => set((state) => ({ disponibles: newDisponibles })),
    updateListaLectura: (newListaLectura) => set((state) => ({ listaLectura: newListaLectura })),
}))

