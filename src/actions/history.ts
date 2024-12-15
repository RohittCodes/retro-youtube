"use server";
import { prisma } from "@/lib/db";
import { VideoDetails } from "@/types/video";

export const getHistory = async (email: string) => {
    try {
        const history = await prisma.history.findMany({
            where: {
                user: {
                    email: email
                }
            },
            orderBy: {
                updatedAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        return history;
    } catch (error) {
        console.error("Error in getHistory:", error);
        throw new Error("Something went wrong while fetching history.");
    }
}

export const addToHistory = async (
    videoId: string, 
    email: string, 
    videoDetails?: Partial<VideoDetails>
) => {
    try {
        // First, find the user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Check if this video is already in the user's history
        const existingHistoryItem = await prisma.history.findUnique({
            where: {
                userId_videoId: {
                    userId: user.id,
                    videoId: videoId
                }
            }
        });

        // Prepare the data to be added or updated
        const historyData = {
            userId: user.id,
            videoId: videoId,
            title: videoDetails?.title,
            channelTitle: videoDetails?.channelTitle,
            thumbnailUrl: videoDetails?.thumbnail ? JSON.stringify(videoDetails.thumbnail) : null,
            viewCount: videoDetails?.viewCount,
            publishedTimeText: videoDetails?.publishedTimeText
        };

        // If the video is not already in history, create a new entry
        if (!existingHistoryItem) {
            await prisma.history.create({
                data: historyData
            });
        } else {
            // If the video is already in history, update its timestamp and details
            await prisma.history.update({
                where: { 
                    userId_videoId: {
                        userId: user.id,
                        videoId: videoId
                    }
                },
                data: {
                    ...historyData,
                    updatedAt: new Date()
                }
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error in addToHistory:", error);
        throw new Error("Something went wrong while adding to history.");
    }
}

// Optional: Add a function to update watch progress
export const updateHistoryProgress = async (
    videoId: string, 
    email: string, 
    watchDuration?: number, 
    watchProgress?: number
) => {
    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Update the history item with watch progress
        await prisma.history.updateMany({
            where: {
                userId: user.id,
                videoId: videoId
            },
            data: {
                watchDuration,
                watchProgress
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Error in updateHistoryProgress:", error);
        throw new Error("Something went wrong while updating history progress.");
    }
}