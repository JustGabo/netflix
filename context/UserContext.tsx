import React, {useState, useEffect, useContext, createContext} from 'react'

import {User} from '@/types/index'
import { supabase } from '@/db/supabase'
import { useRouter } from 'next/navigation'
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient'

interface Props{
    children: React.ReactNode
}

interface UserContextState {
    user: User | null
}

const initialState = {
  user: null
}

export const UserContext = createContext<UserContextState>(initialState)

const UserContextProvider = ({children}: Props) => {

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const [recharge, setRecharge] = useState(false)

  
  const getUser = async () =>{
    const {data, error} = await supabase.auth.getUser()
    if(error){
      console.log(error)
    }else{
      console.log(data.user)
      const User = await supabase.from('users').select("*").eq('userId', data.user.id)
      console.log(User)
    }
  }

  

  const change = supabase.auth.onAuthStateChange((e, session)=> {
    console.log(e, session)

    // if(user){
    //   router.push('/')
    // }

    // if (e === 'INITIAL_SESSION') {
    //   // handle initial session
    //   router.push('/auth')
    // }
      if (e === 'SIGNED_IN') {
      // handle sign in event
      setRecharge(true)
      router.push('/profiles')

    } else if (e === 'SIGNED_OUT') {
      // handle sign out event
      setRecharge(true)
      router.push('/auth')
    } else if (e === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (e === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (e === 'USER_UPDATED') {
      // handle user updated event
    }
  })


  useEffect(()=>{
    getUser()
    change
  },[recharge])

  const value = {
    user
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider


export const usingContext = ()=>{
  const context = useContext(UserContext)
  return context
}