const DashboardSkeletonData = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center py-8 animate-pulse"
          >
            <div className="h-4 w-28 bg-gray-300 rounded" />
            <div className="h-4 w-20 mt-6 bg-gray-300 rounded" />
          </div>
        ))}

      </div>
    </div>
  );
};

export default DashboardSkeletonData;
