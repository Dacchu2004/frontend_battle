"use client"

import { useEffect, useState } from "react"

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = Math.random() * 15 + 5
        const newProgress = prevProgress + increment
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 300)
          return 100
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center">
        {/* Animated logo */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-spin"></div>
          {/* Middle ring */}
          <div className="absolute inset-3 border-4 border-white/40 rounded-full animate-spin-reverse"></div>
          {/* Inner ring */}
          <div className="absolute inset-6 border-4 border-white/60 rounded-full animate-pulse"></div>
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-black">JD</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <div className="text-white text-lg font-semibold">{Math.floor(progress)}%</div>
          <div className="text-white/80 text-sm animate-pulse">Loading Portfolio...</div>
        </div>
      </div>
    </div>
  )
}
