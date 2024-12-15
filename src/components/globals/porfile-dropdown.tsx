'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignOut from '@/components/auth/sign-out';
import { User } from 'lucide-react';

export default function ProfileDropdown({ user }: any) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="flex items-center focus:outline-none"
      >
        <Image
          src={user.image}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-retro-text ml-2 hidden md:block">{user.name}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-retro-bg border border-retro-primary rounded shadow-lg">
          <ul className="text-retro-text">
            <li className="hover:bg-retro-primary hover:text-black transition-colors">
              <Link href="/profile" className="flex items-center px-4 py-2">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </li>
            <li className="border-t border-retro-primary hover:bg-retro-primary hover:text-black transition-colors">
              <SignOut />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
