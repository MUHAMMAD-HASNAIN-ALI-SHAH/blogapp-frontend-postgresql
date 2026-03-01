import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import useDashboardStore from "../store/useDashboardStore";
import { fileToBase64 } from "../lib/base64";
import { useNavigate, useParams } from "react-router-dom";

/* ---------------- Loader ---------------- */
const Loader = () => (
    <div className="min-h-[50vh] flex items-center justify-center bg-white/70">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
);

/* ---------------- Types ---------------- */
interface BlogForm {
    title: string;
    description: string;
    category: string;
    preview: File | null;
    image: string;
}

const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addBlog } = useDashboardStore();
    const blogId = Number(id);

    const [buttonLoading, setButtonLoading] = useState(false);
    const [getBlogDataLoader, setGetBlogDataLoader] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState<BlogForm>({
        title: "",
        description: "",
        category: "",
        preview: null,
        image: "",
    });

    if (!blogId) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <p className="text-lg text-red-500">Blog ID is missing</p>
            </div>
        );
    }

    /* ---------------- Fetch blog ---------------- */
    const getBlogData = async () => {
        try {
            setGetBlogDataLoader(true);
            const res = await axiosInstance.get(`/api/v2/blogs/${blogId}`);
            const { title, description, category, image } = res.data.blog;

            setForm({
                title,
                description,
                category,
                preview: null,
                image,
            });
        } catch {
            toast.error("Failed to load blog data");
        } finally {
            setGetBlogDataLoader(false);
        }
    };

    useEffect(() => {
        getBlogData();
    }, [blogId]);

    /* ---------------- Handlers ---------------- */
    const handleInput = (key: keyof BlogForm, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (file: File | null) => {
        setForm((prev) => ({ ...prev, preview: file }));
    };

    /* ---------------- Submit ---------------- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const { title, description, category, preview, image } = form;

        if (!title || !description || !category) return;

        setButtonLoading(true);

        try {
            const finalImage = preview
                ? await fileToBase64(preview)
                : image;

            const payload = {
                title,
                description,
                category,
                image: finalImage,
            };

            const res = await axiosInstance.put(
                `/api/v6/dashboard/blog/${blogId}`,
                payload
            );

            toast.success(res.data.message || "Blog updated");

            // Optional optimistic update
            addBlog({
                id: blogId,
                title,
                description,
                category,
                image: finalImage,
                views: 0,
            });

            navigate("/dashboard");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update blog. Please try again."
            );
        } finally {
            setButtonLoading(false);
        }
    };

    const { title, description, category, image } = form;

    /* ---------------- UI ---------------- */
    return (
        <div className="bg-gray-50 px-4 py-10 mt-20">
            {
                getBlogDataLoader ? (
                    <Loader />
                ) : (
                    <div className="relative mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">

                        <h1 className="mb-6 text-xl font-semibold text-gray-800">
                            Edit Blog
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Title */}
                            <div>
                                <label className="text-sm text-gray-600">Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => handleInput("title", e.target.value)}
                                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
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
                                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
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
                                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
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
                            <div>
                                <label className="text-sm text-gray-600">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e.target.files?.[0] || null)
                                    }
                                    className="mt-1 w-full rounded-md border p-2 text-sm"
                                />
                            </div>

                            {image && (
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="h-48 w-full rounded-md object-cover"
                                />
                            )}

                            <button
                                type="submit"
                                disabled={buttonLoading}
                                className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {buttonLoading ? "Updating..." : "Update Blog"}
                            </button>
                        </form>
                    </div>
                )
            }

        </div>
    );
};

export default EditBlogPage;
