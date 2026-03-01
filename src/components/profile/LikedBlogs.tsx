import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import { HorizontalBlogCard } from "../home/BlogCard";

// Define the Blog type
type Blog = {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    views: number;
};

const LikedBlogs = () => {
    const { isAuthenticated, user } = useAuthStore();

    const [likedBlogs, setLikedBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLikedBlogs = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/api/v5/profile/liked-blogs");

            // Make sure TypeScript knows the type
            const blogs: Blog[] = res.data.likedBlogs;
            setLikedBlogs(blogs);
        } catch (error) {
            console.error("Failed to fetch liked blogs:", error);
            toast.error("Failed to load liked blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchLikedBlogs();
        }
    }, [isAuthenticated, user]);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

            ) : likedBlogs.length === 0 ? (
                <p>You haven't liked any blogs yet.</p>
            ) : (
                likedBlogs.map((blog) => (
                    <div key={blog.id} className="mb-4">
                        <HorizontalBlogCard
                            key={blog.id || blog.title}
                            blog={blog}
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default LikedBlogs;
