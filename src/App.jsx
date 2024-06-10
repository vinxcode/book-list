import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('./db.json')
        const fetchedData = await response.json()
        setData(fetchedData.library)

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
        data.map((dato, index) => (
          <div key={index}>
            <p>{dato.book.title}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App