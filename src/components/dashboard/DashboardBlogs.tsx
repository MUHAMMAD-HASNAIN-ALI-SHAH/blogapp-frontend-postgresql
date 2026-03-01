import useDashboardStore from "../../store/useDashboardStore";
import type { BlogData } from "../../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

const DashboardBlogs = () => {
  const { myBlogs, deleteBlog, deleteBlogLoader } = useDashboardStore();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Blogs</h2>

        <button
          onClick={() => navigate("/dashboard/add-blog")}
          className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Add Blog
        </button>
      </div>

      {myBlogs && myBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {myBlogs.map((blog: BlogData) => (
            <div
              key={blog.id}
              className="bg-white border border-gray-300 rounded-xl shadow"
            >
              <div className="h-[180px]">
                <img
                  src={blog.image}
                  alt={String(blog.title)}
                  className="w-full h-full object-cover rounded-t-xl"
                  width={400}
                  height={180}
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {typeof blog.title === "string"
                    ? blog.title.length > 20
                      ? blog.title.slice(0, 20) + "..."
                      : blog.title
                    : ""}
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  {typeof blog.description === "string"
                    ? blog.description.length > 100
                      ? blog.description.slice(0, 100) + "..."
                      : blog.description
                    : ""}
                </p>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/dashboard/edit-blog/${blog.id}`)}
                    className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    disabled={deleteBlogLoader}
                    className={ `px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition ${deleteBlogLoader ? "opacity-50 cursor-not-allowed" : ""}` }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-lg font-semibold">No Blogs Available</p>
        </div>
      )}
    </div>
  );
};

export default DashboardBlogs;
