// Components/PlaceSkeleton.jsx
export default function PlaceSkeleton() {
  return (
    <div className="animate-pulse space-y-4 mt-10 px-4 pb-10">

      <div className="h-8 bg-gray-400 rounded w-2/3 mx-3"></div>

      
      <div className="w-full max-w-[1250px] mx-auto grid grid-cols-7 grid-rows-2 gap-1 rounded-xl overflow-hidden h-[350px]">
        <div className="col-span-3 row-span-2 bg-gray-300 rounded-xl" />
        <div className="col-span-4 row-span-2 grid grid-cols-2 grid-rows-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl w-full h-full" />
          ))}
        </div>
      </div>

      
      <div className="flex items-center gap-2 ml-3 mt-6">
        <div className="w-6 h-6 bg-gray-400 rounded-full" />
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
      </div>

      
      <div className="space-y-2 mt-6 ml-4">
        <div className="h-6 bg-gray-400 max-w-[300px] rounded" />
        <div className="h-4 bg-gray-300 max-w-[1200px] rounded" />
        <div className="h-4 bg-gray-200 max-w-[1200px] rounded" />
        <div className="h-4 bg-gray-300 max-w-[1200px] rounded" />
      </div>

      
      <div className="mt-9 ml-4 space-y-2">
        <div className="h-6 bg-gray-400 rounded w-1/4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[60%]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>

      
      <div className="mt-6 flex justify-between pr-20 gap-6 mb-10">
        
        <div className="w-1/2 space-y-2">
          <div className="h-6 bg-gray-400 rounded w-1/2" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-2/3" />
          ))}
        </div>

        
        <div className="w-[350px] space-y-3">
          <div className="h-6 bg-gray-400 rounded w-2/3" />
          <div className="h-12 bg-gray-200 rounded w-full" />
          <div className="h-12 bg-gray-300 rounded w-full" />
          <div className="h-12 bg-gray-200 rounded w-full" />
          <div className="h-10 bg-gray-400 rounded w-full" />
        </div>
      </div>
    </div>
  );
}
