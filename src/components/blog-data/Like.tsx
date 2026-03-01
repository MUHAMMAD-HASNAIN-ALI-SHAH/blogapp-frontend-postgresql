import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { HiHeart } from "react-icons/hi2";

const Like = ({ blogId }: { blogId: string }) => {
    const { isAuthenticated } = useAuthStore();
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        getTotalLikes();
    }, [blogId]);

    useEffect(() => {
        if (isAuthenticated) {
            checkIfLiked();
        }
    }, [isAuthenticated, blogId]);

    const getTotalLikes = async () => {
        try {
            const res = await axiosInstance.get(`/api/v4/likes/${blogId}`);
            setLikeCount(res.data.likeCount);
        } catch (error) {
            console.error("Failed to fetch like count:", error);
            toast.error("Failed to fetch like count");
        } finally {
            setInitialLoading(false);
        }
    }

    const checkIfLiked = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await axiosInstance.get(`/api/v4/likes/${blogId}/status`);
            setIsLiked(res.data.liked);
        } catch (error) {
            console.error("Failed to check like status:", error);
            toast.error("Failed to check like status");
        }
    }

    const toggleLike = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to like a blog");
            return;
        }
        setLoading(true);
        try {
            const res = await axiosInstance.post(`/api/v4/likes/${blogId}`);
            setIsLiked(res.data.isLiked);
            setLikeCount(prev => res.data.isLiked ? prev + 1 : prev - 1);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update like");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="flex justify-center items-center h-20">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;

    return (
        <div className="flex flex-col items-center gap-2 mb-6">
            <button
                onClick={toggleLike}
                disabled={loading}
                className={`
          relative flex items-center justify-center w-14 h-14 rounded-full
          transition-all duration-200
          ${isLiked ? "bg-red-100" : "bg-gray-100 hover:bg-gray-200"}
          ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
            >
                <HiHeart className={`text-5xl ${isLiked ? "text-red-500" : "text-gray-400"}`} />
                {loading && (
                    <span className="absolute w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                )}
            </button>

            <p className="text-gray-700 font-medium">
                {likeCount} {likeCount <= 1 ? "Like" : "Likes"}
            </p>
        </div>
    );
};

export default Like;
