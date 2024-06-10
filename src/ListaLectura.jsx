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
            <section className='m-3 p-4 bg-white shadow-lg rounded-xl'>
                <h2>Lista de lectura</h2>
                <div className='grid grid-cols-6'>
                    {
                        listaLectura.map((book, index) => (
                            <div key={index} className='flex flex-col items-end justify-start gap-1'>
                                <button className='text-red-600 p-1 mb-[-6px] rounded-full text-xs font-semibold'>x</button>
                                <img src={book.book.cover} alt="Imagen" className='h-auto w-10' />
                                
                            </div>
                        ))
                    }
                </div>
            </section>
        )
}

export default ListaLectura