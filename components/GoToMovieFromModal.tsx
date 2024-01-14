"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsPlayFill } from 'react-icons/bs'

interface GoToMovieFromModalProps{
    id:string
}

const GoToMovieFromModal = ({id}: GoToMovieFromModalProps) => {

    const router = useRouter()

  return (
    <button onClick={()=> router.push(`/watch/${id}`)} className="flex items-center w-20 p-2 font-semibold text-black transition duration-150 bg-white rounded-md hover:opacity-50">
    <BsPlayFill className="w-5 h-5" />
    Play
  </button>
  )
}

export default GoToMovieFromModal