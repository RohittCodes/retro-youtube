import Image from 'next/image'

interface MovieListProps {
  category: string
}

export default function MovieList({ category }: MovieListProps) {
  const movies = [
    {id: 1, title: "Back to the Future"},
    {id: 2, title: "The Goonies"},
    {id: 3, title: "E.T."},
    {id: 4, title: "Ghostbusters"},
    {id: 5, title: "The Breakfast Club"},
    {id: 6, title: "Ferris Bueller's Day Off"},
  ]

  return (
    <section className="retro-container">
      <h2 className="text-3xl font-bold mb-4 text-yellow-400">{category}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-purple-900 p-2 rounded">
            <Image 
              src={`/placeholder.svg?height=200&width=150&text=${movie.title}`}
              alt={movie.title}
              width={150}
              height={200}
              className="w-full object-cover mb-2"
            />
            <h3 className="text-lg font-semibold text-cyan-400 text-center">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

