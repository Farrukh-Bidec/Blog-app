import { Search } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between items-center px-6 py-4 sm:h-20 w-full bg-white text-black shadow-md z-11">
      {/* Logo */}
      <h1 className="font-extrabold text-3xl sm:text-5xl my-2 sm:my-0 tracking-tight">
        News
      </h1>

      {/* Search bar */}
      <div className="flex items-center w-full sm:w-96 my-2 sm:my-0 px-4 py-2 border border-black rounded-full bg-gray-100/50">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none placeholder-black"
        />
        <Search className="ml-2" />
      </div>

      {/* Logout button */}
      <Button className="my-2 sm:my-0 bg-black text-white hover:bg-gray-800">
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
