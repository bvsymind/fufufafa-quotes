'use client'

import { useEffect, useState } from 'react'


export default function Home() {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://fufufafapi.vanirvan.my.id/api/random')
      const text = await response.text()
      const data = JSON.parse(text)
      setItem(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (timestamp) => {
    const date = new Date(parseInt(timestamp))
    const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' })
    const fullDate = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // return `${dayName}, ${fullDate}, ${hours}:${minutes} WIB`
    return `${dayName}, ${fullDate}`
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden mt-1 p-4">
      <p className='text-center mb-8 text-3xl bg-yellow-100 p-2'>Brighten your day with Fufufafa's quotes.</p>
      {loading ? (
        <p className='text-xl'>Loading...</p>
      ) : item ? (
        <div className="p-4 rounded max-w-xl">
          <h1 className='whitespace-pre-line mb-2 flex justify-center items-center text-5xl text-center'>"{item.content}"</h1>
          <p className='text-right mt-4'>-Fufufafa</p>
          <p className='text-right'>{formatDateTime(item.datetime)}</p>
          {/* <div className="mt-4">
            <img
              src={item.image_url}
              alt="quote"
              className="rounded shadow"
            />
          </div> */}
          <div className='flex item-center justify-center gap-7 mt-4'>
            <div onClick={fetchData} className='cursor-pointer bg-blue-200 text-bold px-4 py-2 rounded hover:bg-blue-300 transition'>New Quote</div>
            <a
              href={item.doksli}
              className="bg-yellow-200 text-bold px-4 py-2 rounded hover:bg-yellow-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Doksli
            </a>
          </div>
          
        </div>
      ) : (
        <p>Data not found.</p>
      )}
    </div>
  )
}
