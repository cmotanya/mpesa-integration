export const SkeletonCard = () => {
  return (
    <div className="grid w-full md:grid-cols-2 lg:grid-cols-3">
      <div className="shadow-secondary/50 group bg-secondary/10 hover:bg-secondary/20 mb-4 w-80 rounded-lg p-4 pb-2 shadow-sm transition-all duration-200 ease-in-out">
        <div className="bg-secondary/50 mb-4 h-2 w-1/2 rounded" />
        <div className="bg-secondary/50 mb-4 h-2 w-1/3 rounded" />

        <div className="flex items-center justify-between">
          <div className="bg-secondary/50 mb-4 h-5 w-1/2 rounded" />
          <div className="bg-secondary/50 mb-4 h-5 w-1/4 rounded" />
        </div>
      </div>
    </div>
  );
};
