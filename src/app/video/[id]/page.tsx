"use client";

import VideoList from "@/components/globals/video-list";
import { ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import { VideoDetails } from "@/types/video";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/utils/fetchFromApi";
import { checkLike, likeVideo } from "@/actions/like";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<VideoDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user;

  useEffect(() => {
    const checkLiked = async () => {
      if (!user || !user.email) return;

      try {
        const response = await checkLike(params.id, user.email);
        setIsLiked(response);
      } catch (err) {
        console.error("Error checking like:", err);
      }
    };

    checkLiked();
  }, [params.id, user]);

  // Fetch video info (previous implementation remains the same)
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await fetchFromAPI("video/info", params.id);

        if (response) {
          setVideo(response);
        } else {
          throw new Error("No video data found");
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to fetch video details");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [params.id]);

  // Fetch related videos (previous implementation remains the same)
  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await fetchFromAPI("related", params.id);

        if (response?.data) {
          setRelatedVideos(response.data);
        } else {
          throw new Error("No related videos found");
        }
      } catch (err) {
        console.error("Error fetching related videos:", err);
      }
    };

    fetchRelatedVideos();
  }, [params.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      description: "You can now share this video with your friends.",
    });
    alert("Link copied to clipboard");
  };

  // Handle like functionality with improved state management
  const handleLike = async () => {
    if (!user || !user.email) {
      toast.error("Please log in to like videos", {
        description: "You need to be signed in to interact with this video.",
      });
      return;
    }

    // Prevent multiple like requests
    if (isLikeLoading) return;

    try {
      setIsLikeLoading(true);

      // Optimistically update the UI
      setIsLiked((prev) => !prev);

      await likeVideo(params.id, user.email);

      // Success toast
      toast.success(isLiked ? "Video unliked" : "Video liked", {
        description: isLiked
          ? "You have removed your like from this video."
          : "You have liked this video.",
      });
    } catch (err) {
      // Revert the optimistic update if there's an error
      setIsLiked((prev) => !prev);

      console.error("Error liking video:", err);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLikeLoading(false);
    }
  };

  // Loading state
  if (loading || sessionStatus === "loading") {
    return (
      <div className="bg-retro-bg text-retro-text h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-retro-primary"></div>
      </div>
    );
  }

  // Error state
  if (error || !video) {
    return (
      <div className="bg-retro-bg text-retro-text h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-500 mb-4">
            {error || "Video not found"}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-retro-bg text-retro-text">
      <div className="flex">
        <main className="flex-grow p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="retro-container aspect-video mb-4">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${params.id}`}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
              <h1 className="text-2xl font-bold text-retro-primary mb-2">
                {video.title}
              </h1>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-retro-secondary">{video.channelTitle}</p>
                  <p className="text-sm text-retro-text opacity-75">
                    {video.viewCount} • {video.publishedTimeText} ago
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleLike}
                    variant="ghost"
                    className={cn(
                      "text-retro-text",
                      isLiked && "Text-retro-primary",
                      isLikeLoading && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isLikeLoading}
                  >
                    <ThumbsUp
                      className={cn(
                        "mr-2",
                        isLiked && "fill-current text-retro-primary"
                      )}
                    />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-retro-text"
                    onClick={handleCopyLink}
                  >
                    <Share2 className="mr-2" /> Share
                  </Button>
                </div>
              </div>
              <div className="retro-container p-4 mb-4">
                <p>{video.description}</p>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-xl font-bold text-retro-secondary mb-4">
                Related Videos
              </h2>
              {relatedVideos.length > 0 ? (
                <VideoList videos={relatedVideos} />
              ) : (
                <p>No related videos found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
