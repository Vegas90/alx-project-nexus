// Navigation bar with logo on the left, nav links in the center, and search bar + favorites icon on the right

import Image from 'next/image'
import Link from 'next/link'
//add the bebas neue font
import { Bebas_Neue } from "next/font/google";
import { useState } from 'react';

const bebasNeue = Bebas_Neue(
  { subsets: ["latin"], weight: "400" }
);


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 hover:scale-105 transition-opacity mr-5">
          {/* with link to home page */}
          <Image src="/images/logomovie.png" alt="moviegO logo" width={150} height={150} />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      {/* Gets lost on smaller screens */}
      <ul className={`hidden md:flex gap-6 text-gray-700 font-bold text-lg scale-120 font-mono ${bebasNeue.className}`}>
        <li><Link href="/" className="hover:opacity-80">HOME</Link></li>
        <li><Link href="/" className="hover:opacity-80">MOVIES</Link></li>
        <li><Link href="/favourites" className="hover:opacity-80">FAVOURITES</Link></li>
      </ul>

      {/* Right: Search + Favorite Icon */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          className={` flex-1 px-3 py-1 border border-gray-300 rounded-full text-zinc-950 outline-none ${bebasNeue.className}`}
        />
        <Link href="/favourites">
          <Image src="/images/favouriteicon.png" className="hover:scale-115" alt="Favorites" width={30} height={30} />
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="black"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className={`absolute bg-white top-full left-0 w-full shadow-md md:hidden flex flex-col space-y-2 p-4 ${bebasNeue.className}`}>
          <li>
            <Link href="/" className="block text-black">HOME</Link>
          </li>
          <li><Link href="/" className="block text-black">MOVIES</Link></li>
          <li><Link href="/favourites" className="block text-black">FAVOURITES</Link></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar;