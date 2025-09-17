import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="px-6 py-12 flex flex-col gap-4">
      {/* Header */}
      <p className="text-white font-poppins text-xl">Search</p>

      {/* Search Bar */}
      <div className="bg-main h-12 rounded-sm flex items-center gap-4 p-4">
        <SearchIcon className="text-white" />
        <input
          type="text"
          placeholder="Search"
          className="text-white font-poppins bg-transparent outline-none focus:ring-0 w-full placeholder:text-gray-400"
        />
      </div>

      {/* Search Results */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex gap-2 items-center p-2" key={index}>
            <div className="h-10 w-10 bg-white rounded-full" />
            <div className="flex flex-col">
              <p className="text-white font-poppins font-medium text-sm">
                Juan Dela Cruz
              </p>
              <p className="text-white font-poppins text-xs">Galileo 2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
