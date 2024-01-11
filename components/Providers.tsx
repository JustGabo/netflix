"use client"
import React from "react"
import UserContextProvider from '@/context/UserContext'

interface Props {
    children: React.ReactNode
}

const Providers = ({children}: Props) => {
  return (
    <UserContextProvider>
        {children}
    </UserContextProvider>
  )
}

export default Providers