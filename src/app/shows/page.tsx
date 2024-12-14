import MovieList from '@/components/globals/movie-list'

export default function TVShows() {
  return (
    <div className="  bg-navy-900">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">TV Shows</h1>
        <MovieList category="Popular TV Shows" />
        <MovieList category="Classic Series" />
        <MovieList category="New Releases" />
      </main>
    </div>
  )
}

