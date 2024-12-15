"use client";

import { getLikedVideos } from "@/actions/like";
import VideoList from "@/components/globals/video-list";
import { VideoDetails } from "@/types/video";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LikedPage = () => {
    const [liked, setLiked] = useState([] as VideoDetails[]);
    const [loading, setLoading] = useState(true);

    const session = useSession();
    const userEmail = session?.data?.user?.email;

    useEffect(() => {
        const fetchLikedVideos = async () => {
            if (!userEmail) {
                setLoading(false);
                return;
            }
            try {
                const response = await getLikedVideos(userEmail);
                setLiked(response);
            } catch (error) {
                console.error("Error fetching liked videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedVideos();
    }, [userEmail]);

    if (!userEmail) {
        return <div>Not logged in</div>;
    }

    if (loading) {
        return (
          <div className="bg-retro-bg text-retro-text h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-retro-primary"></div>
          </div>
        );
    }

    return (
        <main className="p-6">
            <h1 className="retro-heading text-3xl mb-6 glitch" data-text="Liked Videos">Liked Videos</h1>
            <VideoList videos={liked} />
        </main>
    );
};

export default LikedPage;
