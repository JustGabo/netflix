import { create } from "zustand";

import {User} from '@supabase/supabase-js'
import { persist } from "zustand/middleware";

interface UserState {
    user: User | null,
    setUser: (user: User)=> void
}

const useUserStore = create(persist<UserState>((set)=> ({
    user: null,
    setUser: (user)=>{
        set({user: user})
    }
}),{
    name: 'user-storage',
    getStorage: ()=> localStorage
}))

export default useUserStore