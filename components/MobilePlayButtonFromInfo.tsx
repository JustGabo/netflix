"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import {  BsPlayFill } from "react-icons/bs";

interface MobileFavoriteButtonProps{
  id: string
}

const MobilePlayButtonFromInfo = ({id}: MobileFavoriteButtonProps) => {

  const router = useRouter()

  return (
    <button onClick={()=> router.push(`/watch/${id}`)} className="bg-white  flex items-center justify-center p-2 rounded-md font-semibold">
      <BsPlayFill/> Play
      </button>
  )
}

export default MobilePlayButtonFromInfo