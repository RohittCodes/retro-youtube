import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <div className="retro-container">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-yellow-400">Stranger Things</h1>
        <p className="text-2xl mb-6 max-w-2xl mx-auto">A nostalgic journey back to the 80s, where a group of kids encounter supernatural forces and secret government exploits.</p>
        <div className="space-x-4">
          <Button className="retro-button">
            ▶ Play
          </Button>
          <Button variant="outline" className="retro-button bg-transparent border-2 border-white">
            More Info
          </Button>
        </div>
      </div>
    </div>
  )
}

