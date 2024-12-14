'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="retro-container">
      <div className="relative aspect-video bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl text-retro-secondary">Video Player</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl text-retro-accent">Retro Gaming Classics</h2>
        <div className="flex gap-2">
          <Button
            className="retro-button"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button className="retro-button">Like</Button>
        </div>
      </div>
    </div>
  )
}

