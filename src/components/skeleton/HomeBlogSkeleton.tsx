const HomeBlogSkeleton = () => {
  return (
    <div className="flex w-52 flex-col gap-4 animate-pulse">
      {/* Image */}
      <div className="h-32 w-full bg-gray-300 rounded" />

      {/* Title */}
      <div className="h-4 w-28 bg-gray-300 rounded" />

      {/* Content lines */}
      <div className="h-4 w-full bg-gray-300 rounded" />
      <div className="h-4 w-full bg-gray-300 rounded" />
    </div>
  );
};

export default HomeBlogSkeleton;
