import React, { createContext, useContext, useState } from 'react'

interface Props{
    children: React.ReactNode
}

interface MovieUrlState{
    url: string
    setUrl: (url: string)=>void
    name: string
    setName: (name: string) => void
}

const initialState = {
    url:'',
    setUrl: ()=>{},
    name: '',
    setName: ()=>{}
}

const MovieUrlContext = createContext<MovieUrlState>(initialState)

const MovieUrlContextProvider = ({children}: Props) => {
    const [url, setUrl] = useState<string>('')
    const [name, setName] = useState<string>('')
  
    const value = {
        url,
        setUrl,
        name,
        setName
    }

    return (
    <MovieUrlContext.Provider value={value}>{children}</MovieUrlContext.Provider>
    )
}

export default MovieUrlContextProvider


export const useMovieUrlContext = ()=>{
    const context = useContext(MovieUrlContext)
    return context
}