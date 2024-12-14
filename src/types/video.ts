export type VideoDetails = {
    type: string; // "video"
    videoId: string;
    title: string;
    channelTitle: string;
    channelId: string;
    channelHandle: string;
    channelThumbnail: {
      url: string;
      width: number;
      height: number;
    }[];
    description: string;
    viewCount: string; // Keeping it as a string since it's likely formatted
    publishedTimeText: string;
    publishDate: string; // ISO format
    publishedAt: string; // ISO format
    lengthText: string; // "hh:mm:ss" format
    thumbnail: {
      url: string;
      width: number;
      height: number;
    }[];
    richThumbnail: string | null;
  };
  