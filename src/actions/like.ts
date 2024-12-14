"use server";

import { prisma } from "@/lib/db";

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