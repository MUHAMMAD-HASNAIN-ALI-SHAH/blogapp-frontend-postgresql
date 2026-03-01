import useDashboardStore from "../../store/useDashboardStore";

const DashboardData = () => {
  const { myStats } = useDashboardStore();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-xl font-semibold">Total Blogs</h2>
          <p className="text-2xl font-bold mt-2">{myStats.totalblogs}</p>
        </div>

        <div className="p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-xl font-semibold">Total Likes</h2>
          <p className="text-2xl font-bold mt-2">{myStats.totallikes}</p>
        </div>

        <div className="p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-lg font-semibold">Total Comments</h2>
          <p className="text-2xl font-bold mt-2">{myStats.totalcomments}</p>
        </div>

        <div className="p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-lg font-semibold">Total Views</h2>
          <p className="text-2xl font-bold mt-2">{myStats.totalviews}</p>
        </div>

      </div>
    </div>
  );
};

export default DashboardData;