// Navigation bar with logo on the left, nav links in the center, and search bar + favorites icon on the right

import Image from 'next/image'
import Link from 'next/link'
//add the bebas neue font
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue(
  { subsets: ["latin"], weight: "400" }
);

export default function Navbar() {
  return (
    <nav className=" sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 hover:scale-105 transition-opacity">
          {/* with link to home page */}
          <Image src="/images/logomovie.png" alt="moviegO logo" width={150} height={150} />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <ul className={` flex gap-6 text-gray-700 font-bold text-lg font-mono ${bebasNeue.className}`}>
        <li><Link href="/">HOME</Link></li>
        <li><Link href="/">MOVIES</Link></li>
        <li><Link href="/favorites">FAVOURITES</Link></li>
      </ul>

      {/* Right: Search + Favorite Icon */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          className={`flex-1 px-3 py-1 border border-gray-300 rounded-full text-zinc-950 outline-none ${bebasNeue.className}`}
        />
        <Link href="/favorites">
          <Image src="/images/favouriteicon.png" alt="Favorites" width={30} height={30} />
        </Link>
      </div>
    </nav>
  )
}
