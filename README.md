# RetroTube

RetroTube is a simple retro themed YouTube clone that uses free YouTube API to fetch videos. Built with Next.js, Tailwind CSS and [YouTube API](https://rapidapi.com/ytjar/api/yt-api)

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
- [YouTube API](https://rapidapi.com/ytjar/api/yt-api)
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

![Home Page](https://github.com/user-attachments/assets/3efecca6-bbcc-40e1-95e6-1588531912f4)
![Trending](https://github.com/user-attachments/assets/a52caecc-880d-4126-9738-19963cc8818f)
![Search](https://github.com/user-attachments/assets/a1cfd3ea-cc2f-447c-aae1-b62bbe4097aa)
![Video](https://github.com/user-attachments/assets/fabe8bf1-8abc-42d2-9d3a-f8b59d9f3662)
![Comment](https://github.com/user-attachments/assets/eb8a05c1-3c23-44b3-b988-a5b780042eeb)
![History with no login](https://github.com/user-attachments/assets/da7b11da-8895-4401-af99-4d3a2a43754d)
![Liked](https://github.com/user-attachments/assets/5d9033a0-55ad-4509-9174-3f3aadcb5c3a)
![History](https://github.com/user-attachments/assets/c0eae0a8-1500-4248-b5c5-86614bc901fc)
