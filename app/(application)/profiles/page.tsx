import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'  
import {cookies} from 'next/headers'
import ChooseProfile from "@/components/ChooseProfile"
import { redirect } from 'next/navigation';

const page = async () => {

  const supabase = createServerComponentClient({cookies})
  const {data:{user}} = await supabase.auth.getUser()
  
  if(!user){
    redirect('/auth')
  }else{
    console.log(user)
  }


  return (
    <div className='flex items-center h-full justify-center'>
      <ChooseProfile/>
    </div>
  )
}

export default page
