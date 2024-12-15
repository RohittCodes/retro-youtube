'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface YouTubeComment {
  commentId: string;
  authorText: string;
  authorChannelId?: string;
  authorThumbnail?: Array<{url?: string}>;
  textDisplay: string;
  publishedTimeText: string;
  likesCount: string;
  replyCount?: number;
  replyToken?: string;
  authorIsChannelOwner?: boolean;
}

interface CommentsResponse {
  commentsCount: string;
  continuation?: string;
  data: YouTubeComment[];
}

export default function CommentSection({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<YouTubeComment[]>([])
  const [commentsCount, setCommentsCount] = useState<string>('0')
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [continuation, setContinuation] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      setError(null)

      const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/comments',
        params: { 
          id: videoId,
          ...(continuation ? { continuation } : {})
        },
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      }

      try {
        const response = await axios.request<CommentsResponse>(options)
        
        setComments(prevComments => [
          ...prevComments, 
          ...response.data.data
        ])
        
        if (response.data.commentsCount) {
          setCommentsCount(response.data.commentsCount)
        }

        setContinuation(response.data.continuation)
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching comments:', error)
        setError('Failed to load comments')
        setIsLoading(false)
      }
    }

    if (videoId) {
      fetchComments()
    }
  }, [videoId, continuation])

  const handleLoadMore = () => {
    if (continuation) {
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj: YouTubeComment = {
        commentId: `local-${Date.now()}`,
        authorText: "You",
        textDisplay: newComment,
        publishedTimeText: "Just now",
        likesCount: "0",
        replyCount: 0
      }
      
      setComments([newCommentObj, ...comments])
      setNewComment("")
    }
  }

  if (isLoading && comments.length === 0) {
    return (
      <div className="retro-container mt-8">
        <p className="text-retro-secondary">Loading comments...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="retro-container mt-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="retro-container mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl text-retro-secondary">
          Comments {commentsCount ? `(${commentsCount})` : ''}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6 p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border border-retro-primary rounded bg-retro-background text-retro-text"
          rows={3}
        />
        <button 
          type="submit" 
          className="mt-2 px-4 py-2 bg-retro-accent text-retro-background rounded hover:opacity-90"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-retro-secondary">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment.commentId} 
              className="border border-retro-primary p-4 rounded"
            >
              <div className="flex items-center mb-2">
                {comment.authorThumbnail && comment.authorThumbnail.length > 0 && (
                  <img 
                    src={comment.authorThumbnail[0].url} 
                    alt={comment.authorText}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <p className="text-retro-accent text-lg">
                      {comment.authorText}
                      {comment.authorIsChannelOwner && (
                        <span className="ml-2 text-xs bg-retro-primary text-retro-background px-1 rounded">
                          Creator
                        </span>
                      )}
                    </p>
                    <span className="text-sm text-retro-secondary">
                      {comment.publishedTimeText}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-1 text-retro-text">{comment.textDisplay}</p>
              <div className="flex items-center mt-2 text-sm text-retro-secondary">
                <span>👍 {comment.likesCount} Likes</span>
                {comment.replyCount && comment.replyCount > 0 && (
                  <span className="ml-4">💬 {comment.replyCount} Replies</span>
                )}
              </div>
            </div>
          ))
        )}

        {/* Load More Button */}
        {continuation && (
          <div className="text-center mt-4">
            <button 
              onClick={handleLoadMore}
              className="px-4 py-2 bg-retro-accent text-retro-background rounded hover:opacity-90"
            >
              Load More Comments
            </button>
          </div>
        )}
      </div>
    </div>
  )
}