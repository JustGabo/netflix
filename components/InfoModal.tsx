import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

const InfoModal = () => {
  return (
    <div className='w-full h-full bg-black flex items-center duration-300 overflow-x-hidden overflow-y-auto fixed inset-0 transition  justify-center  z-50 opacity-80'>
        <Dialog>
            <DialogContent className=''>
                hola
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default InfoModal