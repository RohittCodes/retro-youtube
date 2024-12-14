"use client";

import { VideoDetails } from '@/types/video';
import { useEffect, useState } from 'react'
import VideoList from '@/components/globals/video-list'
import { fetchFromAPI } from '@/utils/fetchFromApi';

export default function Trending() {
  
  const [videos, setVideos] = useState([] as VideoDetails[])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchVideos = async () => {
        const { data } = await fetchFromAPI('trending');
        setLoading(false)
        setVideos(data)
      }
      fetchVideos()
    }, [])

  return (
    <div className="  bg-retro-bg text-retro-text">
      <main className="container mx-auto px-4 py-8">
      <h1 className="retro-heading text-3xl mb-6 glitch" data-text="Trending Videos">Trending Videos</h1>
        <VideoList videos={videos} />
      </main>
    </div>
  )
}
