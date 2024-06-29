function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between space-x-3">
          <div className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default Loading;
