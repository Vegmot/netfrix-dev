import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import requests from '../utils/Requests'

import '../styles/Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(requests.fetchNetflixOriginals)

      const randomNumber = Math.floor(
        Math.random() * res.data.results.length - 1
      )

      setMovie(res.data.results[randomNumber])

      return res
    }

    fetchData()
  }, [])

  console.log(movie)

  const truncate = (str, limit) => {
    return str?.length > limit ? str.substring(0, limit) + '...' : str
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner-contents'>
        <h1 className='banner-title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className='banner-buttons'>
          <button className='banner-button'>Play</button>
          <button className='banner-button'>My List</button>
        </div>

        <h1 className='banner-description'>{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className='banner-fade-bottom' />
    </header>
  )
}

export default Banner
