"use server";

import { prisma } from "@/lib/db";
import axios from "axios";

export const likeVideo = async (videoId: string, email: string) => {
    try {
        const existingLike = await prisma.likes.findFirst({
            where: {
                videoId,
                user: {
                    email,
                },
            },
        });

        if (existingLike) {
            await prisma.likes.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return { message: "Like removed successfully" };
        } else {
            await prisma.likes.create({
                data: {
                    videoId,
                    user: {
                        connect: {
                            email,
                        },
                    },
                },
            });
            return { message: "Video liked successfully" };
        }
    } catch (error) {
        console.error("Error in likeVideo:", error);
        throw new Error("Something went wrong while liking the video.");
    }
};

export const checkLike = async (videoId: string, email: string) => {
    try {
        const like = await prisma.likes.findFirst({
            where: {
                videoId,
                user: {
                    email,
                },
            },
        });
        return !!like;
    } catch (error) {
        console.error("Error in isLiked:", error);
        throw new Error("Something went wrong while checking if video is liked.");
    }
};

export const getLikedVideos = async (email: string) => {
    try {
      const likedVideos = await prisma.likes.findMany({
        where: {
          user: {
            email,
          },
        },
        select: {
          videoId: true,
        },
      });
  
      if (!likedVideos || likedVideos.length === 0) {
        return [];
      }
  
      const videoDetails = await Promise.all(
        likedVideos.map(async (like) => {
          try {
            const response = await axios.get('https://yt-api.p.rapidapi.com/video/info', {
              params: { id: like.videoId },
              headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                'x-rapidapi-host': 'yt-api.p.rapidapi.com',
              },
            });
            return response.data;
          } catch (apiError) {
            console.error(`Error fetching video details for ID: ${like.videoId}`, apiError);
            return null;
          }
        })
      );
  
      return videoDetails.filter((details) => details !== null);
    } catch (error) {
      console.error("Error in getLikedVideos:", error);
      throw new Error("Something went wrong while fetching liked videos.");
    }
  };