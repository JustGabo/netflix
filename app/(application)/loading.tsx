import React from 'react'
import {BeatLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <BeatLoader color='#f00' loading size={20}/>
    </div>
  )
}

export default Loading