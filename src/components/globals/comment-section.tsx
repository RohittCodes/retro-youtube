'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const initialComments = [
  { id: 1, author: "RetroGamer1", content: "This video brings back so many memories!" },
  { id: 2, author: "ArcadeMaster", content: "I can't believe how good the graphics were back then." },
]

export default function CommentSection() {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), author: "You", content: newComment }])
      setNewComment("")
    }
  }

  return (
    <div className="retro-container mt-8">
      <h3 className="text-2xl mb-4 text-retro-secondary">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="retro-input mb-2 w-full"
        />
        <Button type="submit" className="retro-button">Post Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-retro-primary p-4 rounded">
            <p className="text-retro-accent text-lg">{comment.author}</p>
            <p className="mt-1 text-retro-text">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

