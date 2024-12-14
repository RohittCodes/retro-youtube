import MovieList from '@/components/globals/movie-list'

export default function Movies() {
  return (
    <div className="  bg-navy-900">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">Movies</h1>
        <MovieList category="Action & Adventure" />
        <MovieList category="Sci-Fi & Fantasy" />
        <MovieList category="Comedies" />
      </main>
    </div>
  )
}

