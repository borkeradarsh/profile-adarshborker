"use client";
import React from 'react'
import Tictactoe from './components/TicTacToe';
import Song from './components/Song';
import { motion } from "framer-motion";

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white font-sans overflow-x-hidden overflow-y-hidden scrollbar-hide">
      <div className='min-h-screen flex flex-col'>
     <div className="flex justify-center items-center pt-4">
  <motion.div
    className="w-full max-w-lg px-4 sm:max-w-2xl md:max-w-3xl sm:scale-100 transition-transform duration-100 ease-in-out"
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  >
    <img src='./header.png' alt="head" className="w-full max-w-full h-auto mx-auto" />
  </motion.div>
</div>
<motion.div
  className="w-full"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* All content below will animate in when scrolled into view */}
  <div className="w-full flex flex-col md:flex-row items-center justify-center px-6 py-10 gap-8">
    {/* Image Section */}
    <motion.div
      className="w-full max-w-sm transition-transform duration-300 ease-in-out"
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <img
        src="./about.png"
        alt="About"
        className="w-full max-w-full h-auto"
      />
    </motion.div>

    {/* Text Section */}
    <motion.div
      className="w-full max-w-2xl text-center md:text-left transition-transform duration-500 ease-in-out"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
      duration: 1.2,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1] // cubic-bezier for smoother ease
      }}
    >
      <p className="text-sm sm:text-lg md:text-xl font-bold leading-relaxed px-4">
      I'm a self-taught web developer, currently pursuing my undergrad degree in CS. I enjoy making websites, playing games and riding. I’m currently exploring AI-assisted development tools and constantly learning new technologies to sharpen my skills.
      </p>
    </motion.div>
  </div>

  <motion.div
    className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-4 px-2 w-full"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay: 0.4 }}
  >
    <motion.img
      src="./image1.png"
      className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto max-w-full"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    />
    <motion.div
      className="w-full sm:w-1/2 md:w-1/3 h-auto flex justify-center items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl py-8 text-center text-xl text-purple-700 font-bold">
        PLAY WITH ME
        <Tictactoe />
      </div>
    </motion.div>
    <motion.img
      src="./image3.png"
      className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto max-w-full"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    />
  </motion.div>

  <motion.div
    className="relative flex flex-col md:flex-row justify-center items-center gap-6 px-4 py-24"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay: 0.8 }}
  >
    <motion.div
      className="w-full flex justify-center py-8"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex flex-col items-center transition-transform duration-300 ease-in-out">
        {/* Connect Image */}
        <img
          src="./connect.png"
          alt="connect"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto mb-8"
        />

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917022715411"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-full shadow-lg transition duration-200 flex items-center gap-2 text-sm sm:text-base scroll-smooth"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.61 5.97L0 24l6.22-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.22.69.28 1.23.45 1.65.58.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </motion.div>
    {/* This empty div fixes unwanted scrollbars caused by flex children with large content */}
    <div className="hidden lg:block flex-shrink-0 w-0 h-full" />
    {/* SONG COMPONENT */}
    <motion.div
      className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex justify-center items-center transition-transform duration-300 ease-in-out"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Song />
    </motion.div>
  </motion.div>
      </motion.div>
      </div>
    </main>
  )
}


