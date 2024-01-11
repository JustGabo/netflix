import React from 'react'
import MovieCard from './MovieCard'

const MovieList = () => {
  return (
    <div className='px-4 mt-4 space-y-8 md:px-12'>
        <div>
            <p className='mb-4 text-base font-semibold text-white md:text-xl lg:text-2xl '>title</p>
            <div>
                <MovieCard/>
            </div>
        </div>
    </div>
  )
}

export default MovieList