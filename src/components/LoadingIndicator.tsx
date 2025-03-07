function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 font-medium">Detecting theme...</p>
    </div>
  );
}

export default LoadingIndicator;
