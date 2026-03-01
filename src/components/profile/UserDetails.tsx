import useAuthStore from "../../store/useAuthStore";

const UserDetails = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-5 w-full p-4 rounded-lg">
      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Email:</label>
        <input defaultValue={user?.email || ""} className="flex-1 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400" readOnly />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Username:</label>
        <input defaultValue={user?.username} className="flex-1 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400" readOnly />
      </div>
    </div>
  );
};

export default UserDetails;
