"use client";

import React, { useState, useEffect, useRef } from 'react';
import { VideoDetails } from '@/types/video'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoList({ videos }: { videos: VideoDetails[] }) {
  const [columns, setColumns] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only apply dynamic column sizing for md screens (between 640px and 1024px)
    const observer = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width;
      
      if (containerWidth >= 640 && containerWidth < 1024) {
        // Dynamically set columns based on container width for md screens
        if (containerWidth >= 900) {
          setColumns(3);
        } else if (containerWidth >= 660) {
          setColumns(2);
        } else {
          setColumns(1);
        }
      } else {
        // Default to predefined responsive grid for other screen sizes
        setColumns(1);
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        ${columns > 1 ? `md:grid-cols-${columns}` : ''}
        gap-4
      `}
    >
      {videos.map((video) => (
        <Link href={`/video/${video.videoId}`} key={video.videoId} className="block">
          <div className="retro-container overflow-hidden group">
            <div className="relative pt-[56.25%] bg-gray-800">
              {video.thumbnail && video.thumbnail.length > 0 && video.thumbnail[0].url && (
                <Image
                  src={video.thumbnail[0].url}
                  alt={video.title || 'Video Thumbnail'}
                  fill
                  className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute bottom-2 right-2 bg-retro-bg bg-opacity-75 text-retro-text text-xs px-1 rounded">
                {video.lengthText || 'N/A'}
              </div>
            </div>
            <div className="p-2">
              <h4 className="text-lg text-retro-text truncate group-hover:text-retro-secondary transition-colors">
                {video.title || 'Untitled Video'}
              </h4>
              <p className="text-sm text-retro-secondary">
                {video.channelTitle || 'Unknown Channel'}
              </p>
              <p className="text-xs text-retro-text opacity-75">
                {video.viewCount || 'N/A'} • {video.publishedTimeText || 'Unknown Date'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}