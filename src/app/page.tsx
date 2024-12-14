"use client";

import VideoList from '@/components/globals/video-list'
import { VideoDetails } from '@/types/video';
import { fetchFromAPI } from '@/utils/fetchFromApi';
import { useEffect, useState } from 'react'

export default function Home() {
  const [videos, setVideos] = useState([] as VideoDetails[])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await fetchFromAPI('home');
      setLoading(false)
      setVideos(data)
    }
    fetchVideos()
  }, [])

  return (
    <main className="p-6">
      <h1 className="retro-heading text-3xl mb-6 glitch" data-text="Recommended">Recommended</h1>
      <p className="retro-text mb-4">Welcome to RetroTube, your portal to nostalgic content!</p>
      <VideoList videos={videos} />
    </main>
  )
}

