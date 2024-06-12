import { create } from 'zustand'

export const useStore = create((set) => ({
    data: [],
    disponibles: [],
    listaLectura: [],
    fetchDisponibles: (newDisponibles) => set((state) => ({ disponibles: newDisponibles, data: newDisponibles })),
    addBook: (newItem) => set((state) => ({ listaLectura: [...state.listaLectura, newItem] })),
    updateDisponibles: (newDisponibles) => set((state) => ({ disponibles: newDisponibles })),
    updateListaLectura: (newListaLectura) => set((state) => ({ listaLectura: newListaLectura })),
}))

/*
    Data va a funcionar como un array que no cambia nunca y que va a servir como una referencia de todos los libros
    ya que estos no van a cambiar nunca.

    DISPONIBLES va a funcionar como una version parcial y cambiable de los datos,
    de modo que se le pueda aplicar filtros y reducir y aumentar su tama;o con respecto a DATA, pero 
    siempre DATA debe ser la referencia para llenar DISPONIBLES basado en DATA

    Habria que crear un metodo para que data se llene de los datos de disponibles en el fetching de datos
*/