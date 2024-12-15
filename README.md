# RetroTube

RetroTube is a simple retro themed YouTube clone that uses free YouTube API to fetch videos. Built with Next.js, Tailwind CSS and YouTube API.

## Features

- Stream YouTube videos
- Search for videos
- View video details
- View video comments
- View video related videos
- Like and dislike videos
- History of watched videos

## Tech Stack

- Next.js
- Tailwind CSS
- YouTube API
- Prisma
- NeonDB

## Installation

1. Clone the repository

```bash
git clone https://github.com/RohittCodes/retro-youtube.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables. Due to the constraints of prisma and next-auth include both the .env.local and .env files

.env.local
```bash
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_id
AUTH_GITHUB_SECRET=your_github_secret
NEXT_PUBLIC_RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY
```

.env
```bash
DATABASE_URL=your_database_url
```

4. Run the development server

```bash
npm run dev
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Screenshots


## Demo