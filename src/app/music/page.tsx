import VideoList from '@/components/globals/video-list'

interface Video {
    id: number;
    title: string;
    channel: string;
    views: string;
    timestamp: string;
    thumbnail: string;
}

const musicVideos = [
  { id: 1, title: "Top 10 80s Hits", views: "2M views", thumbnail: "/placeholder.svg?height=180&width=320&text=80s+Hits" },
  { id: 2, title: "Vinyl Record Collecting Guide", views: "400K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Vinyl" },
  { id: 3, title: "Synth Solo Compilation", views: "600K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Synth+Solos" },
  { id: 4, title: "Retro Music Video Marathon", views: "1.5M views", thumbnail: "/placeholder.svg?height=180&width=320&text=Music+Videos" },
  { id: 5, title: "Cassette Tape Revival", views: "300K views", thumbnail: "/placeholder.svg?height=180&width=320&text=Cassette+Tapes" },
  { id: 6, title: "90s Dance Hits Remix", views: "800K views", thumbnail: "/placeholder.svg?height=180&width=320&text=90s+Dance" },
] as Video[]

export default function Music() {
  return (
    <div className="  bg-retro-bg text-retro-text">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-retro-primary mb-8">Retro Music</h1>
        <VideoList title="Top Music Videos" videos={musicVideos} />
      </main>
    </div>
  )
}