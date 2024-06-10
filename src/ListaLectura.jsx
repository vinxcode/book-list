import React from 'react'
import { useStore } from './store/store'

const ListaLectura = () => {

    const disponibles = useStore((state) => state.disponibles)
    const listaLectura = useStore((state) => state.listaLectura)
    const updateListaLectura = useStore((state) => state.updateListaLectura)
    const updateDisponibles = useStore((state) => state.updateDisponibles)

    const handleDelete = (index) => {
        const newDisponibles = [...disponibles, listaLectura[index]]
        updateDisponibles(newDisponibles)
        console.log(listaLectura[index])
        updateListaLectura(listaLectura.filter(book => book !== listaLectura[index]))
    }

    return (listaLectura.length > 0) &&
        (
            <section className='m-3 p-4 bg-white shadow-lg rounded-xl'>
                <h2>Lista de lectura</h2>
                <div className='grid grid-cols-6'>
                    {
                        listaLectura.map((book, index) => (
                            <div key={index} className='flex flex-col items-end justify-start gap-1'>
                                <button className='text-red-600 p-1 mb-[-6px] rounded-full text-xs font-semibold'
                                onClick={() => handleDelete(index)}>x</button>
                                <img src={book.book.cover} alt="Imagen" className='h-auto w-10' />
                                
                            </div>
                        ))
                    }
                </div>
            </section>
        )
}

export default ListaLectura