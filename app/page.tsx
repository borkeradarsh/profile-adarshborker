import React from 'react'
import Tictactoe from './components/TicTacToe';
import Song from './components/Song';

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white font-sans">
      <div className="flex justify-center items-center">
      <div className="w-2/3 flex pt-4 items-center justify-center">
        <img src='./header.png' alt="head" className="w-full h-full" />
      </div>
      </div>
      <div className='w-2/3 relative left-2/3 transform -translate-x-2/3'>
      <img src='./about.png' alt="about" className='w-full h-full' />
      </div>
      <div className="flex relative justify-evenly items-center w-full transform translate-y-0 pb-4">
      <img src="./image1.png" alt="Image 1" className="w-1/4 h-auto sm:translate-y-0 -translate-y-1/2 " />
      <div className="w-1/4 h-auto flex justify-center items-center -mt-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Tictactoe />
        </div>
      </div>
      <img src="./image3.png" alt="Image 3" className="w-1/4 h-auto sm:translate-y-0 -translate-y-1/2 " />
      </div>
      <div className='flex relative justify-evenly items-center py-4 lg:translate-y-1/4 -translate-y-1/2'>
        <img src="./connect.png" alt='connect' className='w-1/4 h-auto sm:translate-y-0 -translate-y-1/2' />
        
        <div className="w-1/4 h-auto flex justify-center items-center -mt-4">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl translate-y-1/4">
            <Song />
          </div>
          
      </div>
      <div className="flex absolute left-1/3 pb-4 -translate-x-full top-3/4 translate-y-1/2">
        <a
          href="https://wa.me/917022715411"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-full shadow-lg transition duration-200 flex items-center gap-1 text-xs md:text-lg"
        >
          <svg
            className="w-2 h-2 md:w-5 md:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.61 5.97L0 24l6.22-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.22.69.28 1.23.45 1.65.58.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
          </svg>
          WhatsApp
        </a>
      </div>
      </div>
    </main>
  )
}


