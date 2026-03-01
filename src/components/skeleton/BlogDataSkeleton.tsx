const BlogDataSkeleton = () => {
  return (
    <>
      {/* Image skeleton */}
      <div className="h-[300px] w-full rounded-lg bg-gray-300 animate-pulse" />

      {/* Title skeletons */}
      <div className="h-7 w-full sm:w-[80%] lg:w-[50%] bg-gray-300 rounded animate-pulse mt-4" />
      <div className="h-7 w-full bg-gray-300 rounded animate-pulse" />
      <div className="h-7 w-full bg-gray-300 rounded animate-pulse" />
      <div className="h-7 w-full bg-gray-300 rounded animate-pulse" />
      <div className="h-7 w-full bg-gray-300 rounded animate-pulse" />

      <div className="flex justify-center mt-4">
        <div className="h-7 w-9 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Comments / section */}
      <div className="flex flex-col gap-2 mt-6">
        <div className="h-7 w-full sm:w-[80%] lg:w-[50%] bg-gray-300 rounded animate-pulse" />

        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-3 rounded-lg border border-gray-200 animate-pulse"
          >
            <div className="h-6 w-full sm:w-[80%] lg:w-[50%] bg-gray-300 rounded" />
            <div className="h-6 w-full bg-gray-300 rounded" />
          </div>
        ))}

        {/* Button skeleton */}
        <div className="h-10 w-24 bg-gray-300 rounded animate-pulse mt-2" />
      </div>
    </>
  );
};

export default BlogDataSkeleton;
