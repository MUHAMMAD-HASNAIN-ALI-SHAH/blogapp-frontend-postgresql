import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../lib/axios";
import Like from "../components/blog-data/Like";
import Comments from "../components/blog-data/Comments";

type Blog = {
  id: string;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
  likes: any[];
  comments: any[];
};

const BlogDataPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const hasAddedView = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchBlogData = async (blogId: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/v2/blogs/${blogId}`);
      setBlog(data.blog);
    } catch {
      setError("Unable to load this blog. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addView = async (blogId: string) => {
    try {
      await axiosInstance.put(`/api/v2/blogs/view/${blogId}`);
    } catch {
      // Silently fail, views are not critical
    }
  };

  useEffect(() => {
    if (id && !hasAddedView.current) {
      fetchBlogData(id);
      addView(id);
      hasAddedView.current = true;
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchBlogData(id);
  }, [id]);

  /* ---------------- INVALID ID ---------------- */
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">
          Invalid Blog ID
        </p>
      </div>
    );
  }

  /* ---------------- ERROR UI ---------------- */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-10 text-center">
          <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-6">
            <span className="text-4xl">🚫</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Something went wrong
          </h2>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur overflow-hidden">

          {/* IMAGE SECTION */}
          {loading ? (
            <div className="min-h-[80vh] flex items-center justify-center">
              <div className="flex justify-center items-center h-20">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
          ) : (
            blog && (
              <>
                <div className="relative h-[280px] md:h-[380px] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4 select-none">
                    <span className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700 font-medium">
                      {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      👁 {blog.views} view{blog.views === 1 ? "" : "s"}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                    {blog.title}
                  </h1>

                  <p className="text-gray-700 leading-relaxed text-lg text-justify mb-10">
                    {blog.description}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between border-t pt-6 select-none">
                    <Like blogId={id} />
                    {/* <span className="text-sm text-gray-400">
                      {blog.likes.length} likes
                    </span> */}
                  </div>

                  {/* COMMENTS (future) */}
                  <Comments blogId={id} />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDataPage;
