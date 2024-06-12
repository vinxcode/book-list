import React from 'react'
import { useState, useEffect } from 'react'
import { useStore } from './store/store'
import ListaLectura from './ListaLectura'
import Book from './Book'

const App = () => {

  const [categories, setCategories] = useState([])
  const [areCategories, setAreCategories] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const data = useStore((state) => state.data)
  const disponibles = useStore((state) => state.disponibles)
  const listaLectura = useStore((state) => state.listaLectura)
  const fetchDisponibles = useStore((state) => state.fetchDisponibles)
  const updateDisponibles = useStore((state) => state.updateDisponibles)

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

  useEffect(() => {
    const fillSelect = () => {
      const fetchCategories = [
        'Todos',
        ...new Set(disponibles.map(book => book.book.genre))
      ]

      setCategories(fetchCategories)
      setAreCategories(true)
    }
    fillSelect()
  }, [data])

  useEffect(() => {

    const updateAvailableBooks = () => {
      if (selectedCategory === 'Todos') {
        updateDisponibles(data.filter(book => !listaLectura.includes(book)))
        localStorage.setItem('disponibles', JSON.stringify(data.filter(book => !listaLectura.includes(book))))
      } else {
        updateDisponibles(data.filter(book => book.book.genre === selectedCategory && !listaLectura.includes(book)))
        localStorage.setItem('disponibles', JSON.stringify(data.filter(book => book.book.genre === selectedCategory && !listaLectura.includes(book))))
      }
    }
    updateAvailableBooks()
  }, [selectedCategory, listaLectura, data, updateDisponibles])

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return areCategories ? (
    <div>
      <h1 className='font-black text-center text-4xl mt-10'>BOOKLAND</h1>
      <ListaLectura />

      <div className='flex flex-col justify-center items-center'>
        <h3 className='text-center'>Filtrar por genero</h3>
        <select name="genero" id="genero" className='px-8 py-2 rounded-lg'
          value={selectedCategory}
          onChange={handleSelectChange}>
          {
            categories && categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))
          }
        </select>
      </div>

      <section className='bg-white m-3 p-4 rounded-xl shadow-xl'>
        <h1 className='text-center font-bold text-2xl'>Libros disponibles</h1>
        <Book />
      </section>
    </div>
  )
    :
    (
      <div role="status" className='h-screen w-full flex justify-center items-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
}

export default App