import { useEffect } from "react";
import useBlogStore from "../../store/useBlogStore";
import { HorizontalBlogCard, VerticalBlogCard } from "./BlogCard";
import { useState } from "react";
import { categories } from "../../lib/categories";

const CategoryBlogs = () => {
  const { blogs } = useBlogStore();
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredBlogs = blogs.filter(
    (b: { category: string; }) => b.category.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="w-full mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Browse by Category
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 text-sm font-medium capitalize rounded-xl shadow transition-all duration-200 
              ${
                activeTab === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs for active category */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBlogs.map((blog: { id: string; title?: string; description?: string; image?: string; category?: string; views?: number; }) => {
            const safeBlog = {
              id: blog.id,
              title: blog.title ?? "Untitled",
              description: blog.description ?? "No description available.",
              image: blog.image ?? "/default-image.jpg",
              category: blog.category ?? "Uncategorized",
              views: blog.views ?? 0,
            };
            return <VerticalBlogCard key={blog.id} blog={safeBlog} />;
          })}
        </div>
      ) : (
        <p className="text-gray-500">
          No blogs available in{" "}
          <span className="font-semibold">{activeTab}</span>.
        </p>
      )}
    </div>
  );
};

const PopularBlogs = () => {
  const { blogs } = useBlogStore();
  const popularBlogs = blogs
    .sort((a: { views: number }, b: { views: number }) => b.views - a.views)
    .slice(0, 4);

  return (
    <div className="mt-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold text-gray-800">Popular Blogs</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {popularBlogs.map((blog) => (
          <VerticalBlogCard
            key={blog.id}
            blog={{
              id: blog.id ?? "",
              title: blog.title ?? "",
              description: blog.description ?? "",
              image: blog.image ?? "",
              category: blog.category ?? "",
              views: blog.views ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const RecentsBlogs = () => {
  const { blogs } = useBlogStore();
  const recentsBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto py-8 mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Recents Posts</h3>

      <div className="flex flex-col gap-6">
        {recentsBlogs.map((blog) => (
          <HorizontalBlogCard
            key={blog.id}
            blog={{
              id: blog.id ?? "",
              title: blog.title ?? "",
              description: blog.description ?? "",
              image: blog.image ?? "",
              category: blog.category ?? "",
              views: blog.views ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const HomeBlogs = () => {
  const { blogs, getBlogs, getHomeBlogsLoader } = useBlogStore();

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      getBlogs();
    }
  }, [getBlogs]);

  return (
    <div className="py-6 px-6">
      {/* ✅ Loader */}
      {getHomeBlogsLoader && (
        <div className="flex justify-center items-center h-40">
          <div className="flex justify-center items-center h-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* ✅ Main Content */}
      {blogs && blogs.length > 0 && !getHomeBlogsLoader && (
        <>
          <PopularBlogs />
          <RecentsBlogs />
          <CategoryBlogs />
        </>
      )}

      {/* ✅ No Blogs Message */}
      {blogs && blogs.length === 0 && !getHomeBlogsLoader && (
        <p className="text-gray-500 text-center mt-10">No blogs available.</p>
      )}
    </div>
  );
};

export default HomeBlogs;
