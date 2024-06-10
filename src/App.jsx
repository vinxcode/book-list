import React from 'react'
import { useState, useEffect } from 'react'
import { useStore } from './store/store'
import ListaLectura from './ListaLectura'

const App = () => {


  const disponibles = useStore((state) => state.disponibles)
  const fetchDisponibles = useStore((state) => state.fetchDisponibles)
  const updateDisponibles = useStore((state) => state.updateDisponibles)
  const listaLectura = useStore((state) => state.listaLectura)
  const updateListaLectura = useStore((state) => state.updateListaLectura)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./db.json')
        const fetchedData = await response.json()
        fetchDisponibles(fetchedData.library)

      } catch (error) {
        console.error(error, 'Error trying to fetch data')

      }
    }
    fetchData()
  }, [])

  const handleAdd = (index) => {
    updateListaLectura(disponibles[index])
    updateDisponibles(disponibles.filter(disponible => disponible !== disponibles[index]))
  }

  return (
    <div>

      <ListaLectura/>

      <h1>Here are some books you can choose</h1>
      <div className='grid grid-cols-2'>
        {
          disponibles.map((disponible, index) => (
            <div key={index} className='flex flex-col p-3 m-3'>
              <img src={disponible.book.cover} alt="Imagen" className='h-auto w-30'/>
              <p className='text-xs font-bold mt-2 mb-1'>{disponible.book.title}</p>
              <button className='px-3 py-2 bg-lime-600 text-xs font-semibold rounded-lg text-white' onClick={() => handleAdd(index)}>Agregar a Lista</button>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App