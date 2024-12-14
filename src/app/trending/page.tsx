import VideoList from '@/components/globals/video-list'

interface Video {
    id: number;
    title: string;
    channel: string;
    views: string;
    timestamp: string;
    thumbnail: string;
}

const trendingVideos = [
  { id: 1, title: "Retro Wave Music Mix", views: "1.2M views", thumbnail: "/placeholder.svg?height=180&width=320&text=Retro+Wave" },
  { id: 2, title: "80s Fashion Lookbook", views: "800K views", thumbnail: "/placeholder.svg?height=180&width=320&text=80s+Fashion" },
  { id: 3, title: "Synthwave Production Tutorial", views: "500K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Synthwave" },
  { id: 4, title: "VHS Effect Tutorial", views: "300K views", thumbnail: "/placeholder.svg?height=180&width=320&text=VHS+Effect" },
  { id: 5, title: "Retro Movie Marathon", views: "1.5M views", thumbnail: "/placeholder.svg?height=180&width=320&text=Retro+Movies" },
  { id: 6, title: "Vintage Tech Unboxing", views: "700K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Vintage+Tech" },
] as Video[]

export default function Trending() {
  return (
    <div className="  bg-retro-bg text-retro-text">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-retro-primary mb-8">Trending Videos</h1>
        <VideoList title="Hot Right Now" videos={trendingVideos} />
      </main>
    </div>
  )
}
