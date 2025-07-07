// components/Header.tsx
import React from "react";
import Image from "next/image";
import { Search } from "lucide-react"; // Update if you use a different icon library
import { usePathname  } from "next/navigation";
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
}

const NavHeader: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {

  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-50 bg-blue-900 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center h-20 space-x-6">
          {/* Big Main Logo */}
          <div className="relative font-bold h-full w-20">
            <Image
              src="/ems-high-resolution-logo-transparent.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Tabs */}
          <div className="flex h-full">
            <a
              rel="noreferrer"
              href="/profile"
              className={`text-white hover:text-gray-300 transition-colors flex justify-center items-center navbar ${
                pathname === "/profile" ? "active-tab" : ""
              }`}
            >
              Profile
            </a>
            <a
              rel="noreferrer"
              href="/upload"
              className={`text-white hover:text-gray-300 transition-colors flex justify-center items-center navbar ${
                pathname === "/upload" ? "active-tab" : ""
              }`}
            >
              Upload
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-white text-white"
            />
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm ml-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
