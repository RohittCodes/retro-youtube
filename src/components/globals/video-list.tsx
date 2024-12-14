import Image from 'next/image'
import Link from 'next/link'

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  thumbnail: string;
}

interface VideoListProps {
  videos: Video[];
  title: string;
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Link href={`/video/${video.id}`} key={video.id} className="block">
          <div className="retro-container overflow-hidden group">
            <div className="relative">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={320}
                height={180}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-retro-bg bg-opacity-75 text-retro-text text-xs px-1 rounded">
                3:45
              </div>
            </div>
            <div className="p-2">
              <h4 className="text-lg text-retro-text truncate group-hover:text-retro-secondary transition-colors">{video.title}</h4>
              <p className="text-sm text-retro-secondary">{video.channel}</p>
              <p className="text-xs text-retro-text opacity-75">
                {video.views} • {video.timestamp}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

