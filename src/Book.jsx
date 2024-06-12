import React from 'react'
import { useStore } from './store/store'

const Book = () => {

    const disponibles = useStore((state) => state.disponibles)
    const updateDisponibles = useStore((state) => state.updateDisponibles)
    const addBook = useStore((state) => state.addBook)

    const handleAdd = (index) => {
        addBook(disponibles[index])
        updateDisponibles(disponibles.filter(disponible => disponible !== disponibles[index]))
    }

    return (
        <div className='grid grid-cols-2'>
            {
                disponibles.map((disponible, index) => (
                    <div key={index} className='flex flex-col p-3 m-2 gap-1'>
                        <img src={disponible.book.cover} alt="Imagen" className='h-auto w-36' />
                        <p className='text-xs font-bold'>{disponible.book.title}</p>
                        <p className='text-xs'>{disponible.book.genre}</p>
                        <button className='px-3 py-2 bg-lime-600 text-xs font-semibold rounded-lg text-white' onClick={() => handleAdd(index)}>Agregar a Lista</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Book