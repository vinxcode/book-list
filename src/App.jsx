import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./db.json')
        const datos = await response.json()
        setData(datos.library)
        console.log(data)
      } catch (error) {
        console.error(error, 'Ya la carlitos, amix')
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Here are some books you can choose</h1>
      {
        data.map((dato, index) => (
          <div key={index}>
            <p>{ dato.book.title }</p>
          </div>
        ))
      }
    </div>
  )
}

export default App