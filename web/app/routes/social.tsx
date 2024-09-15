import React, { useState } from 'react'
import { ScrollArea } from "~/components/ui/scroll-area"
import { motion } from "framer-motion"

interface Racer {
  id: number
  emoji: string
  name: string
  position: number
}

export default function RunningTrack() {
  const [racers, setRacers] = useState<Racer[]>([
    { id: 1, emoji: '🐆', name: 'Cheetah', position: 95 },
    { id: 2, emoji: '🐇', name: 'Rabbit', position: 80 },
    { id: 3, emoji: '🐎', name: 'Horse', position: 65 },
    { id: 4, emoji: '🐕', name: 'Dog', position: 50 },
    { id: 5, emoji: '🐢', name: 'Turtle', position: 35 },
    { id: 6, emoji: '🐌', name: 'Snail', position: 20 },
  ])

  return (
    <div className="w-full max-w-md mx-auto h-[80vh] bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Animal Race</h1>
      <ScrollArea className="h-full">
        <div className="relative w-full h-[150vh] overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#FF8E8E" />
              </linearGradient>
            </defs>
            <rect x="10" y="0" width="80" height="150" fill="url(#trackGradient)" rx="5" ry="5" />
            {/* <path d="M 10 0 L 90 0" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 10 150 L 90 150" stroke="white" strokeWidth="2" strokeDasharray="5,5" /> */}
            {[...Array(15)].map((_, i) => (
              <path
                key={i}
                d={`M 10 ${i * 10} L 90 ${i * 10}`}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}
          </svg>
          {racers.map((racer) => (
            <motion.div
              key={racer.id}
              className="absolute left-1/2 transform -translate-x-1/2 text-4xl cursor-pointer"
              style={{ bottom: `${racer.position}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
            >
              <span>{racer.emoji}</span>
              <motion.div
                className="absolute left-full ml-2 bg-white p-2 rounded-md shadow-md text-sm whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold">{racer.name}</span>
                <span className="ml-2">{Math.round(racer.position)}pts</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}