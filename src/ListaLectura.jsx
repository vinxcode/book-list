import React from 'react'
import { useState } from 'react'
import { useStore } from './store/store'

const ListaLectura = () => {

    const [isListaLectura, setIsListaLectura] = useState(false)

    const disponibles = useStore((state) => state.disponibles)
    const fetchDisponibles = useStore((state) => state.fetchDisponibles)
    const listaLectura = useStore((state) => state.listaLectura)
    const updateListaLectura = useStore((state) => state.updateListaLectura)

    return listaLectura &&
        (
            <div>
                {
                    listaLectura.map((book, index) => (
                        <div key={index}>
                            <p>{book.book.title}</p>
                        </div>
                    ))
                }
            </div>
        )
}   

export default ListaLectura