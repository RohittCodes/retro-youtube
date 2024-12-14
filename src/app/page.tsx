import VideoList from '@/components/globals/video-list'

const videos = [
  { id: 1, title: "Retro Wave Music Mix 2023", channel: "SynthMaster", views: "1.2M views", timestamp: "2 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Retro+Wave" },
  { id: 2, title: "80s Fashion Lookbook", channel: "VintageVibes", views: "800K views", timestamp: "1 week ago", thumbnail: "/placeholder.svg?height=180&width=320&text=80s+Fashion" },
  { id: 3, title: "Synthwave Production Tutorial", channel: "RetroBeats", views: "500K views", timestamp: "3 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Synthwave" },
  { id: 4, title: "Pac-Man World Record Speedrun", channel: "RetroGamer", views: "1M views", timestamp: "5 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Pac-Man" },
  { id: 5, title: "Top 10 80s Hits Countdown", channel: "RetroRadio", views: "2M views", timestamp: "1 month ago", thumbnail: "/placeholder.svg?height=180&width=320&text=80s+Hits" },
  { id: 6, title: "Retro Console Repair Guide", channel: "TechNostalgia", views: "300K views", timestamp: "2 weeks ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Console+Repair" },
  { id: 7, title: "VHS Effect Tutorial for Video Editors", channel: "RetroFX", views: "750K views", timestamp: "4 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=VHS+Effect" },
  { id: 8, title: "Vinyl Record Collecting Guide", channel: "AnalogAudio", views: "400K views", timestamp: "6 days ago", thumbnail: "/placeholder.svg?height=180&width=320&text=Vinyl" },
]

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="retro-heading text-3xl mb-6 glitch" data-text="Recommended">Recommended</h1>
      <p className="retro-text mb-4">Welcome to RetroTube, your portal to nostalgic content!</p>
      <VideoList videos={videos} title="Recommended Videos" />
    </main>
  )
}

