import VideoList from '@/components/globals/video-list'

interface Video {
    id: number;
    title: string;
    channel: string;
    views: string;
    timestamp: string;
    thumbnail: string;
}

const gamingVideos = [
  { id: 1, title: "Pac-Man World Record", views: "1M views", thumbnail: "/placeholder.svg?height=180&width=320&text=Pac-Man" },
  { id: 2, title: "Super Mario Bros Speedrun", views: "750K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Mario" },
  { id: 3, title: "Retro Game Collection Tour", views: "300K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Retro+Games" },
  { id: 4, title: "Street Fighter II Tournament", views: "500K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Street+Fighter" },
  { id: 5, title: "Tetris Championship 1990", views: "400K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Tetris" },
  { id: 6, title: "Retro Console Repair Guide", views: "200K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Console+Repair" },
] as Video[]

export default function Gaming() {
  return (
    <div className="bg-retro-bg text-retro-text">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-retro-primary mb-8">Retro Gaming</h1>
        <VideoList title="Popular Gaming Videos" videos={gamingVideos} />
      </main>
    </div>
  )
}

