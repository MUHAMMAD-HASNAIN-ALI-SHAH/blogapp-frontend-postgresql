import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useBlogStore from "../../store/useBlogStore";

interface CommentsProps {
  blogId: string;
}

const Comments = ({ blogId }: CommentsProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const [comment, setComment] = useState("");
  const { getBlogComments, getBlogsCommentsLoader, comments, addComment, addCommentLoader, deleteCommentLoader, deleteComment } = useBlogStore();

  useEffect(() => {
    getBlogComments(blogId);
  }, [blogId]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-xl font-bold">Comments</h1>

      {/* Loading indicator for fetching comments */}
      {getBlogsCommentsLoader && <div className="flex justify-center items-center h-20">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>}

      {/* List of comments */}
      {comments &&
        comments.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-sm font-bold">
                  {c.username.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-sm font-semibold text-gray-800">
                  {c.username}
                </h2>
              </div>

              {/* Delete button (only for owner) */}
              {user?.id === c.userId && (
                <button
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                  onClick={() => deleteComment(blogId, c.id)}
                  disabled={deleteCommentLoader}
                >
                  {deleteCommentLoader ? "Loading..." : "Delete"}
                </button>
              )}
            </div>

            {/* Comment text */}
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {c.comment}
            </p>
          </div>
        ))}


      {/* Input for new comment */}
      {isAuthenticated ? (
        <div className="flex gap-2 items-center mt-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={getBlogsCommentsLoader}
          />
          <button
            onClick={() => {  addComment(blogId, comment); setComment(""); }}
            disabled={getBlogsCommentsLoader || !comment.trim()}
            className={`px-4 py-2 rounded-md font-semibold text-white ${getBlogsCommentsLoader
              ? "cursor-not-allowed bg-blue-500 text-white font-medium"
              : "bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              }`}
          >
            {addCommentLoader ? "Submitting..." : "Comment"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">
          You must be logged in to comment.
        </p>
      )}
    </div>
  );
};

export default Comments;
