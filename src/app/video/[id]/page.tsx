import VideoList from '@/components/globals/video-list'
import { ThumbsUp, ThumbsDown, Share2, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"

const video = {
  id: 1,
  title: "Retro Wave Music Mix 2023",
  channel: "SynthMaster",
  views: "1.2M views",
  timestamp: "2 days ago",
  description: "Experience the best of retro wave music in this epic 2023 mix. Perfect for late-night coding sessions or cruising through a neon-lit city.",
}

const relatedVideos = [
  { id: 2, title: "80s Fashion Lookbook", channel: "VintageVibes", views: "800K views", timestamp: "1 week ago", thumbnail: "/placeholder.svg?height=180&width=320&text=80s+Fashion" },
  { id: 3, title: "Synthwave Production Tutorial", channel: "RetroBeats", views: "500K views", timestamp: "3 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Synthwave" },
  { id: 4, title: "Pac-Man World Record Speedrun", channel: "RetroGamer", views: "1M views", timestamp: "5 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Pac-Man" },
]

export default function VideoPage({ params }: { params: { id: string } }) {
  return (
    <div className="  bg-retro-bg text-retro-text">
      <div className="flex">
        <main className="flex-grow p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="retro-container aspect-video mb-4">
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-retro-secondary">
                  Video Player {params.id}
                </div>
              </div>
              <h1 className="text-2xl font-bold text-retro-primary mb-2">{video.title}</h1>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-retro-secondary">{video.channel}</p>
                  <p className="text-sm text-retro-text opacity-75">{video.views} • {video.timestamp}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" className="text-retro-text"><ThumbsUp className="mr-2" /> Like</Button>
                  <Button variant="ghost" className="text-retro-text"><ThumbsDown className="mr-2" /> Dislike</Button>
                  <Button variant="ghost" className="text-retro-text"><Share2 className="mr-2" /> Share</Button>
                  <Button variant="ghost" className="text-retro-text"><Save className="mr-2" /> Save</Button>
                </div>
              </div>
              <div className="retro-container p-4 mb-4">
                <p>{video.description}</p>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-xl font-bold text-retro-secondary mb-4">Related Videos</h2>
              <VideoList videos={relatedVideos} title="More Like This" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

