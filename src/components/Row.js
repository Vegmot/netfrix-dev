import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'

import '../styles/Row.css'

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([])

  const baseURL = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(fetchUrl)
      setMovies(res.data.results)
      return res
    }

    fetchData()
  }, [fetchUrl])

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row-posters'>
        {movies.map(
          movie =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row-poster ${isLargeRow && 'row-poster-large'}`}
                key={movie.id}
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  )
}

export default Row
