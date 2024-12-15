"use client";

import VideoList from "@/components/globals/video-list";
import { ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import { VideoDetails } from "@/types/video";
import { useEffect, useState, useRef } from "react";
import { fetchFromAPI } from "@/utils/fetchFromApi";
import { checkLike, likeVideo } from "@/actions/like";
import { addToHistory, updateHistoryProgress } from "@/actions/history";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CommentSection from "@/components/globals/comment-section";

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<VideoDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  
  const [watchProgress, setWatchProgress] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user;

  useEffect(() => {
    const addVideoToHistory = async () => {
      if (!user || !user.email || !video) return;

      try {
        await addToHistory(params.id, user.email, {
          title: video.title,
          channelTitle: video.channelTitle,
          thumbnail: video.thumbnail,
          viewCount: video.viewCount,
          publishedTimeText: video.publishedTimeText
        });
      } catch (err) {
        console.error("Error adding video to history:", err);
      }
    };

    if (video) {
      addVideoToHistory();
    }
  }, [params.id, user, video]);

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

  const handleLike = async () => {
    if (!user || !user.email) {
      toast.error("Please log in to like videos", {
        description: "You need to be signed in to interact with this video.",
      });
      return;
    }

    if (isLikeLoading) return;

    try {
      setIsLikeLoading(true);
      setIsLiked((prev) => !prev);

      await likeVideo(params.id, user.email);

      toast.success(isLiked ? "Video unliked" : "Video liked", {
        description: isLiked
          ? "You have removed your like from this video."
          : "You have liked this video.",
      });
    } catch (err) {
      setIsLiked((prev) => !prev);
      console.error("Error liking video:", err);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLikeLoading(false);
    }
  };

  // Track video progress
  const handleProgress = async (state: { 
    played: number, 
    playedSeconds: number, 
    loaded: number,
    loadedSeconds: number
  }) => {
    const progressPercentage = Math.round(state.played * 100);
    
    setWatchProgress(progressPercentage);

    if (user && user.email) {
      try {
        await updateHistoryProgress(
          params.id, 
          user.email, 
          Math.round(state.playedSeconds), 
          progressPercentage
        );
      } catch (err) {
        console.error("Error updating watch progress:", err);
      }
    }
  };

  if (loading || sessionStatus === "loading") {
    return (
      <div className="bg-retro-bg text-retro-text h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-retro-primary"></div>
      </div>
    );
  }

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
                  ref={playerRef}
                  url={`https://www.youtube.com/watch?v=${params.id}`}
                  controls
                  width="100%"
                  height="100%"
                  onProgress={handleProgress}
                />
                {watchProgress > 0 && (
                  <div className="text-sm text-retro-secondary mt-2">
                    Watch Progress: {watchProgress}%
                  </div>
                )}
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
              <CommentSection videoId={params.id} />
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