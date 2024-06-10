import React from 'react'
import { useState, useEffect } from 'react'
import { useStore } from './store/store'

const App = () => {

  const disponibles = useStore((state) => state.disponibles)
  const fetchDisponibles = useStore((state) => state.fetchDisponibles)

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

  return (
    <div>
      <h1>Here are some books you can choose</h1>

      {
        disponibles.map((disponible, index) => (
          <div key={index}>
            <p>{ disponible.book.title }</p>
          </div>
        ))
      }
    </div>
  )
}

export default App