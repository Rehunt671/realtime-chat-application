import Link from 'next/link';
import React from 'react';
import { User } from 'types/user';

interface NavbarProps {
  user:User
}
const Navbar: React.FC<NavbarProps> = ({user}) => {
  return (
    <nav className="bg-transparent border-b-2 border-gray-200 fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="max-w-8xl mx-auto px-20 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-500"> 
            ChatApp
        </Link>
        
        <div className="text-lg text-gray-800">
          <span className="font-semibold">Hello, </span>
          <span className="text-blue-500">{user?.username}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
