import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center gap-10 border-b px-10 py-3">
      <Link to={"/article"} className="text-2xl font-bold">
        Lentera
      </Link>
      <input
        placeholder="Search"
        className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none"
      />
      <div className="relative max-h-12 min-h-12 min-w-12 max-w-12">
        <img
          src="https://cdn.dribbble.com/users/2364329/screenshots/5930135/aa.jpg"
          alt="photo-profile"
          className="h-12 rounded-full object-cover"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded border border-gray-300 bg-white shadow-lg">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
