import LikedBlogs from "./LikedBlogs";
import UserDetails from "./UserDetails";

const Profile = () => {
    return (
        <div className="w-full mt-20">
            <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
                <div className="w-full mt-9">
                    <div className="flex flex-col justify-start gap-5 items-center rounded-lg">
                        <h1 className="text-xl font-bold text-gray-800 text-left w-full">Your Profile</h1>
                    </div>
                    <div className="flex flex-col justify-start gap-5 items-center rounded-lg shadow-lg p-6">
                        <UserDetails />
                    </div>
                    <div className="mt-10 flex flex-col justify-start gap-5 items-center rounded-lg shadow-lg py-6">
                        <h2 className="text-xl font-bold text-gray-800 text-left w-full">Liked Blogs</h2>
                    </div>
                    <LikedBlogs />
                </div>
            </div>
        </div>
    );
};

export default Profile;
