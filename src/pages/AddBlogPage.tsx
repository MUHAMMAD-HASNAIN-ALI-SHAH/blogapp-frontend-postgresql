import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import useDashboardStore from "../store/useDashboardStore";
import { fileToBase64 } from "../lib/base64";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const { addBlog } = useDashboardStore();
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    title: string;
    description: string;
    category: string;
    image: File | null;
  }>({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { title, description, category, image } = form;

  const handleInput = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!title || !description || !category || !image) return;

    setLoading(true);

    try {

      const base64Image = await fileToBase64(image);
      const formData = {
        title,
        description,
        category,
        image: base64Image,
      }

      const res = await axiosInstance.post(
        "/api/v6/dashboard/blog",
        formData
      );

      toast.success(res.data.message);

      if (res.data.blogId) {
        addBlog({
          id: res.data.blogId,
          title,
          description,
          category,
          image: URL.createObjectURL(image),
          views: 0,
        });
      }

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 px-4 py-10 mt-20">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-xl font-semibold text-gray-800">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              value={title}
              onChange={(e) => handleInput("title", e.target.value)}
              placeholder="Blog title"
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            {submitted && !title && (
              <p className="mt-1 text-xs text-red-500">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                handleInput("description", e.target.value)
              }
              placeholder="Write something..."
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            {submitted && !description && (
              <p className="mt-1 text-xs text-red-500">
                Description is required
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              value={category}
              onChange={(e) =>
                handleInput("category", e.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select</option>
              {[
                "technology",
                "travel",
                "food",
                "lifestyle",
                "health",
                "education",
                "finance",
                "sports",
                "fashion",
                "entertainment",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            {submitted && !category && (
              <p className="mt-1 text-xs text-red-500">
                Please select a category
              </p>
            )}
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e.target.files?.[0] || null)
              }
              className="mt-1 text-sm p-3 cursor-pointer text-gray-500 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {submitted && !image && (
              <p className="mt-1 text-xs text-red-500">
                Image is required
              </p>
            )}
          </div>

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-48 w-full rounded-md object-cover"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
