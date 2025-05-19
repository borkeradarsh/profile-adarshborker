"use client";

import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "About Me",
    content: "Hi, I'm Adarsh. A passionate developer with expertise in modern web technologies, always eager to learn and build impactful solutions.",
  },
  {
    title: "Skills",
    content: "TypeScript, React, Next.js, Node.js, Tailwind CSS, Framer Motion, Git, REST APIs",
  },
  {
    title: "Experience",
    content: "Frontend Developer at XYZ Corp (2022-Present): Built scalable web apps with React and Next.js.",
  },
  {
    title: "Education",
    content: "B.Tech in Computer Science, ABC University (2018-2022)",
  },
  {
    title: "Contact",
    content: "adarsh.email@example.com | LinkedIn: linkedin.com/in/adarsh",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white font-sans">
      <div className="max-w-3xl mx-auto py-16 px-6">
        <div className="flex items-center justify-center mb-8 gap-6">
            <motion.label
            htmlFor="profile-upload"
            className="cursor-pointer flex-shrink-0 mr-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            title="Upload profile picture"
            >
            <div className="w-28 h-28 rounded-xl bg-gray-700 border-4 border-blue-400 flex items-center justify-center overflow-hidden absolute left-0 ml-8">
                <img
                src="/profile.jpg"
                alt="Profile Picture"
                className="w-28 h-28 rounded-xl object-cover"
                />
            </div>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
              {/* You can add onChange handler to handle file upload */}
            </motion.label>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Adarsh Borker
          </motion.h1>
        </div>
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="bg-gray-800/70 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-300">{section.title}</h2>
              <p className="text-lg">{section.content}</p>
            </motion.section>
          ))}
        </div>
      </div>
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 shadow-xl flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="2"
            initial={{ strokeDasharray: 0, strokeDashoffset: 60 }}
            animate={{ strokeDasharray: 60, strokeDashoffset: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </motion.div>
    </main>
  );
}