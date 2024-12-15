"use client";

import { getHistory } from "@/actions/history";
import VideoList from "@/components/globals/video-list";
import { VideoDetails } from "@/types/video";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const HistoryPage = () => {
    const [history, setHistory] = useState<VideoDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const session = useSession();
    const userEmail = session?.data?.user?.email;

    useEffect(() => {
        const fetchWatchHistory = async () => {
            if (!userEmail) {
                setLoading(false);
                return;
            }

            try {
                const response = await getHistory(userEmail);

                // Transform the history response to match VideoDetails type
                const transformedHistory = response.map((item: any) => ({
                    type: "video",
                    videoId: item.videoId,
                    title: item.title || "Untitled Video",
                    channelTitle: item.channelTitle || "Unknown Channel",
                    thumbnail: item.thumbnailUrl ? JSON.parse(item.thumbnailUrl) : null,
                    viewCount: item.viewCount || "0 views",
                    publishedTimeText: item.publishedTimeText || "",
                    watchProgress: item.watchProgress,
                    watchDuration: item.watchDuration,
                }));

                setHistory(transformedHistory);
            } catch (error) {
                console.error("Error fetching watch history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchHistory();
    }, [userEmail]);

    if (!userEmail) {
        return (
            <div className="h-screen flex items-center justify-center bg-retro-bg text-retro-text">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">Please log in to view your watch history</h1>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-retro-bg text-retro-text h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-retro-primary"></div>
            </div>
        );
    }

    return (
        <main className="p-6 bg-retro-bg text-retro-text min-h-screen">
            <h1 className="retro-heading text-3xl mb-6 glitch" data-text="Watch History">
                Watch History
            </h1>
            {history.length > 0 ? (
                <VideoList videos={history} />
            ) : (
                <div className="text-center text-retro-secondary">
                    <p className="text-xl">No watch history found</p>
                    <p className="text-sm mt-2">Videos you watch will appear here</p>
                </div>
            )}
        </main>
    );
};

export default HistoryPage;
